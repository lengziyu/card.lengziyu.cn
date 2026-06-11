import { allListCards, type CardListItem, type Category } from '@/data/cards'
import { getCardDetailSpec, type CardBenefit, type FeeLine } from '@/data/cardDetails'
import { getCardVisual } from '@/data/cardVisuals'

export type AdminCardStatus = 'draft' | 'published' | 'archived'
export type CrawlDraftStatus = 'pending' | 'approved' | 'rejected'

export interface AdminSession {
  token: string
  account: string
  name: string
  role: 'admin'
  expiresAt: string
}

export interface AdminLoginPayload {
  account: string
  password: string
  remember?: boolean
}

export interface AdminCardRecord {
  id: string
  name: string
  issuer: string
  category: Category
  status: AdminCardStatus
  network: string
  logo: string
  logoText: string
  suffix: string
  suffixType: CardListItem['suffixType']
  featured: boolean
  rankTier: string
  rating: number
  reviews: number
  tags: string[]
  benefits: CardBenefit[]
  fees: FeeLine[]
  region: string
  funding: string
  speed: string
  applyUrl: string
  sourceUrl: string
  sourceName: string
  material: string
  updatedAt: string
  createdAt: string
}

export interface CrawlDraftRecord extends AdminCardRecord {
  draftId: string
  draftStatus: CrawlDraftStatus
  crawledAt: string
  crawlSource: string
  confidence: number
  changeSummary: string[]
}

export class AdminApiError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'AdminApiError'
    this.code = code
  }
}

const ADMIN_SESSION_KEY = 'card-h5-admin-session-v1'
const ADMIN_CARDS_KEY = 'card-h5-admin-cards-v1'
const CRAWL_DRAFTS_KEY = 'card-h5-crawl-drafts-v1'
const MOCK_DELAY = 180

