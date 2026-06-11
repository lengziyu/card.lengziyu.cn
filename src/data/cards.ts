export type Category = 'U卡' | '信用卡' | '借记卡' | '银行账户'

export interface CardListItem {
  id: string
  name: string
  issuer: string
  category: Category
  logo: string
  logoText: string
  suffix: string
  suffixType?: 'text' | 'visa' | 'mc' | 'virtual'
  featured?: boolean
}

export interface WalletCardItem {
  id: string
  name: string
  label: string
  logo: string
  logoText: string
  variant: string
  network?: string
}

export interface TierItem {
  id: string
  name: string
  logo: string
  logoText: string
  cardId?: string
}

export interface TierGroup {
  id: string
  label: string
  color: string
  items: TierItem[]
}

export const categories: Category[] = ['U卡', '信用卡', '借记卡', '银行账户']

export const walletCards: WalletCardItem[] = [
  {
    id: 'apple-cash',
    name: 'Cash',
    label: 'VIRTUAL CARD',
    logo: 'logo-apple',
    logoText: 'Cash',
    variant: 'wallet-apple',
    network: 'wave'
  },
  {
    id: 'n26',
    name: 'N26',
    label: 'Worldwide',
    logo: 'logo-n26',
    logoText: 'N26',
    variant: 'wallet-n26',
    network: 'VISA'
  },
  {
    id: 'boc',
    name: 'Bank of China',
    label: '中银卡',
    logo: 'logo-boc',
    logoText: 'BOC',
    variant: 'wallet-boc'
  },
  {
    id: 'hsbc',
    name: 'HSBC',
    label: 'HSBC',
    logo: 'logo-hsbc',
    logoText: 'HSBC',
    variant: 'wallet-hsbc'
  },
  {
    id: 'welab',
    name: 'WeLab Bank',
    label: 'GLOBAL WALLET',
    logo: 'logo-welab',
    logoText: 'W',
    variant: 'wallet-welab'
  },
  {
    id: 'bybit',
    name: 'BYBIT',
    label: 'debit',
    logo: 'logo-bybit',
    logoText: 'BYB',
    variant: 'wallet-bybit'
  },
  {
    id: 'plasma',
    name: 'Plasma',
    label: 'Platinum',
    logo: 'logo-plasma',
    logoText: 'P',
    variant: 'wallet-plasma',
    network: 'VISA'
  },
  {
    id: 'etherfi',
    name: 'EtherFi',
    label: 'U CARD',
    logo: 'logo-etherfi',
    logoText: 'E',
    variant: 'wallet-etherfi'
  },
  {
    id: 'redotpay',
    name: 'RedotPay',
    label: 'VISA',
    logo: 'logo-redotpay',
    logoText: 'R',
    variant: 'wallet-redotpay',
    network: 'VISA'
  },
  {
    id: 'safepal',
    name: 'SafePal',
    label: 'debit',
    logo: 'logo-safepal',
    logoText: 'S',
    variant: 'wallet-safepal'
  }
]

export const marketCards: CardListItem[] = [
  {
    id: 'n26',
    name: 'Cash',
    issuer: 'N26',
    category: '银行账户',
    logo: 'logo-n26',
    logoText: 'N26',
    suffix: 'VIRTUAL CARD',
    suffixType: 'virtual'
  },
  {
    id: 'plasma',
    name: 'Plasma Card',
    issuer: 'Plasma',
    category: 'U卡',
    logo: 'logo-plasma',
    logoText: 'P',
    suffix: 'VISA',
    suffixType: 'visa',
    featured: true
  },
  {
    id: 'safepal',
    name: 'SafePal Card',
    issuer: 'SafePal',
    category: '借记卡',
    logo: 'logo-safepal',
    logoText: 'S',
    suffix: 'debit',
    suffixType: 'mc',
    featured: true
  },
  {
    id: 'welab',
    name: 'WeLab Bank',
    issuer: 'WeLab',
    category: '银行账户',
    logo: 'logo-welab',
    logoText: 'W',
    suffix: 'Mastercard',
    suffixType: 'mc'
  },
  {
    id: 'hsbc',
    name: 'HSBC Card',
    issuer: 'HSBC',
    category: '信用卡',
    logo: 'logo-hsbc',
    logoText: 'HSBC',
    suffix: 'Mastercard',
    suffixType: 'mc'
  },
  {
    id: 'bybit',
    name: 'BYBIT Card',
    issuer: 'Bybit',
    category: 'U卡',
    logo: 'logo-bybit',
    logoText: 'BYB',
    suffix: 'debit',
    suffixType: 'text'
  },
  {
    id: 'boc',
    name: 'Bank of China',
    issuer: 'BOC Card',
    category: '借记卡',
    logo: 'logo-boc',
    logoText: 'BOC',
    suffix: '银联',
    suffixType: 'text'
  }
]

