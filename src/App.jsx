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

function SiteBanner() {
  return (
    <div className="site-banner">
      <img
        src={`${import.meta.env.BASE_URL}logos/1000001922.jpg`}
        alt="Distinguished Gentlemen of Questionable Establishments logo"
        className="site-logo-cover"
      />
    </div>
  )
}

function PageCard({ children, ...rest }) {
  return (
    <section className="static-page-card" {...rest}>
      <SiteBanner />
      {children}
    </section>
  )
}

const seedBars = [
  {
    id: 'homy-inn-1',
    name: 'Homy Inn',
    address: '1510 N Saddle Creek Rd, Omaha, NE 68132',
    notes: '',
  },
  {
    id: 'dinkers-bar-2',
    name: 'Dinkers Bar',
    address: '2368 S 29th St, Omaha, NE 68105',
    notes: '',
  },
  {
    id: 'oleavers-pub-3',
    name: 'O’Leaver’s Pub',
    address: '1322 S Saddle Creek Rd, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'alpine-inn-4',
    name: 'Alpine Inn',
    address: '10405 Calhoun Rd, Omaha, NE 68124',
    notes: '',
  },
  {
    id: 'rose-crown-pub-5',
    name: 'Rose & Crown Pub',
    address: '515 S 20th St, Omaha, NE 68102',
    notes: '',
  },
  {
    id: 'jerrys-bar-6',
    name: 'Jerry’s Bar',
    address: '6301 Military Ave, Omaha, NE 68116',
    notes: '',
  },
  {
    id: 'the-elbow-room-7',
    name: 'The Elbow Room',
    address: '4973 Center St, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'aussies-pub-8',
    name: 'Aussie’s Pub',
    address: '2326 N 72nd St, Omaha, NE 68134',
    notes: '',
  },
  {
    id: 'nifty-bar-grill-9',
    name: 'Nifty Bar & Grill',
    address: '4721 NW Radial Hwy, Omaha, NE 68104',
    notes: '',
  },
  {
    id: 'neighbers-10',
    name: 'Neighbers',
    address: '4689 Leavenworth St, Omaha, NE 68132',
    notes: '',
  },
  {
    id: 'poop-deck-bar-11',
    name: 'Poop Deck Bar',
    address: '6006 Grover St, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'the-sociable-inn-12',
    name: 'The Sociable Inn',
    address: '4917 S 136th St, Omaha, NE 68137',
    notes: '',
  },
  {
    id: 'wayside-tavern-13',
    name: 'Wayside Tavern',
    address: '8503 Maple St, Omaha, NE 68134',
    notes: '',
  },
  {
    id: 'forgot-store-14',
    name: 'Forgot Store',
    address: '11909 Calhoun Rd, Omaha, NE 68164',
    notes: '',
  },
  {
    id: 'fan-tan-club-15',
    name: 'Fan Tan Club',
    address: '5915 Center St, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'bucky-dexters-16',
    name: 'Bucky Dexter’s',
    address: '4213 S 84th St, Omaha, NE 68127',
    notes: '',
  },
  {
    id: 'pops-place-bar-17',
    name: 'Pop’s Place Bar',
    address: '3520 F St, Omaha, NE 68107',
    notes: '',
  },
  {
    id: 'blind-daves-bar-18',
    name: 'Blind Dave’s Bar',
    address: '5082 S 136th St, Omaha, NE 68137',
    notes: '',
  },
  {
    id: 'winchester-bar-grill-19',
    name: 'Winchester Bar & Grill',
    address: '7002 Q St, Omaha, NE 68117',
    notes: '',
  },
  {
    id: 'green-onion-lounge-20',
    name: 'Green Onion Lounge',
    address: '11414 Davenport St, Omaha, NE 68154',
    notes: '',
  },
  {
    id: 'holiday-lounge-21',
    name: 'Holiday Lounge',
    address: '7846 W Dodge Rd, Omaha, NE 68114',
    notes: '',
  },
  {
    id: 'interlude-lounge-22',
    name: 'Interlude Lounge',
    address: '7643 Pacific St, Omaha, NE 68114',
    notes: '',
  },
  {
    id: 'josephines-cozy-corner-lounge-23',
    name: "Josephine's Cozy Corner Lounge",
    address: '2201 Pierce St, Omaha, NE 68108',
    notes: '',
  },
  {
    id: 'corner-pocket-bar-24',
    name: 'Corner Pocket Bar',
    address: '4201 S 38th St, Omaha, NE 68107',
    notes: '',
  },
  {
    id: 'aldermans-bar-25',
    name: "Alderman's Bar",
    address: '3216 Leavenworth St, Omaha, NE 68105',
    notes: '',
  },
  {
    id: 'white-house-bar-grill-26',
    name: 'White House Bar & Grill',
    address: '7768 Cass St, Omaha, NE 68114',
    notes: '',
  },
  {
    id: 'underwood-bar-27',
    name: 'Underwood Bar',
    address: '4918 Underwood Ave, Omaha, NE 68132',
    notes: '',
  },
  {
    id: 'candlelight-bar-grill-28',
    name: 'Candlelight Bar & Grill',
    address: '5031 Grover St, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'blondies-pub-pizza-29',
    name: 'Blondies Pub & Pizza',
    address: '5010 Grover Street, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'tracks-lounge-30',
    name: 'Tracks Lounge',
    address: '1506 S 60th St, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'my-way-lounge-31',
    name: 'My Way Lounge',
    address: '2425 N 84th St, Omaha, NE 68134',
    notes: '',
  },
  {
    id: 'fullhouse-bar-32',
    name: 'FullHouse Bar',
    address: '6135 Military Ave, Omaha, NE 68104',
    notes: '',
  },
  {
    id: 'california-bar-33',
    name: 'California Bar',
    address: '510 N 33rd St, Omaha, NE 68131',
    notes: '',
  },
  {
    id: 'beer-city-34',
    name: 'Beer City',
    address: '4147 L St, Omaha, NE 68107',
    notes: '',
  },
  {
    id: 'office-west-lounge-35',
    name: 'Office West Lounge',
    address: '1266 S 119th Ct, Omaha, NE 68144',
    notes: '',
  },
  {
    id: 'joes-duck-inn-bar-36',
    name: "Joe's Duck Inn Bar",
    address: '13336 Millard Ave #5, Omaha, NE 68137',
    notes: '',
  },
  {
    id: 'happy-bar-37',
    name: 'Happy Bar',
    address: '601 N 16th St, Omaha, NE 68102',
    notes: '',
  },
  {
    id: 'turf-club-38',
    name: 'Turf Club',
    address: '2404 S 60th St, Omaha, NE 68106',
    notes: '',
  },
  {
    id: 'shakedown-street-tavern-39',
    name: 'Shakedown Street Tavern',
    address: '2735 N 62nd St, Omaha, NE 68104',
    notes: '',
  },
  {
    id: 'pheasant-bar-and-grill-40',
    name: 'Pheasant Bar and Grill',
    address: '13909 S Plaza, Omaha, NE 68137',
    notes: '',
  },
  {
    id: 'keystone-tavern-grill-41',
    name: 'Keystone Tavern & Grill',
    address: '7821 Military Ave, Omaha, NE 68134',
    notes: '',
  },
  {
    id: 'touch-of-class-lounge-42',
    name: 'Touch of Class Lounge',
    address: '11220 Fort St #102, Omaha, NE 68164',
    notes: '',
  },
  {
    id: 'sippin-sirens-neighborhood-bar-43',
    name: "Sippin' Sirens Neighborhood Bar",
    address: '4302 S 42nd St, Omaha, NE 68107',
    notes: '',
  },
  {
    id: 'burkes-pub-44',
    name: "Burke's Pub",
    address: '6117 Maple St, Omaha, NE 68104',
    notes: '',
  },
  {
    id: 'report-in-pub-45',
    name: 'Report In Pub',
    address: '12100 W Center Rd STE 204, Omaha, NE 68144',
    notes: '',
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

    const normalizeBar = (bar) => ({
      id: bar.id,
      name: bar.name,
      address:
        typeof bar.address === 'string' && bar.address.trim().length > 0
          ? bar.address
          : bar.neighborhood,
      notes: typeof bar.notes === 'string' ? bar.notes : '',
    })

    const storedValidBars = parsedBars
      .filter(
        (bar) =>
          typeof bar?.id === 'string' &&
          typeof bar?.name === 'string' &&
          (typeof bar?.address === 'string' ||
            typeof bar?.neighborhood === 'string'),
      )
      .map(normalizeBar)

    const makeKey = (bar) =>
      `${bar.name}`.trim().toLowerCase() +
      '|' +
      `${bar.address}`.trim().toLowerCase()

    const existingKeys = new Set(storedValidBars.map(makeKey))
    const missingSeedBars = seedBars.filter((bar) => !existingKeys.has(makeKey(bar)))

    return [...storedValidBars, ...missingSeedBars]
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
      parsedPick &&
      typeof parsedPick === 'object' &&
      typeof parsedPick.monthKey === 'string' &&
      typeof parsedPick.barId === 'string'
    ) {
      return parsedPick
    }

    return null
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

const getNavLinkClassName = ({ isActive }) =>
  isActive ? 'nav-link active' : 'nav-link'

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
      navigate('/home', { replace: true })
    }
  }

  return (
    <main className="login-shell">
      <SiteBanner />
      <section className="login-card">
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

        <p>Admins should use their assigned credentials.</p>
        <p>Subscribers need an invite code before they can create an account.</p>
        {authError ? <p className="error-text">{authError}</p> : null}
        </section>
    </main>
  )
}

