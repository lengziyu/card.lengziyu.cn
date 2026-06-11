export interface AuthUser {
  id: string
  username: string
  displayName: string
  email?: string
  membership: 'Basic' | 'Platinum'
  createdAt: string
}

export interface AuthSession {
  token: string
  user: AuthUser
  expiresAt: string
}

export interface LoginPayload {
  account: string
  password: string
  remember?: boolean
}

export interface RegisterPayload {
  username: string
  password: string
  displayName?: string
  email?: string
  remember?: boolean
}

interface StoredUser extends AuthUser {
  emailSearch: string
  passwordDigest: string
  usernameSearch: string
}

export class AuthApiError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'AuthApiError'
    this.code = code
  }
}

const USERS_KEY = 'card-h5-auth-users-v1'
const SESSION_KEY = 'card-h5-auth-session-v1'
const TOKEN_PREFIX = 'card_session'
const MOCK_DELAY = 260

function wait() {
  return new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function writeSession(session: AuthSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

function toAuthUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    membership: user.membership,
    createdAt: user.createdAt
  }
}

async function digestPassword(password: string) {
  const base = `card-h5:${password}`

  if (window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(base)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded)
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  return window.btoa(unescape(encodeURIComponent(base)))
}

function makeSession(user: AuthUser, remember = false): AuthSession {
  const maxAge = remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 24

  return {
    token: `${TOKEN_PREFIX}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`,
    user,
    expiresAt: new Date(Date.now() + maxAge).toISOString()
  }
}

function validateSession(session: AuthSession | null) {
  if (!session) return null

  const expiresAt = new Date(session.expiresAt).getTime()
  if (!expiresAt || expiresAt <= Date.now()) {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }

  const user = readUsers().find((item) => item.id === session.user.id)
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }

  return {
    ...session,
    user: toAuthUser(user)
  }
}

export function readCachedSession(): AuthSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return validateSession(JSON.parse(raw) as AuthSession)
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export async function getSession() {
  await wait()
  return readCachedSession()
}

export async function login(payload: LoginPayload) {
  await wait()

  const account = normalize(payload.account)
  if (!account || !payload.password) {
    throw new AuthApiError('VALIDATION_ERROR', '请输入账号和密码')
  }

  const users = readUsers()
  const user = users.find((item) => item.usernameSearch === account || item.emailSearch === account)
  const passwordDigest = await digestPassword(payload.password)

  if (!user || user.passwordDigest !== passwordDigest) {
    throw new AuthApiError('INVALID_CREDENTIALS', '账号或密码不正确')
  }

  const session = makeSession(toAuthUser(user), payload.remember)
  writeSession(session)
  return session
}

export async function register(payload: RegisterPayload) {
  await wait()

  const username = payload.username.trim()
  const displayName = payload.displayName?.trim() || username
  const email = payload.email?.trim()
  const usernameSearch = normalize(username)
  const emailSearch = email ? normalize(email) : ''

  if (!/^[a-zA-Z0-9_]{3,18}$/.test(username)) {
    throw new AuthApiError('INVALID_USERNAME', '用户名需为 3-18 位字母、数字或下划线')
  }

  if (displayName.length > 24) {
    throw new AuthApiError('INVALID_DISPLAY_NAME', '昵称不能超过 24 个字符')
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AuthApiError('INVALID_EMAIL', '请输入有效邮箱')
  }

  if (payload.password.length < 6) {
    throw new AuthApiError('WEAK_PASSWORD', '密码至少需要 6 位')
  }

  const users = readUsers()
  if (users.some((item) => item.usernameSearch === usernameSearch)) {
    throw new AuthApiError('USERNAME_EXISTS', '用户名已被注册')
  }

  if (emailSearch && users.some((item) => item.emailSearch === emailSearch)) {
    throw new AuthApiError('EMAIL_EXISTS', '邮箱已被注册')
  }

  const now = new Date().toISOString()
  const user: StoredUser = {
    id: `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    username,
    usernameSearch,
    displayName,
    email,
    emailSearch,
    membership: 'Basic',
    createdAt: now,
    passwordDigest: await digestPassword(payload.password)
  }

  writeUsers([user, ...users])

  const session = makeSession(toAuthUser(user), payload.remember)
  writeSession(session)
  return session
}

export async function logout() {
  await wait()
  window.localStorage.removeItem(SESSION_KEY)
}