const extraAddCards: CardListItem[] = [
  {
    id: 'etherfi',
    name: 'EtherFi',
    issuer: 'EtherFi',
    category: 'U卡',
    logo: 'logo-etherfi',
    logoText: 'E',
    suffix: 'hot',
    suffixType: 'text'
  },
  {
    id: 'redotpay',
    name: 'RedotPay',
    issuer: 'RedotPay',
    category: 'U卡',
    logo: 'logo-redotpay',
    logoText: 'R',
    suffix: 'VISA',
    suffixType: 'visa'
  }
]

export const discoveredCards: CardListItem[] = [
  {
    id: 'bitget',
    name: 'Bitget Card',
    issuer: 'Bitget',
    category: 'U卡',
    logo: 'logo-bitget',
    logoText: 'B',
    suffix: 'crypto',
    suffixType: 'text'
  },
  {
    id: 'mexc',
    name: 'MEXC Card',
    issuer: 'MEXC',
    category: 'U卡',
    logo: 'logo-mexc',
    logoText: 'M',
    suffix: 'crypto',
    suffixType: 'text'
  },
  {
    id: 'tria',
    name: 'Tria',
    issuer: 'Tria',
    category: 'U卡',
    logo: 'logo-tria',
    logoText: 'T',
    suffix: 'wallet',
    suffixType: 'text'
  },
  {
    id: 'kast',
    name: 'KAST',
    issuer: 'KAST',
    category: 'U卡',
    logo: 'logo-kast',
    logoText: 'K',
    suffix: 'premium',
    suffixType: 'text'
  },
  {
    id: 'crypto',
    name: 'Crypto.com',
    issuer: 'Crypto.com',
    category: 'U卡',
    logo: 'logo-crypto',
    logoText: 'C',
    suffix: 'VISA',
    suffixType: 'visa'
  },
  {
    id: 'okx',
    name: 'OKX Card',
    issuer: 'OKX',
    category: 'U卡',
    logo: 'logo-okx',
    logoText: 'OKX',
    suffix: 'crypto',
    suffixType: 'text'
  },
  {
    id: 'cypher',
    name: 'Cypher',
    issuer: 'Cypher',
    category: 'U卡',
    logo: 'logo-cypher',
    logoText: 'C',
    suffix: 'wallet',
    suffixType: 'text'
  },
  {
    id: 'metamask',
    name: 'MetaMask Card',
    issuer: 'MetaMask',
    category: 'U卡',
    logo: 'logo-metamask',
    logoText: 'M',
    suffix: 'wallet',
    suffixType: 'text'
  },
  {
    id: 'solayer',
    name: 'Solayer',
    issuer: 'Solayer',
    category: 'U卡',
    logo: 'logo-solayer',
    logoText: 'S',
    suffix: 'crypto',
    suffixType: 'text'
  },
  {
    id: '1inch',
    name: '1inch Card',
    issuer: '1inch',
    category: 'U卡',
    logo: 'logo-inch',
    logoText: '1',
    suffix: 'swap',
    suffixType: 'text'
  },
  {
    id: 'avici',
    name: 'Avici Card',
    issuer: 'Avici',
    category: '信用卡',
    logo: 'logo-avici',
    logoText: 'A',
    suffix: 'VISA',
    suffixType: 'visa'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Card',
    issuer: 'Coinbase',
    category: 'U卡',
    logo: 'logo-coinbase',
    logoText: 'C',
    suffix: 'crypto',
    suffixType: 'text'
  }
]

export const addCards: CardListItem[] = [...marketCards, ...extraAddCards, ...discoveredCards]

export const allListCards: CardListItem[] = [
  ...addCards,
  {
    id: 'apple-cash',
    name: 'Apple Cash',
    issuer: 'Apple',
    category: '银行账户',
    logo: 'logo-apple',
    logoText: 'Cash',
    suffix: 'VIRTUAL CARD',
    suffixType: 'virtual'
  }
]

export function getListCardById(id: string) {
  return allListCards.find((card) => card.id === id)
}