function BarsPage({
  bars,
  session,
  statusMessage,
  removeBar,
  onLogout,
  barForm,
  setBarForm,
  saveBar,
}) {
  const navigate = useNavigate()
  const isAdmin = session?.role === 'admin'

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login?loggedOut=1', { replace: true })
  }

  return (
    <main className="static-page-shell">
      <PageCard aria-live="polite">
        <div className="top-controls">
          <button type="button" className="ghost" onClick={handleLogoutClick}>
            Log out
          </button>
          <nav className="top-nav" aria-label="Primary">
            <NavLink to="/home" className={getNavLinkClassName}>Home</NavLink>
            <NavLink to="/bars" className={getNavLinkClassName}>Bars</NavLink>
            <NavLink to="/bylaws" className={getNavLinkClassName}>Bylaws</NavLink>
            <NavLink to="/wheel" className={getNavLinkClassName}>Wheel</NavLink>
          </nav>
        </div>

        <h1 className="page-title">Bars</h1>

        {statusMessage ? <p className="status-text">{statusMessage}</p> : null}

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
              Add bar
            </button>
          </div>
        </form>

        <div className="result-header">
          <h2>Bar list</h2>
          <p>{bars.length === 0 ? 'No bars added yet.' : `${bars.length} bars`}</p>
        </div>

        <div className="bar-grid">
          {bars.map((bar) => (
            <article key={bar.id} className="bar-card">
              <h3>{bar.name}</h3>
              <p>{bar.address}</p>
              {bar.notes ? <p>{bar.notes}</p> : null}
              <div className="card-actions">
                {isAdmin ? (
                  <button
                    type="button"
                    className="ghost small"
                    onClick={() => removeBar(bar.id)}
                  >
                    Remove
                  </button>
                ) : (
                  <p className="info-text">Only admins can remove bars.</p>
                )}
              </div>
            </article>
          ))}

          {bars.length === 0 ? (
            <article className="bar-card empty-state">
              <h3>Start your list</h3>
              <p>Add your first bar to get going.</p>
            </article>
          ) : null}
        </div>
      </PageCard>
    </main>
  )
}

