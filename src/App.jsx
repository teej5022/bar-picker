import { useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './App.css'

const seedBars = [
  {
    id: 'atlas-room-1',
    name: 'Atlas Room',
    address: '1234 Pine St, Seattle, WA',
    notes: 'Great cocktails and low lighting.',
  },
  {
    id: 'copper-fox-2',
    name: 'Copper Fox',
    address: '3412 Fremont Ave N, Seattle, WA',
    notes: 'Strong happy hour, group-friendly tables.',
  },
  {
    id: 'night-owl-3',
    name: 'Night Owl Bar',
    address: '2201 2nd Ave, Seattle, WA',
    notes: 'Late-night option with casual vibe.',
  },
]

const barStorageKey = 'bar-picker:bars'
const monthlyPickStorageKey = 'bar-picker:monthly-pick'
const sessionStorageKey = 'bar-picker:session'
const legacyAdminSessionStorageKey = 'bar-picker:admin-session'
const monthlyCheckInsStorageKey = 'bar-picker:monthly-checkins'
const inviteStorageKey = 'bar-picker:invites'
const subscriberAccountsStorageKey = 'bar-picker:subscriber-accounts'

const sharedAdminCredentials = {
  username: 'admin',
  password: 'barpicker2026',
  displayName: 'Admin',
}

const defaultBarForm = {
  name: '',
  address: '',
  notes: '',
}

const readStoredBars = () => {
  try {
    const storedBars = localStorage.getItem(barStorageKey)
    if (!storedBars) {
      return seedBars
    }

    const parsedBars = JSON.parse(storedBars)
    if (!Array.isArray(parsedBars)) {
      return seedBars
    }

    return parsedBars
      .filter(
        (bar) =>
          typeof bar?.id === 'string' &&
          typeof bar?.name === 'string' &&
          (typeof bar?.address === 'string' ||
            typeof bar?.neighborhood === 'string'),
      )
      .map((bar) => ({
        id: bar.id,
        name: bar.name,
        address:
          typeof bar.address === 'string' && bar.address.trim().length > 0
            ? bar.address
            : bar.neighborhood,
        notes: typeof bar.notes === 'string' ? bar.notes : '',
      }))
  } catch {
    return seedBars
  }
}

const readStoredMonthlyPick = () => {
  try {
    const storedPick = localStorage.getItem(monthlyPickStorageKey)
    if (!storedPick) {
      return null
    }

    const parsedPick = JSON.parse(storedPick)
    if (
      typeof parsedPick?.monthKey !== 'string' ||
      typeof parsedPick?.barId !== 'string'
    ) {
      return null
    }

    return parsedPick
  } catch {
    return null
  }
}

const readStoredSession = () => {
  try {
    const storedSession = localStorage.getItem(sessionStorageKey)
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession)
      if (
        (parsedSession?.role === 'admin' || parsedSession?.role === 'subscriber') &&
        typeof parsedSession?.displayName === 'string'
      ) {
        return parsedSession
      }
    }

    if (localStorage.getItem(legacyAdminSessionStorageKey) === 'true') {
      return {
        role: 'admin',
        displayName: sharedAdminCredentials.displayName,
        username: sharedAdminCredentials.username,
      }
    }

    return null
  } catch {
    return null
  }
}

const readStoredCheckIns = () => {
  try {
    const storedCheckIns = localStorage.getItem(monthlyCheckInsStorageKey)
    if (!storedCheckIns) {
      return {}
    }

    const parsedCheckIns = JSON.parse(storedCheckIns)
    return parsedCheckIns && typeof parsedCheckIns === 'object' ? parsedCheckIns : {}
  } catch {
    return {}
  }
}

const readStoredInvites = () => {
  try {
    const storedInvites = localStorage.getItem(inviteStorageKey)
    if (!storedInvites) {
      return []
    }

    const parsedInvites = JSON.parse(storedInvites)
    return Array.isArray(parsedInvites) ? parsedInvites : []
  } catch {
    return []
  }
}

const readStoredSubscriberAccounts = () => {
  try {
    const storedAccounts = localStorage.getItem(subscriberAccountsStorageKey)
    if (!storedAccounts) {
      return []
    }

    const parsedAccounts = JSON.parse(storedAccounts)
    return Array.isArray(parsedAccounts) ? parsedAccounts : []
  } catch {
    return []
  }
}

const getMonthKey = (date = new Date()) => {
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  return `${date.getFullYear()}-${month}`
}