function wait() {
  return new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function makeSession(payload: AdminLoginPayload): AdminSession {
  const maxAge = payload.remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 12

  return {
    token: `admin_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`,
    account: payload.account.trim(),
    name: 'Card 数据管理员',
    role: 'admin',
    expiresAt: new Date(Date.now() + maxAge).toISOString()
  }
}

function validateSession(session: AdminSession | null) {
  if (!session) return null

  const expiresAt = new Date(session.expiresAt).getTime()
  if (!expiresAt || expiresAt <= Date.now()) {
    window.localStorage.removeItem(ADMIN_SESSION_KEY)
    return null
  }

  return session.role === 'admin' ? session : null
}

function inferNetwork(card: CardListItem) {
  if (card.suffixType === 'visa') return 'VISA'
  if (card.suffixType === 'mc') return 'Mastercard'
  if (card.suffixType === 'virtual') return 'Virtual'
  return card.suffix || '待确认'
}

function inferTier(id: string) {
  if (['etherfi', 'plasma'].includes(id)) return '夯'
  if (['bybit', 'bitget', 'redotpay', 'mexc'].includes(id)) return '顶级'
  if (['tria', 'kast'].includes(id)) return '人上人'
  if (['crypto', 'okx', 'cypher', 'metamask'].includes(id)) return 'NPC'
  if (['solayer', '1inch', 'avici', 'coinbase'].includes(id)) return '拉完了'
  return '未分层'
}

function makeAdminCard(card: CardListItem): AdminCardRecord {
  const detail = getCardDetailSpec(card.id)
  const visual = getCardVisual(card.id)
  const now = new Date().toISOString()

  return {
    id: card.id,
    name: card.name,
    issuer: card.issuer,
    category: card.category,
    status: 'published',
    network: inferNetwork(card),
    logo: card.logo,
    logoText: card.logoText,
    suffix: card.suffix,
    suffixType: card.suffixType,
    featured: Boolean(card.featured),
    rankTier: inferTier(card.id),
    rating: detail.rating,
    reviews: detail.reviews,
    tags: [...detail.tags],
    benefits: detail.benefits.map((item) => ({ ...item })),
    fees: detail.fees.map((item) => ({ ...item })),
    region: detail.region,
    funding: detail.funding,
    speed: detail.speed,
    applyUrl: detail.applyUrl,
    sourceUrl: visual?.detail.sourceUrl || detail.applyUrl,
    sourceName: visual?.detail.sourceName || card.issuer,
    material: visual?.detail.material || '待补充卡面样式',
    createdAt: now,
    updatedAt: now
  }
}

function seedCards() {
  const seen = new Set<string>()
  return allListCards
    .filter((card) => {
      if (seen.has(card.id)) return false
      seen.add(card.id)
      return true
    })
    .map(makeAdminCard)
}

function seedDrafts(): CrawlDraftRecord[] {
  const now = new Date().toISOString()
  const drafts: Array<Omit<CrawlDraftRecord, 'createdAt' | 'updatedAt' | 'crawledAt'>> = [
    {
      draftId: 'draft-rain',
      draftStatus: 'pending',
      crawlSource: 'official-page',
      confidence: 82,
      changeSummary: ['发现官网申请入口', '识别到 Visa 卡组织', '卡面色彩需人工确认'],
      id: 'rain-card',
      name: 'Rain Card',
      issuer: 'Rain',
      category: 'U卡',
      status: 'draft',
      network: 'VISA',
      logo: 'logo-plasma',
      logoText: 'R',
      suffix: 'VISA',
      suffixType: 'visa',
      featured: false,
      rankTier: '待分层',
      rating: 4.2,
      reviews: 0,
      tags: ['U卡', '中东', '待审核'],
      benefits: [
        { icon: 'wallet', text: '加密余额消费' },
        { icon: 'shield', text: '账户风控' },
        { icon: 'market', text: 'Visa 网络' },
        { icon: 'grid', text: '权益待确认' }
      ],
      fees: [
        { label: '开卡费', value: '待确认' },
        { label: '年费', value: '待确认' },
        { label: '充值手续费', value: '按官网' },
        { label: '取现手续费', value: '待确认' }
      ],
      region: '按 Rain 开放地区',
      funding: '加密账户',
      speed: '申请后开通',
      applyUrl: 'https://www.rain.com/',
      sourceUrl: 'https://www.rain.com/',
      sourceName: 'Rain',
      material: '深蓝加密支付卡'
    },
    {
      draftId: 'draft-infini',
      draftStatus: 'pending',
      crawlSource: 'official-page',
      confidence: 76,
      changeSummary: ['抓到产品页标题', '权益描述较少', '费用字段需要补人工来源'],
      id: 'infini-card',
      name: 'Infini Card',
      issuer: 'Infini',
      category: 'U卡',
      status: 'draft',
      network: 'Mastercard',
      logo: 'logo-welab',
      logoText: 'I',
      suffix: 'wallet',
      suffixType: 'text',
      featured: false,
      rankTier: '待分层',
      rating: 4.1,
      reviews: 0,
      tags: ['U卡', '钱包', '待审核'],
      benefits: [
        { icon: 'wallet', text: '钱包余额' },
        { icon: 'market', text: '日常支付' },
        { icon: 'shield', text: 'App 管理' },
        { icon: 'grid', text: '权益待确认' }
      ],
      fees: [
        { label: '开卡费', value: '待确认' },
        { label: '年费', value: '待确认' },
        { label: '充值手续费', value: '待确认' },
        { label: '汇率/转换', value: '待确认' }
      ],
      region: '按官网开放地区',
      funding: '钱包余额',
      speed: '按申请进度',
      applyUrl: 'https://www.infini.money/',
      sourceUrl: 'https://www.infini.money/',
      sourceName: 'Infini',
      material: '浅色数字钱包卡'
    },
    {
      draftId: 'draft-revolut',
      draftStatus: 'pending',
      crawlSource: 'bank-site',
      confidence: 88,
      changeSummary: ['官网结构稳定', '识别到多套餐费用', '需要拆分地区版本'],
      id: 'revolut',
      name: 'Revolut Card',
      issuer: 'Revolut',
      category: '银行账户',
      status: 'draft',
      network: 'VISA / Mastercard',
      logo: 'logo-n26',
      logoText: 'R',
      suffix: 'account',
      suffixType: 'text',
      featured: false,
      rankTier: '待分层',
      rating: 4.4,
      reviews: 0,
      tags: ['银行账户', '欧区', '待审核'],
      benefits: [
        { icon: 'wallet', text: '多币种账户' },
        { icon: 'plane', text: '旅行消费' },
        { icon: 'shield', text: '卡片冻结' },
        { icon: 'grid', text: '套餐权益' }
      ],
      fees: [
        { label: '开卡费', value: '按套餐' },
        { label: '月费', value: '按套餐' },
        { label: '外币兑换', value: '按套餐' },
        { label: 'ATM 取现', value: '按地区' }
      ],
      region: '欧洲及开放地区',
      funding: '银行账户',
      speed: '虚拟卡优先',
      applyUrl: 'https://www.revolut.com/',
      sourceUrl: 'https://www.revolut.com/',
      sourceName: 'Revolut',
      material: '多彩银行账户卡'
    }
  ]

  return drafts.map((draft) => ({
    ...draft,
    createdAt: now,
    updatedAt: now,
    crawledAt: now
  }))
}

function ensureCards() {
  const cards = readJson<AdminCardRecord[] | null>(ADMIN_CARDS_KEY, null)
  if (cards?.length) return cards

  const seeded = seedCards()
  writeJson(ADMIN_CARDS_KEY, seeded)
  return seeded
}

function ensureDrafts() {
  const drafts = readJson<CrawlDraftRecord[] | null>(CRAWL_DRAFTS_KEY, null)
  if (drafts?.length) return drafts

  const seeded = seedDrafts()
  writeJson(CRAWL_DRAFTS_KEY, seeded)
  return seeded
}

function writeCards(cards: AdminCardRecord[]) {
  writeJson(ADMIN_CARDS_KEY, cards)
}

function writeDrafts(drafts: CrawlDraftRecord[]) {
  writeJson(CRAWL_DRAFTS_KEY, drafts)
}

export function readCachedAdminSession() {
  return validateSession(readJson<AdminSession | null>(ADMIN_SESSION_KEY, null))
}

export async function getAdminSession() {
  await wait()
  return readCachedAdminSession()
}

export async function loginAdmin(payload: AdminLoginPayload) {
  await wait()
  const account = payload.account.trim()
  const password = payload.password.trim()

  if (!account || !password) {
    throw new AdminApiError('VALIDATION_ERROR', '请输入管理员账号和密码')
  }

  if (account !== 'admin' || password !== 'admin123') {
    throw new AdminApiError('INVALID_CREDENTIALS', '管理员账号或密码不正确')
  }

  const session = makeSession(payload)
  writeJson(ADMIN_SESSION_KEY, session)
  return session
}

export async function logoutAdmin() {
  await wait()
  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}

export async function listAdminCards() {
  await wait()
  return ensureCards()
}

export async function getAdminCard(id: string) {
  await wait()
  return ensureCards().find((card) => card.id === id) || null
}

export async function saveAdminCard(card: AdminCardRecord) {
  await wait()
  const now = new Date().toISOString()
  const cards = ensureCards()
  const index = cards.findIndex((item) => item.id === card.id)
  const nextCard: AdminCardRecord = {
    ...card,
    createdAt: card.createdAt || now,
    updatedAt: now
  }

  if (index >= 0) {
    cards.splice(index, 1, nextCard)
  } else {
    cards.unshift(nextCard)
  }

  writeCards(cards)
  return nextCard
}

export async function archiveAdminCard(id: string) {
  await wait()
  const cards = ensureCards()
  const nextCards = cards.map((card) =>
    card.id === id ? { ...card, status: 'archived' as const, updatedAt: new Date().toISOString() } : card
  )
  writeCards(nextCards)
  return nextCards.find((card) => card.id === id) || null
}

export async function listCrawlDrafts() {
  await wait()
  return ensureDrafts().filter((draft) => draft.draftStatus === 'pending')
}

export async function approveCrawlDraft(draftId: string) {
  await wait()
  const drafts = ensureDrafts()
  const draft = drafts.find((item) => item.draftId === draftId)
  if (!draft) throw new AdminApiError('DRAFT_NOT_FOUND', '草稿不存在')

  const now = new Date().toISOString()
  const card: AdminCardRecord = {
    ...draft,
    status: 'published',
    updatedAt: now,
    createdAt: now
  }
  delete (card as Partial<CrawlDraftRecord>).draftId
  delete (card as Partial<CrawlDraftRecord>).draftStatus
  delete (card as Partial<CrawlDraftRecord>).crawledAt
  delete (card as Partial<CrawlDraftRecord>).crawlSource
  delete (card as Partial<CrawlDraftRecord>).confidence
  delete (card as Partial<CrawlDraftRecord>).changeSummary

  await saveAdminCard(card)
  writeDrafts(drafts.filter((item) => item.draftId !== draftId))
  return card
}

export async function rejectCrawlDraft(draftId: string) {
  await wait()
  const drafts = ensureDrafts().filter((item) => item.draftId !== draftId)
  writeDrafts(drafts)
}

export async function runMockCrawler() {
  await wait()
  const drafts = ensureDrafts()
  const now = new Date().toISOString()
  const draft: CrawlDraftRecord = {
    ...seedDrafts()[0],
    draftId: `draft-auto-${Date.now().toString(36)}`,
    id: `auto-card-${Date.now().toString(36)}`,
    name: 'New Crawled Card',
    issuer: 'Crawler Bot',
    logoText: 'N',
    draftStatus: 'pending',
    crawledAt: now,
    createdAt: now,
    updatedAt: now,
    confidence: 64,
    changeSummary: ['模拟爬虫新增一条候选卡片', '需要人工确认卡面与费用', '发布前建议补充官网来源']
  }

  writeDrafts([draft, ...drafts])
  return draft
}

export async function resetAdminDemoData() {
  await wait()
  window.localStorage.removeItem(ADMIN_CARDS_KEY)
  window.localStorage.removeItem(CRAWL_DRAFTS_KEY)

  return {
    cards: ensureCards(),
    drafts: ensureDrafts()
  }
}