function HomePage({ onLogout, bars, monthlyPick }) {
  const navigate = useNavigate()

  const pickedBar = useMemo(() => {
    if (!monthlyPick) {
      return null
    }

    return bars.find((bar) => bar.id === monthlyPick.barId) ?? null
  }, [bars, monthlyPick])

  // Get the event date for display
  const eventDate = (() => {
    if (!monthlyPick) return null
    const [year, month] = monthlyPick.monthKey.split('-')
    const secondSat = (() => {
      let y = Number(year)
      let m = Number(month) - 1
      let date = new Date(y, m, 1)
      let count = 0
      while (date.getMonth() === m) {
        if (date.getDay() === 6) {
          count++
          if (count === 2) return new Date(y, m, date.getDate())
        }
        date.setDate(date.getDate() + 1)
      }
      return new Date(y, m, 1)
    })()
    return secondSat
  })()

  const currentMonthLabel = monthlyPick
    ? monthLabelFromKey(monthlyPick.monthKey)
    : monthLabelFromKey(getMonthKey())

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login?loggedOut=1', { replace: true })
  }

  return (
    <main className="static-page-shell">
        <PageCard>
        <div className="top-controls">
          <button type="button" className="ghost" onClick={handleLogoutClick}>
            Log out
          </button>
          <nav className="top-nav" aria-label="Primary">
              <NavLink to="/home" className={getNavLinkClassName}>Home</NavLink>
              <NavLink to="/bars" className={getNavLinkClassName}>Bars</NavLink>
              <NavLink to="/bylaws" className={getNavLinkClassName}>Bylaws</NavLink>
              <NavLink to="/wheel" className={getNavLinkClassName}>Wheel</NavLink>
          </nav>
        </div>

        <h1 className="page-title">
          The Distinguished Gentlemen of Questionable Establishments
        </h1>

        <p>
          The DGQE is a rotating fellowship devoted to the exploration and
          appreciation of Omaha’s finest dimly lit institutions. Convening every
          second Saturday, members gather in the spirit of brotherhood, cultural
          enrichment, and the responsible study of well drinks and jukebox
          selections.
        </p>

        <div className="monthly-card">
          <h2>{currentMonthLabel} · Bar of the Month</h2>
          {eventDate ? (
            <p>
              <strong>Event date:</strong>{' '}
              {eventDate.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          ) : null}
          {pickedBar ? (
            <>
              <p className="pick-name">{pickedBar.name}</p>
              <p>{pickedBar.address}</p>
              {pickedBar.notes ? <p>{pickedBar.notes}</p> : null}
            </>
          ) : (
            <p>Add bars to generate a monthly pick.</p>
          )}
        </div>
      </PageCard>
    </main>
  )
}