const monthLabelFromKey = (monthKey) => {
  const [year, month] = monthKey.split('-')
  const parsedMonth = Number(month)
  const parsedYear = Number(year)

  if (!parsedMonth || !parsedYear) {
    return monthKey
  }

  return new Date(parsedYear, parsedMonth - 1, 1).toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

const randomBarFrom = (bars, exceptBarId = null) => {
  const options = bars.filter((bar) => bar.id !== exceptBarId)
  const pool = options.length > 0 ? options : bars
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}

const generateInviteCode = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase()

function ProtectedRoute({ session, children }) {
  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

function LoginPage({ onAuthenticate, authError }) {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [authMode, setAuthMode] = useState(
    searchParams.get('mode') === 'signup' ? 'subscriber-signup' : 'subscriber-login',
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [inviteCode, setInviteCode] = useState(searchParams.get('invite') ?? '')
  const loggedOut = searchParams.get('loggedOut') === '1'

  const submitAuth = (event) => {
    event.preventDefault()

    const didAuthenticate = onAuthenticate({
      authMode,
      username,
      password,
      displayName,
      inviteCode,
    })

    if (didAuthenticate) {
      navigate('/bars', { replace: true })
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="eyebrow">Shared access</p>
        <h1>Bar Picker Login</h1>
        <p>Admins send invites. Subscribers create their own accounts.</p>
        {loggedOut ? (
          <p className="info-text">You were logged out successfully.</p>
        ) : null}

        <div className="mode-switcher" role="tablist" aria-label="Auth modes">
          <button
            type="button"
            className={authMode === 'subscriber-login' ? 'primary' : 'ghost'}
            onClick={() => setAuthMode('subscriber-login')}
          >
            Subscriber login
          </button>
          <button
            type="button"
            className={authMode === 'subscriber-signup' ? 'primary' : 'ghost'}
            onClick={() => setAuthMode('subscriber-signup')}
          >
            Create subscriber account
          </button>
          <button
            type="button"
            className={authMode === 'admin-login' ? 'primary' : 'ghost'}
            onClick={() => setAuthMode('admin-login')}
          >
            Admin login
          </button>
        </div>

        <form className="form-grid" onSubmit={submitAuth}>
          {authMode === 'subscriber-signup' ? (
            <>
              <label>
                Invite code
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(event) => setInviteCode(event.target.value.toUpperCase())}
                  placeholder="ABC123"
                />
              </label>

              <label>
                Display name
                <input
                  type="text"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Taylor"
                />
              </label>

              <label>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="taylor88"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </label>
            </>
          ) : null}

          {authMode === 'subscriber-login' ? (
            <>
              <label>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="taylor88"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </label>
            </>
          ) : null}

          {authMode === 'admin-login' ? (
            <>
              <label>
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </label>
            </>
          ) : null}

          <button type="submit" className="primary">
            {authMode === 'subscriber-signup' ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p>
          Admin login: <code>admin</code> / <code>barpicker2026</code>
        </p>
        <p>Subscribers need an invite code before they can create an account.</p>
        {authError ? <p className="error-text">{authError}</p> : null}
      </section>
    </main>
  )
}

function BarsPage({
  bars,
  session,
  monthlyPick,
  statusMessage,
  barForm,
  setBarForm,
  editingBarId,
  startEditingBar,
  cancelEditing,
  saveBar,
  runMonthlyPickNow,
  removeBar,
  onLogout,
  monthlyCheckIns,
  submitCheckIn,
  invites,
  generateInvite,
}) {
  const navigate = useNavigate()
  const [inviteRecipient, setInviteRecipient] = useState('')
  const [inviteMessage, setInviteMessage] = useState('')
  const isAdmin = session?.role === 'admin'
  const isSubscriber = session?.role === 'subscriber'

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login?loggedOut=1', { replace: true })
  }

  const pickedBar = useMemo(() => {
    if (!monthlyPick) {
      return null
    }

    return bars.find((bar) => bar.id === monthlyPick.barId) ?? null
  }, [bars, monthlyPick])

  const totalAddresses = useMemo(
    () => new Set(bars.map((bar) => bar.address)).size,
    [bars],
  )

  const currentMonthLabel = monthlyPick
    ? monthLabelFromKey(monthlyPick.monthKey)
    : monthLabelFromKey(getMonthKey())

  const currentMonthResponses = useMemo(() => {
    if (!monthlyPick) {
      return []
    }

    const monthResponses = monthlyCheckIns[monthlyPick.monthKey] ?? {}
    return Object.entries(monthResponses)
      .map(([name, response]) => ({ name, response }))
      .sort((left, right) => left.name.localeCompare(right.name))
  }, [monthlyCheckIns, monthlyPick])

  const currentUserResponse = useMemo(() => {
    if (!monthlyPick || !session?.displayName) {
      return null
    }

    return monthlyCheckIns[monthlyPick.monthKey]?.[session.displayName] ?? null
  }, [monthlyCheckIns, monthlyPick, session])

  const handleGenerateInvite = () => {
    const invite = generateInvite(inviteRecipient)
    if (!invite) {
      return
    }

    setInviteRecipient('')
    setInviteMessage(`Invite created: ${invite.code}`)
  }

  const copyInviteLink = async (code) => {
    const inviteUrl = `${window.location.origin}/login?mode=signup&invite=${code}`
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setInviteMessage(`Copied invite link for ${code}.`)
    } catch {
      setInviteMessage(`Invite link: ${inviteUrl}`)
    }
  }

  return (
    <main className="app-shell">
      <section className="intro-panel">
        <p className="eyebrow">Shared bar planning</p>
        <nav className="top-nav" aria-label="Primary">
          <NavLink to="/bars" className="nav-link">
            Bars
          </NavLink>
        </nav>
        <div className="header-row">
          <div className="title-block">
            <h1>Bar Picker</h1>
            <p className="role-text">
              Signed in as {session.displayName} · {session.role}
            </p>
          </div>
          <button type="button" className="ghost" onClick={handleLogoutClick}>
            Log out
          </button>
        </div>
        <p>
          Keep one shared list of bars, then get one monthly suggestion for where
          to attend.
        </p>

        <div className="stats-row">
          <div className="stat-card">
            <h2>{bars.length}</h2>
            <p>Total bars</p>
          </div>
          <div className="stat-card">
            <h2>{totalAddresses}</h2>
            <p>Addresses</p>
          </div>
        </div>

        <div className="monthly-card">
          <h2>{currentMonthLabel}</h2>
          {pickedBar ? (
            <>
              <p className="pick-name">{pickedBar.name}</p>
              <p>{pickedBar.address}</p>
              {pickedBar.notes ? <p>{pickedBar.notes}</p> : null}
            </>
          ) : (
            <p>Add bars to generate a monthly pick.</p>
          )}

          {isAdmin ? (
            <button type="button" className="primary" onClick={runMonthlyPickNow}>
              Run monthly check
            </button>
          ) : null}

          {isSubscriber && pickedBar ? (
            <div className="checkin-panel">
              <p className="section-label">Bar of the month check-in</p>
              <div className="checkin-actions">
                <button
                  type="button"
                  className={currentUserResponse === 'going' ? 'primary' : 'ghost'}
                  onClick={() => submitCheckIn('going')}
                >
                  I’m going
                </button>
                <button
                  type="button"
                  className={currentUserResponse === 'not-going' ? 'primary' : 'ghost'}
                  onClick={() => submitCheckIn('not-going')}
                >
                  Not going
                </button>
              </div>
            </div>
          ) : null}

          <div className="checkin-list">
            <p className="section-label">Responses</p>
            {currentMonthResponses.length > 0 ? (
              currentMonthResponses.map(({ name, response }) => (
                <p key={`${name}-${response}`} className="checkin-row">
                  <span>{name}</span>
                  <span className={`checkin-badge ${response}`}>
                    {response === 'going' ? 'Going' : 'Not going'}
                  </span>
                </p>
              ))
            ) : (
              <p>No one has checked in yet.</p>
            )}
          </div>
        </div>

        {statusMessage ? <p className="status-text">{statusMessage}</p> : null}
      </section>

      <section className="admin-panel">
        <h2>{editingBarId ? 'Edit Bar' : 'Add Bar'}</h2>
        <p>
          {isAdmin
            ? 'Admins can invite subscribers, manage bars, and rotate the monthly pick.'
            : 'Subscribers can add new bars and RSVP to the bar of the month.'}
        </p>

        {isAdmin ? (
          <div className="invite-panel">
            <p className="section-label">Invite subscribers</p>
            <div className="invite-actions">
              <input
                type="text"
                value={inviteRecipient}
                onChange={(event) => setInviteRecipient(event.target.value)}
                placeholder="Invitee name or email (optional)"
              />
              <button type="button" className="primary" onClick={handleGenerateInvite}>
                Create invite
              </button>
            </div>
            {inviteMessage ? <p className="info-text">{inviteMessage}</p> : null}

            <div className="invite-list">
              {invites.length > 0 ? (
                invites.map((invite) => (
                  <article key={invite.id} className="invite-card">
                    <p className="invite-code">{invite.code}</p>
                    <p>{invite.recipient || 'General invite'}</p>
                    <p>
                      {invite.usedBy
                        ? `Used by ${invite.usedBy}`
                        : 'Available for signup'}
                    </p>
                    <button
                      type="button"
                      className="ghost small"
                      onClick={() => copyInviteLink(invite.code)}
                    >
                      Copy invite link
                    </button>
                  </article>
                ))
              ) : (
                <p>No invites created yet.</p>
              )}
            </div>
          </div>
        ) : null}

        <form className="form-grid" onSubmit={saveBar}>
          <label>
            Bar name
            <input
              type="text"
              value={barForm.name}
              onChange={(event) =>
                setBarForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="The Lighthouse"
            />
          </label>

          <label>
            Address
            <input
              type="text"
              value={barForm.address}
              onChange={(event) =>
                setBarForm((current) => ({
                  ...current,
                  address: event.target.value,
                }))
              }
              placeholder="500 E Pike St, Seattle, WA"
            />
          </label>

          <label>
            Notes (optional)
            <textarea
              rows="3"
              value={barForm.notes}
              onChange={(event) =>
                setBarForm((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              placeholder="Trivia nights on Thursdays"
            />
          </label>

          <div className="action-row">
            <button type="submit" className="primary">
              {editingBarId ? 'Save changes' : 'Add bar'}
            </button>
            {editingBarId ? (
              <button type="button" className="ghost" onClick={cancelEditing}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="list-panel" aria-live="polite">
        <div className="result-header">
          <h2>Bar list</h2>
          <p>{bars.length === 0 ? 'No bars added yet.' : `${bars.length} bars`}</p>
        </div>

        <div className="bar-grid">
          {bars.map((bar) => (
            <article key={bar.id} className="bar-card">
              <h3>{bar.name}</h3>
              <p>{bar.address}</p>
              {bar.notes ? <p>{bar.notes}</p> : <p>No notes yet.</p>}
              {isAdmin ? (
                <div className="card-actions">
                  <button
                    type="button"
                    className="ghost small"
                    onClick={() => startEditingBar(bar.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ghost small"
                    onClick={() => removeBar(bar.id)}
                  >
                    Remove
                  </button>
                </div>
              ) : null}
            </article>
          ))}

          {bars.length === 0 ? (
            <article className="bar-card empty-state">
              <h3>Start your list</h3>
              <p>Add your first bar to get going.</p>
            </article>
          ) : null}
        </div>
      </section>
    </main>
  )
}

function App() {
  const [bars, setBars] = useState(readStoredBars)
  const [monthlyPick, setMonthlyPick] = useState(() => {
    const storedPick = readStoredMonthlyPick()
    const currentMonth = getMonthKey()

    if (bars.length === 0) {
      return null
    }

    if (
      storedPick?.monthKey === currentMonth &&
      bars.some((bar) => bar.id === storedPick.barId)
    ) {
      return storedPick
    }

    const pick = randomBarFrom(bars, storedPick?.barId ?? null)
    return {
      monthKey: currentMonth,
      barId: pick.id,
    }
  })
  const [monthlyCheckIns, setMonthlyCheckIns] = useState(readStoredCheckIns)
  const [invites, setInvites] = useState(readStoredInvites)
  const [subscriberAccounts, setSubscriberAccounts] = useState(
    readStoredSubscriberAccounts,
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [session, setSession] = useState(readStoredSession)
  const [authError, setAuthError] = useState('')
  const [barForm, setBarForm] = useState(defaultBarForm)
  const [editingBarId, setEditingBarId] = useState(null)

  useEffect(() => {
    localStorage.setItem(barStorageKey, JSON.stringify(bars))
  }, [bars])

  useEffect(() => {
    if (monthlyPick) {
      localStorage.setItem(monthlyPickStorageKey, JSON.stringify(monthlyPick))
    } else {
      localStorage.removeItem(monthlyPickStorageKey)
    }
  }, [monthlyPick])

  useEffect(() => {
    if (session) {
      localStorage.setItem(sessionStorageKey, JSON.stringify(session))
    } else {
      localStorage.removeItem(sessionStorageKey)
    }

    localStorage.removeItem(legacyAdminSessionStorageKey)
  }, [session])

  useEffect(() => {
    localStorage.setItem(monthlyCheckInsStorageKey, JSON.stringify(monthlyCheckIns))
  }, [monthlyCheckIns])

  useEffect(() => {
    localStorage.setItem(inviteStorageKey, JSON.stringify(invites))
  }, [invites])

  useEffect(() => {
    localStorage.setItem(
      subscriberAccountsStorageKey,
      JSON.stringify(subscriberAccounts),
    )
  }, [subscriberAccounts])

  const runMonthlyPickNow = async () => {
    if (bars.length === 0) {
      setStatusMessage('Add at least one bar to generate a monthly pick.')
      return
    }

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      window.Notification.permission === 'default'
    ) {
      await window.Notification.requestPermission()
    }

    const forcedMonth = getMonthKey()
    const pick = randomBarFrom(bars, monthlyPick?.barId ?? null)
    const nextPick = {
      monthKey: forcedMonth,
      barId: pick.id,
    }

    setMonthlyPick(nextPick)
    setStatusMessage(
      `Monthly pick refreshed: ${pick.name} (${monthLabelFromKey(forcedMonth)}).`,
    )

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      window.Notification.permission === 'granted'
    ) {
      new window.Notification('Bar Picker: Monthly pick', {
        body: `${pick.name} — ${pick.address}`,
      })
    }
  }

  const authenticate = ({ authMode, username, password, displayName, inviteCode }) => {
    if (authMode === 'admin-login') {
      const submittedUsername = username.trim().toLowerCase()
      const submittedPassword = password
      const validAdminLogin =
        submittedUsername === sharedAdminCredentials.username &&
        submittedPassword === sharedAdminCredentials.password

      if (!validAdminLogin) {
        setAuthError('Invalid admin login.')
        return false
      }

      setSession({
        role: 'admin',
        displayName: sharedAdminCredentials.displayName,
        username: sharedAdminCredentials.username,
      })
      setAuthError('')
      return true
    }

    if (authMode === 'subscriber-login') {
      const normalizedUsername = username.trim().toLowerCase()
      const subscriber = subscriberAccounts.find(
        (account) =>
          account.username.toLowerCase() === normalizedUsername &&
          account.password === password,
      )

      if (!subscriber) {
        setAuthError('Invalid subscriber login.')
        return false
      }

      setSession({
        role: 'subscriber',
        displayName: subscriber.displayName,
        username: subscriber.username,
      })
      setAuthError('')
      return true
    }

    const trimmedDisplayName = displayName.trim()
    const normalizedUsername = username.trim().toLowerCase()
    const normalizedInviteCode = inviteCode.trim().toUpperCase()

    if (!normalizedInviteCode) {
      setAuthError('An invite code is required to create a subscriber account.')
      return false
    }

    const invite = invites.find((item) => item.code === normalizedInviteCode)
    if (!invite || invite.usedBy) {
      setAuthError('That invite code is invalid or already used.')
      return false
    }

    if (!trimmedDisplayName || !normalizedUsername || !password) {
      setAuthError('Display name, username, and password are required.')
      return false
    }

    const usernameTaken = subscriberAccounts.some(
      (account) => account.username.toLowerCase() === normalizedUsername,
    )
    if (usernameTaken) {
      setAuthError('That username is already taken.')
      return false
    }

    const newAccount = {
      id: `subscriber-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      username: normalizedUsername,
      password,
      displayName: trimmedDisplayName,
      inviteCodeUsed: normalizedInviteCode,
      createdAt: new Date().toISOString(),
    }

    setSubscriberAccounts((currentAccounts) => [...currentAccounts, newAccount])
    setInvites((currentInvites) =>
      currentInvites.map((item) =>
        item.code === normalizedInviteCode
          ? { ...item, usedBy: normalizedUsername }
          : item,
      ),
    )
    setSession({
      role: 'subscriber',
      displayName: trimmedDisplayName,
      username: normalizedUsername,
    })
    setAuthError('')
    return true
  }

  const handleLogout = () => {
    setSession(null)
    setAuthError('')
    setEditingBarId(null)
    setBarForm(defaultBarForm)
  }

  const startEditingBar = (barId) => {
    const bar = bars.find((item) => item.id === barId)
    if (!bar) {
      return
    }

    setEditingBarId(barId)
    setBarForm({
      name: bar.name,
      address: bar.address,
      notes: bar.notes,
    })
  }

  const cancelEditing = () => {
    setEditingBarId(null)
    setBarForm(defaultBarForm)
  }

  const saveBar = (event) => {
    event.preventDefault()

    const name = barForm.name.trim()
    const address = barForm.address.trim()
    const notes = barForm.notes.trim()

    if (!name || !address) {
      setStatusMessage('Bar name and address are required.')
      return
    }

    if (editingBarId) {
      if (session?.role !== 'admin') {
        setStatusMessage('Only admins can edit bars.')
        return
      }

      setBars((currentBars) =>
        currentBars.map((bar) =>
          bar.id === editingBarId ? { ...bar, name, address, notes } : bar,
        ),
      )

      setEditingBarId(null)
      setBarForm(defaultBarForm)
      setStatusMessage(`Updated ${name}.`)
      return
    }

    const newBar = {
      id: `bar-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      name,
      address,
      notes,
    }

    const nextBars = [newBar, ...bars]
    setBars(nextBars)

    const currentMonth = getMonthKey()
    if (!monthlyPick || monthlyPick.monthKey !== currentMonth) {
      setMonthlyPick({
        monthKey: currentMonth,
        barId: randomBarFrom(nextBars, monthlyPick?.barId ?? null).id,
      })
    }

    setBarForm(defaultBarForm)
    setStatusMessage(`Added ${name} to the list.`)
  }

  const removeBar = (barId) => {
    if (session?.role !== 'admin') {
      setStatusMessage('Only admins can remove bars.')
      return
    }

    const nextBars = bars.filter((bar) => bar.id !== barId)
    setBars(nextBars)

    if (editingBarId === barId) {
      setEditingBarId(null)
      setBarForm(defaultBarForm)
    }

    if (nextBars.length === 0) {
      setMonthlyPick(null)
      setStatusMessage('Bar removed from the list.')
      return
    }

    const currentMonth = getMonthKey()
    const removedCurrentPick = monthlyPick?.barId === barId
    const monthExpired = monthlyPick?.monthKey !== currentMonth

    if (removedCurrentPick || monthExpired || !monthlyPick) {
      setMonthlyPick({
        monthKey: currentMonth,
        barId: randomBarFrom(nextBars, barId).id,
      })
    }

    setStatusMessage('Bar removed from the list.')
  }

  const submitCheckIn = (response) => {
    if (session?.role !== 'subscriber' || !monthlyPick) {
      return
    }

    setMonthlyCheckIns((currentCheckIns) => ({
      ...currentCheckIns,
      [monthlyPick.monthKey]: {
        ...(currentCheckIns[monthlyPick.monthKey] ?? {}),
        [session.displayName]: response,
      },
    }))

    setStatusMessage(
      response === 'going'
        ? `${session.displayName} is going to the bar of the month.`
        : `${session.displayName} is not going to the bar of the month.`,
    )
  }

  const generateInvite = (recipient) => {
    if (session?.role !== 'admin') {
      setStatusMessage('Only admins can create invites.')
      return null
    }

    const invite = {
      id: `invite-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      code: generateInviteCode(),
      recipient: recipient.trim(),
      createdAt: new Date().toISOString(),
      usedBy: null,
    }

    setInvites((currentInvites) => [invite, ...currentInvites])
    setStatusMessage(`Invite ${invite.code} created.`)
    return invite
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={session ? '/bars' : '/login'} replace />}
        />
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/bars" replace />
            ) : (
              <LoginPage onAuthenticate={authenticate} authError={authError} />
            )
          }
        />
        <Route
          path="/bars"
          element={
            <ProtectedRoute session={session}>
              <BarsPage
                bars={bars}
                session={session}
                monthlyPick={monthlyPick}
                statusMessage={statusMessage}
                barForm={barForm}
                setBarForm={setBarForm}
                editingBarId={editingBarId}
                startEditingBar={startEditingBar}
                cancelEditing={cancelEditing}
                saveBar={saveBar}
                runMonthlyPickNow={runMonthlyPickNow}
                removeBar={removeBar}
                onLogout={handleLogout}
                monthlyCheckIns={monthlyCheckIns}
                submitCheckIn={submitCheckIn}
                invites={invites}
                generateInvite={generateInvite}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={session ? '/bars' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