export function getWalletCardById(id: string): WalletCardItem | undefined {
  const walletCard = walletCards.find((card) => card.id === id)
  if (walletCard) return walletCard

  const listCard = getListCardById(id)
  if (!listCard) return undefined
  const variant = walletVariantById[id] || 'wallet-plasma'

  return {
    id: listCard.id,
    name: listCard.name.replace(' Card', ''),
    label: listCard.suffix,
    logo: listCard.logo,
    logoText: listCard.logoText,
    variant,
    network: listCard.suffixType === 'visa' ? 'VISA' : undefined
  }
}

const walletVariantById: Record<string, string> = {
  etherfi: 'wallet-etherfi',
  redotpay: 'wallet-redotpay',
  safepal: 'wallet-safepal',
  bitget: 'wallet-bitget',
  mexc: 'wallet-mexc',
  tria: 'wallet-tria',
  kast: 'wallet-kast',
  crypto: 'wallet-crypto',
  okx: 'wallet-okx',
  cypher: 'wallet-cypher',
  metamask: 'wallet-metamask',
  solayer: 'wallet-solayer',
  '1inch': 'wallet-inch',
  avici: 'wallet-avici',
  coinbase: 'wallet-coinbase'
}

export const tierGroups: TierGroup[] = [
  {
    id: 'legendary',
    label: '夯',
    color: 'tier-red',
    items: [
      { id: 'etherfi', name: 'EtherFi', logo: 'logo-etherfi', logoText: 'E', cardId: 'etherfi' },
      { id: 'plasma-one', name: 'Plasma One Card', logo: 'logo-plasma', logoText: 'P', cardId: 'plasma' }
    ]
  },
  {
    id: 'top',
    label: '顶级',
    color: 'tier-orange',
    items: [
      { id: 'bybit-card', name: 'Bybit Card', logo: 'logo-bybit', logoText: 'BYB', cardId: 'bybit' },
      { id: 'bitget-card', name: 'Bitget Card', logo: 'logo-bitget', logoText: 'B', cardId: 'bitget' },
      { id: 'redotpay-card', name: 'RedotPay', logo: 'logo-redotpay', logoText: 'R', cardId: 'redotpay' },
      { id: 'mexc-card', name: 'MEXC Card', logo: 'logo-mexc', logoText: 'M', cardId: 'mexc' }
    ]
  },
  {
    id: 'excellent',
    label: '人上人',
    color: 'tier-yellow',
    items: [
      { id: 'tria', name: 'Tria', logo: 'logo-tria', logoText: 'T', cardId: 'tria' },
      { id: 'kast', name: 'KAST', logo: 'logo-kast', logoText: 'K', cardId: 'kast' }
    ]
  },
  {
    id: 'npc',
    label: 'NPC',
    color: 'tier-blue',
    items: [
      { id: 'crypto', name: 'Crypto.com', logo: 'logo-crypto', logoText: 'C', cardId: 'crypto' },
      { id: 'okx', name: 'OKX Card', logo: 'logo-okx', logoText: 'OKX', cardId: 'okx' },
      { id: 'cypher', name: 'Cypher', logo: 'logo-cypher', logoText: 'C', cardId: 'cypher' },
      { id: 'metamask', name: 'MetaMask Card', logo: 'logo-metamask', logoText: 'M', cardId: 'metamask' }
    ]
  },
  {
    id: 'done',
    label: '拉完了',
    color: 'tier-gray',
    items: [
      { id: 'solayer', name: 'Solayer', logo: 'logo-solayer', logoText: 'S', cardId: 'solayer' },
      { id: '1inch', name: '1inch Card', logo: 'logo-inch', logoText: '1', cardId: '1inch' },
      { id: 'avici', name: 'Avici Card', logo: 'logo-avici', logoText: 'A', cardId: 'avici' },
      { id: 'coinbase', name: 'Coinbase Card', logo: 'logo-coinbase', logoText: 'C', cardId: 'coinbase' }
    ]
  }
]

export const profileMenus = [
  { label: '我的卡片', icon: 'wallet' },
  { label: '订阅与服务', icon: 'service' },
  { label: '卡片权益', icon: 'shield' },
  { label: '我的收藏', icon: 'star-line' },
  { label: '浏览记录', icon: 'history' },
  { label: '设置', icon: 'settings' },
  { label: '帮助中心', icon: 'help', badge: '1' },
  { label: '关于我们', icon: 'info' },
  { label: '退出登录', icon: 'logout', separated: true }
]