function BylawsPage({ onLogout }) {
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login?loggedOut=1', { replace: true })
  }

  return (
    <main className="static-page-shell">
      <PageCard>
        <div className="top-controls">
          <button type="button" className="ghost" onClick={handleLogoutClick}>
            Log out
          </button>
          <nav className="top-nav" aria-label="Primary">
            <NavLink to="/home" className={getNavLinkClassName}>Home</NavLink>
            <NavLink to="/bars" className={getNavLinkClassName}>Bars</NavLink>
            <NavLink to="/bylaws" className={getNavLinkClassName}>Bylaws</NavLink>
            <NavLink to="/wheel" className={getNavLinkClassName}>Wheel</NavLink>
          </nav>
        </div>

        <h1 className="page-title">Bylaws</h1>

        <section className="bylaws-article">
          <h2>Article I - Membership</h2>
          <ol className="bylaws-list">
            <li>Membership is reserved for gentlemen of sound character and adaptable standards.</li>
            <li>
              A Distinguished Gentleman must demonstrate commitment to the second Saturday gathering and a readiness to explore new establishments without prejudice.
            </li>
            <li>All members shall treat staff, patrons, and premises with courtesy and proper respect.</li>
            <li>Formal attire not required.</li>
          </ol>
        </section>

        <section className="bylaws-article">
          <h2>Article II - Assembly</h2>
          <ol className="bylaws-list">
            <li>The Distinguished Gentlemen shall assemble on the second Saturday of each month, starting at 7:00pm.</li>
            <li>
              Each gathering shall occur at a different establishment, selected to ensure proper rotation and continued discovery.
            </li>
            <li>
              A quorum shall consist of no fewer than three Gentlemen; if the quorum cannot be met, the establishment visit shall be delayed until the following month.
            </li>
            <li>Attendance is encouraged, but not required or pressured.</li>
          </ol>
        </section>

        <section className="bylaws-article">
          <h2>Article III - Conduct</h2>
          <ol className="bylaws-list">
            <li>Gentlemen shall conduct themselves in a manner befitting their title.</li>
            <li>Arrive prepared to pay with cash; tipping shall be generous.</li>
            <li>Members shall respect the chosen rotation of venues and not unilaterally redirect the group.</li>
          </ol>
        </section>

        <section className="bylaws-article">
          <h2>Article IV - Traditions</h2>
          <ol className="bylaws-list">
            <li>A ceremonial round of shots is suggested but not mandatory upon arrival of quorum.</li>
            <li>Attendance is to be documented for the preservation of club history.</li>
            <li>Lore may be retold at future gatherings, with minor and tasteful embellishment permitted.</li>
          </ol>
        </section>

        <section className="bylaws-article">
          <h2>Article V - Amendments</h2>
          <ol className="bylaws-list">
            <li>These bylaws may be amended by unanimous agreement of the Distinguished Gentlemen present.</li>
          </ol>
        </section>
      </PageCard>
    </main>
  )
}

function WheelPage({ bars, onLogout }) {
  const navigate = useNavigate()
  const [pickedBar, setPickedBar] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [finalIndex, setFinalIndex] = useState(null)

  const wheelSize = 420
  const center = wheelSize / 2
  const outerRadius = 200
  const innerRadius = 86
  const labelRadius = 150
  const labelMode = bars.length > 24 ? 'index' : 'name'
  const wheelColors = useMemo(
    () => ['#f5d0fe', '#bfdbfe', '#fde68a', '#fecdd3', '#d9f99d', '#ddd6fe', '#fed7aa'],
    []
  )

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login?loggedOut=1', { replace: true })
  }

  const spinWheel = () => {
    if (bars.length === 0 || spinning) return
    setSpinning(true)
    const idx = Math.floor(Math.random() * bars.length)
    setFinalIndex(idx)
    const sliceAngle = 360 / bars.length
    const selectedCenterAngle = idx * sliceAngle + sliceAngle / 2
    const pointerAngle = 270
    const fullSpinsPerClick = 5

    setRotation((previousRotation) => {
      const normalizedPreviousRotation =
        ((previousRotation % 360) + 360) % 360
      const targetNormalizedRotation =
        (pointerAngle - selectedCenterAngle + 360) % 360
      const clockwiseDelta =
        (targetNormalizedRotation - normalizedPreviousRotation + 360) % 360

      return previousRotation + fullSpinsPerClick * 360 + clockwiseDelta
    })
    setTimeout(() => {
      setPickedBar(bars[idx])
      setSpinning(false)
    }, 2200)
  }

  const wheelSegments = useMemo(() => {
    if (bars.length === 0) return []

    const sliceAngle = (2 * Math.PI) / bars.length
    return bars.map((bar, idx) => {
      const startAngle = idx * sliceAngle
      const endAngle = startAngle + sliceAngle
      const midAngle = startAngle + sliceAngle / 2

      const x1 = center + outerRadius * Math.cos(startAngle)
      const y1 = center + outerRadius * Math.sin(startAngle)
      const x2 = center + outerRadius * Math.cos(endAngle)
      const y2 = center + outerRadius * Math.sin(endAngle)
      const x3 = center + innerRadius * Math.cos(endAngle)
      const y3 = center + innerRadius * Math.sin(endAngle)
      const x4 = center + innerRadius * Math.cos(startAngle)
      const y4 = center + innerRadius * Math.sin(startAngle)
      const largeArc = sliceAngle > Math.PI ? 1 : 0

      const path = `M${x1},${y1} A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${x2},${y2} L${x3},${y3} A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${x4},${y4} Z`
      const labelX = center + labelRadius * Math.cos(midAngle)
      const labelY = center + labelRadius * Math.sin(midAngle)
      const textAngle = (midAngle * 180) / Math.PI
      const flipText = textAngle > 90 && textAngle < 270
      const textRotation = textAngle + (flipText ? 180 : 0)
      const rawLabel = labelMode === 'index' ? String(idx + 1) : bar.name
      const label =
        labelMode === 'name' && rawLabel.length > 15
          ? `${rawLabel.slice(0, 13)}…`
          : rawLabel

      return {
        bar,
        idx,
        path,
        label,
        labelX,
        labelY,
        textRotation,
      }
    })
  }, [bars, center, innerRadius, labelMode, labelRadius, outerRadius])

  return (
    <main className="static-page-shell">
      <PageCard>
        <div className="top-controls">
          <button type="button" className="ghost" onClick={handleLogoutClick}>
            Log out
          </button>
          <nav className="top-nav" aria-label="Primary">
              <NavLink to="/home" className={getNavLinkClassName}>Home</NavLink>
              <NavLink to="/bars" className={getNavLinkClassName}>Bars</NavLink>
              <NavLink to="/bylaws" className={getNavLinkClassName}>Bylaws</NavLink>
              <NavLink to="/wheel" className={getNavLinkClassName}>Wheel</NavLink>
          </nav>
        </div>

        <h1 className="page-title">Wheel</h1>

        <p>Use the wheel to quickly pick a bar from your current list.</p>

        {pickedBar ? (
          <article className="wheel-result wheel-result-top">
            <h2>{pickedBar.name}</h2>
            <p>{pickedBar.address}</p>
            {pickedBar.notes ? <p>{pickedBar.notes}</p> : null}
          </article>
        ) : (
          <p className="wheel-result-hint">
            {bars.length > 0 ? 'Spin to choose a bar.' : 'Add bars to use the wheel.'}
          </p>
        )}

        <div className="wheel-shell">
          <div className="wheel-circle">
            {bars.length > 0 ? (
              <svg
                width={wheelSize}
                height={wheelSize}
                viewBox={`0 0 ${wheelSize} ${wheelSize}`}
                className="wheel-svg"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning
                    ? 'transform 2.2s cubic-bezier(.32,.72,.52,1.01)'
                    : 'none',
                }}
              >
                {wheelSegments.map((segment) => {
                  const isSelected =
                    segment.idx === finalIndex && !spinning

                  return (
                    <g key={segment.bar.id}>
                      <path
                        d={segment.path}
                        fill={wheelColors[segment.idx % wheelColors.length]}
                        fillOpacity={1}
                        stroke={isSelected ? 'var(--accent)' : '#ffffff'}
                        strokeWidth={isSelected ? 4 : 1.6}
                        className={isSelected ? 'wheel-segment-selected' : ''}
                      />
                      <text
                        x={segment.labelX}
                        y={segment.labelY}
                        transform={`rotate(${segment.textRotation} ${segment.labelX} ${segment.labelY})`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="wheel-label"
                        style={{
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: labelMode === 'index' ? 15 : 11,
                        }}
                      >
                        {segment.label}
                      </text>
                    </g>
                  )
                })}
              </svg>
            ) : (
              <span className="wheel-empty">Ready to spin</span>
            )}
            <div className="wheel-center-hub" aria-live="polite">
              <p className="wheel-center-label">{pickedBar ? 'Selected' : 'Ready'}</p>
              <p className="wheel-center-name">
                {pickedBar
                  ? pickedBar.name.length > 18
                    ? `${pickedBar.name.slice(0, 16)}…`
                    : pickedBar.name
                  : 'DGQE'}
              </p>
            </div>
            <div className="wheel-pointer" />
          </div>
          <button
            type="button"
            className="primary"
            onClick={spinWheel}
            disabled={bars.length === 0 || spinning}
            style={{ marginTop: 24, fontSize: 18, padding: '14px 28px' }}
          >
            {spinning ? 'Spinning...' : 'Spin wheel'}
          </button>

          {bars.length > 24 ? (
            <div className="wheel-legend" aria-label="Wheel label legend">
              {bars.map((bar, idx) => {
                const selected = idx === finalIndex && !spinning
                return (
                  <p
                    key={bar.id}
                    className={`wheel-legend-item${selected ? ' selected' : ''}`}
                  >
                    <span
                      className="wheel-legend-index"
                      style={{
                        background: wheelColors[idx % wheelColors.length],
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="wheel-legend-name">{bar.name}</span>
                  </p>
                )
              })}
            </div>
          ) : null}
        </div>
      </PageCard>
    </main>
  )
}

function App() {
  const [bars, setBars] = useState(readStoredBars)
  // Helper to get second Saturday for a given month/year
  const getSecondSaturday = (year, month) => {
    let date = new Date(year, month, 1)
    let saturdayCount = 0
    while (date.getMonth() === month) {
      if (date.getDay() === 6) {
        saturdayCount++
        if (saturdayCount === 2) {
          return new Date(date.getFullYear(), date.getMonth(), date.getDate())
        }
      }
      date.setDate(date.getDate() + 1)
    }
    return new Date(year, month, 1)
  }

  // Find the next upcoming second Saturday
  const getNextSecondSaturday = (fromDate = new Date()) => {
    let year = fromDate.getFullYear()
    let month = fromDate.getMonth()
    let secondSat = getSecondSaturday(year, month)
    // Use only date part for comparison
    const today = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
    if (today >= secondSat) {
      // Move to next month
      month++
      if (month > 11) {
        month = 0
        year++
      }
      secondSat = getSecondSaturday(year, month)
    }
    return secondSat
  }

  const nextSecondSaturday = getNextSecondSaturday()
  const monthKey = getMonthKey(nextSecondSaturday)

  const [monthlyPick, setMonthlyPick] = useState(() => {
    const storedPick = readStoredMonthlyPick()

    if (bars.length === 0) {
      return null
    }

    if (
      storedPick?.monthKey === monthKey &&
      bars.some((bar) => bar.id === storedPick.barId)
    ) {
      return storedPick
    }

    const pick = randomBarFrom(bars, storedPick?.barId ?? null)
    return {
      monthKey,
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={session ? '/home' : '/login'} replace />}
        />
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage onAuthenticate={authenticate} authError={authError} />
            )
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute session={session}>
              <HomePage
                onLogout={handleLogout}
                bars={bars}
                monthlyPick={monthlyPick}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bars"
          element={
            <ProtectedRoute session={session}>
              <BarsPage
                bars={bars}
                session={session}
                statusMessage={statusMessage}
                removeBar={removeBar}
                onLogout={handleLogout}
                barForm={barForm}
                setBarForm={setBarForm}
                saveBar={saveBar}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bylaws"
          element={
            <ProtectedRoute session={session}>
              <BylawsPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wheel"
          element={
            <ProtectedRoute session={session}>
              <WheelPage bars={bars} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={session ? '/home' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
