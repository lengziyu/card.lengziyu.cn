export interface CardBenefit {
  icon: string
  text: string
}

export interface FeeLine {
  label: string
  value: string
}

export interface CardDetailSpec {
  id: string
  rating: number
  reviews: number
  tags: string[]
  benefits: CardBenefit[]
  fees: FeeLine[]
  region: string
  funding: string
  speed: string
  applyUrl: string
  note: string
}

const defaultBenefits: CardBenefit[] = [
  { icon: 'wallet', text: '多币种钱包' },
  { icon: 'shield', text: '安全风控' },
  { icon: 'market', text: '线上消费' },
  { icon: 'grid', text: '权益待确认' }
]

const defaultFees: FeeLine[] = [
  { label: '开卡费', value: '以官网为准' },
  { label: '年费', value: '以官网为准' },
  { label: '充值手续费', value: '以官网为准' },
  { label: '取现手续费', value: '以官网为准' }
]

function spec(id: string, detail: Omit<CardDetailSpec, 'id'>): CardDetailSpec {
  return {
    id,
    ...detail
  }
}

const cardDetails: Record<string, CardDetailSpec> = {
  'apple-cash': spec('apple-cash', {
    rating: 4.6,
    reviews: 862,
    tags: ['钱包余额', 'Apple Pay', '美国'],
    benefits: [
      { icon: 'wallet', text: 'Apple Pay' },
      { icon: 'shield', text: '设备级安全' },
      { icon: 'market', text: '日常转账' },
      { icon: 'grid', text: '家庭共享' }
    ],
    fees: [
      { label: '开卡费', value: '免费' },
      { label: '年费', value: '免费' },
      { label: '转账手续费', value: '按渠道' },
      { label: '适用地区', value: '美国' }
    ],
    region: '美国',
    funding: '钱包余额',
    speed: '即时可用',
    applyUrl: 'https://www.apple.com/apple-cash/',
    note: 'Apple Cash 以官方可用地区和 Apple 账户条件为准。'
  }),
  n26: spec('n26', {
    rating: 4.5,
    reviews: 928,
    tags: ['银行账户', '欧区', 'Mastercard'],
    benefits: [
      { icon: 'wallet', text: '欧区账户' },
      { icon: 'plane', text: '旅行消费' },
      { icon: 'shield', text: '即时冻结' },
      { icon: 'grid', text: '预算空间' }
    ],
    fees: [
      { label: '开卡费', value: '按套餐' },
      { label: '月费', value: '按套餐' },
      { label: '外币消费', value: '按官网' },
      { label: 'ATM 取现', value: '按地区' }
    ],
    region: '欧洲多国',
    funding: '银行账户',
    speed: '实体/虚拟卡',
    applyUrl: 'https://n26.com/',
    note: 'N26 账户和卡片可用性受居住地与 KYC 条件影响。'
  }),
  bybit: spec('bybit', {
    rating: 4.8,
    reviews: 1288,
    tags: ['U卡', '交易所', '加密支付'],
    benefits: [
      { icon: 'wallet', text: '加密余额消费' },
      { icon: 'market', text: '线上线下支付' },
      { icon: 'shield', text: '交易所风控' },
      { icon: 'grid', text: '多币种支持' }
    ],
    fees: [
      { label: '开卡费', value: '以官网为准' },
      { label: '年费', value: '以官网为准' },
      { label: '充值手续费', value: '按资产' },
      { label: '外币转换', value: '按网络' }
    ],
    region: '按 Bybit 开放地区',
    funding: '交易所余额',
    speed: '虚拟卡优先',
    applyUrl: 'https://www.bybit.com/en/cards/',
    note: '加密卡服务地区变化较快，申请前请以 Bybit Card 页面为准。'
  }),
  plasma: spec('plasma', {
    rating: 4.9,
    reviews: 1172,
    tags: ['U卡', '稳定币', 'Plasma One'],
    benefits: [
      { icon: 'wallet', text: '稳定币消费' },
      { icon: 'shield', text: '链上资产' },
      { icon: 'market', text: 'Visa 网络' },
      { icon: 'grid', text: '会员权益' }
    ],
    fees: [
      { label: '开卡费', value: '以官网为准' },
      { label: '年费', value: '以官网为准' },
      { label: '充值手续费', value: '按链上成本' },
      { label: '提现手续费', value: '按官网' }
    ],
    region: '按官方名单',
    funding: '稳定币',
    speed: '候补/邀请制',
    applyUrl: 'https://www.plasma.org/personal',
    note: 'Plasma One 相关权益仍以官方页面和实际开放状态为准。'
  }),
  etherfi: spec('etherfi', {
    rating: 4.9,
    reviews: 1536,
    tags: ['U卡', 'DeFi', 'Cash'],
    benefits: [
      { icon: 'wallet', text: '链上账户' },
      { icon: 'shield', text: '自托管体验' },
      { icon: 'market', text: '日常刷卡' },
      { icon: 'grid', text: '收益资产联动' }
    ],
    fees: [
      { label: '开卡费', value: '按官网' },
      { label: '年费', value: '按套餐' },
      { label: '充值手续费', value: '按链上成本' },
      { label: '消费返现', value: '按活动' }
    ],
    region: '按官方开放地区',
    funding: 'DeFi 账户',
    speed: '申请后开通',
    applyUrl: 'https://www.ether.fi/',
    note: 'DeFi 卡片权益、收益和费率可能随活动变化。'
  }),
  redotpay: spec('redotpay', {
    rating: 4.7,
    reviews: 1106,
    tags: ['U卡', 'Visa', '稳定币'],
    benefits: [
      { icon: 'wallet', text: '稳定币充值' },
      { icon: 'market', text: 'Visa 消费' },
      { icon: 'plane', text: '跨境场景' },
      { icon: 'shield', text: '卡片冻结' }
    ],
    fees: [
      { label: '开卡费', value: '按官网' },
      { label: '年费', value: '按官网' },
      { label: '充值手续费', value: '按资产' },
      { label: '取现手续费', value: '按地区' }
    ],
    region: '全球多地区',
    funding: '加密资产',
    speed: '虚拟/实体卡',
    applyUrl: 'https://www.redotpay.com/',
    note: 'RedotPay 支持资产、地区和费率请以官网为准。'
  }),
  safepal: spec('safepal', {
    rating: 4.6,
    reviews: 984,
    tags: ['钱包', '借记卡', '加密支付'],
    benefits: [
      { icon: 'wallet', text: '钱包联动' },
      { icon: 'shield', text: '资产管理' },
      { icon: 'market', text: '消费支付' },
      { icon: 'grid', text: 'App 控制' }
    ],
    fees: [
      { label: '开卡费', value: '按官网' },
      { label: '年费', value: '按官网' },
      { label: '充值手续费', value: '按网络' },
      { label: '消费手续费', value: '按官网' }
    ],
    region: '按官方开放地区',
    funding: 'SafePal 账户',
    speed: 'App 内申请',
    applyUrl: 'https://www.safepal.com/',
    note: '钱包卡片依赖 SafePal App 和服务可用地区。'
  }),
  bitget: spec('bitget', {
    rating: 4.5,
    reviews: 782,
    tags: ['U卡', '交易所', '新卡'],
    benefits: [
      { icon: 'wallet', text: '交易余额消费' },
      { icon: 'market', text: '加密支付' },
      { icon: 'shield', text: '账户风控' },
      { icon: 'grid', text: '活动权益' }
    ],
    fees: [
      { label: '开卡费', value: '待确认' },
      { label: '年费', value: '待确认' },
      { label: '充值手续费', value: '按资产' },
      { label: '汇率/转换', value: '按官网' }
    ],
    region: '按 Bitget 开放地区',
    funding: '交易所余额',
    speed: '待官方开放',
    applyUrl: 'https://www.bitget.com/',
    note: '新卡和活动权益变动较快，详情请以官方公告为准。'
  }),
  avici: spec('avici', {
    rating: 4.4,
    reviews: 516,
    tags: ['信用卡', '自托管', 'Visa'],
    benefits: [
      { icon: 'wallet', text: '自托管连接' },
      { icon: 'shield', text: '链上控制' },
      { icon: 'market', text: 'Visa 消费' },
      { icon: 'grid', text: 'App 管理' }
    ],
    fees: [
      { label: '开卡费', value: '按官网' },
      { label: '年费', value: '按官网' },
      { label: '充值手续费', value: '按链上成本' },
      { label: '信用额度', value: '按审批' }
    ],
    region: '按官方开放地区',
    funding: '自托管钱包',
    speed: '申请后开通',
    applyUrl: 'https://avici.money/',
    note: 'Avici 的卡面、额度和申请资格以官方页面为准。'
  }),
  coinbase: spec('coinbase', {
    rating: 4.4,
    reviews: 904,
    tags: ['交易所', '消费卡', '美国'],
    benefits: [
      { icon: 'wallet', text: 'Coinbase 余额' },
      { icon: 'market', text: '日常消费' },
      { icon: 'shield', text: '账户安全' },
      { icon: 'grid', text: 'App 管理' }
    ],
    fees: [
      { label: '开卡费', value: '按官网' },
      { label: '年费', value: '按官网' },
      { label: '转换费', value: '按资产' },
      { label: '适用地区', value: '按官网' }
    ],
    region: '按 Coinbase 开放地区',
    funding: 'Coinbase 余额',
    speed: '账户内申请',
    applyUrl: 'https://www.coinbase.com/',
    note: 'Coinbase Card 可用性受地区、账户和合规要求影响。'
  })
}

Object.assign(cardDetails, {
  boc: spec('boc', {
    rating: 4.2,
    reviews: 736,
    tags: ['借记卡', '银联', '银行'],
    benefits: [
      { icon: 'wallet', text: '银行账户' },
      { icon: 'shield', text: '传统风控' },
      { icon: 'market', text: '银联场景' },
      { icon: 'grid', text: '本地服务' }
    ],
    fees: [
      { label: '开卡费', value: '按网点' },
      { label: '年费', value: '按卡种' },
      { label: '跨境手续费', value: '按渠道' },
      { label: '取现手续费', value: '按地区' }
    ],
    region: '中国及跨境场景',
    funding: '银行账户',
    speed: '网点/线上申请',
    applyUrl: 'https://www.boc.cn/en/',
    note: '具体卡种、费用和权益需以中国银行官方页面或网点说明为准。'
  }),
  hsbc: spec('hsbc', {
    rating: 4.3,
    reviews: 812,
    tags: ['信用卡', '跨境', '银行'],
    benefits: [
      { icon: 'wallet', text: '银行授信' },
      { icon: 'plane', text: '旅行场景' },
      { icon: 'shield', text: '风控保障' },
      { icon: 'grid', text: '本地权益' }
    ],
    fees: [
      { label: '开卡费', value: '按地区' },
      { label: '年费', value: '按卡种' },
      { label: '外币手续费', value: '按卡种' },
      { label: '取现手续费', value: '按地区' }
    ],
    region: 'HSBC 覆盖地区',
    funding: '银行授信/账户',
    speed: '审批后开通',
    applyUrl: 'https://www.hsbc.com/',
    note: 'HSBC 不同地区卡种差异较大，请以当地官网为准。'
  }),
  welab: spec('welab', {
    rating: 4.4,
    reviews: 648,
    tags: ['银行账户', '虚拟银行', '香港'],
    benefits: [
      { icon: 'wallet', text: '虚拟银行' },
      { icon: 'market', text: '线上消费' },
      { icon: 'shield', text: 'App 管理' },
      { icon: 'grid', text: '账户服务' }
    ],
    fees: [
      { label: '开卡费', value: '按官网' },
      { label: '年费', value: '按官网' },
      { label: '转账手续费', value: '按服务' },
      { label: '外币消费', value: '按卡组织' }
    ],
    region: '香港',
    funding: '银行账户',
    speed: '线上开户',
    applyUrl: 'https://www.welab.bank/',
    note: 'WeLab Bank 服务以香港地区和银行条款为准。'
  }),
  mexc: spec('mexc', {
    rating: 4.2,
    reviews: 511,
    tags: ['U卡', '交易所', '蓝卡'],
    benefits: [
      { icon: 'wallet', text: '交易余额' },
      { icon: 'market', text: '消费支付' },
      { icon: 'shield', text: '账户风控' },
      { icon: 'grid', text: '活动权益' }
    ],
    fees: defaultFees,
    region: '按 MEXC 开放地区',
    funding: '交易所余额',
    speed: '按申请进度',
    applyUrl: 'https://www.mexc.com/',
    note: 'MEXC 卡片相关权益、地区和费用以官方说明为准。'
  }),
  tria: spec('tria', {
    rating: 4.1,
    reviews: 386,
    tags: ['钱包', '账户抽象', '链上'],
    benefits: [
      { icon: 'wallet', text: '链上账户' },
      { icon: 'shield', text: '钱包连接' },
      { icon: 'market', text: '支付入口' },
      { icon: 'grid', text: 'DApp 场景' }
    ],
    fees: defaultFees,
    region: '按官网开放地区',
    funding: '链上钱包',
    speed: '按产品开放',
    applyUrl: 'https://tria.so/',
    note: 'Tria 相关支付产品以官方实际发布为准。'
  }),
  kast: spec('kast', {
    rating: 4.3,
    reviews: 442,
    tags: ['会员卡', '黑金', '支付'],
    benefits: [
      { icon: 'wallet', text: '账户消费' },
      { icon: 'shield', text: 'App 管理' },
      { icon: 'market', text: '全球支付' },
      { icon: 'grid', text: '会员权益' }
    ],
    fees: defaultFees,
    region: '按 KAST 开放地区',
    funding: '账户余额',
    speed: 'App 申请',
    applyUrl: 'https://kast.xyz/',
    note: 'KAST 的等级、费用和地区支持请以官网为准。'
  }),
  crypto: spec('crypto', {
    rating: 4.5,
    reviews: 1340,
    tags: ['U卡', 'Visa', '交易所'],
    benefits: [
      { icon: 'wallet', text: '交易所余额' },
      { icon: 'plane', text: '旅行消费' },
      { icon: 'spotify', text: '订阅权益' },
      { icon: 'grid', text: '等级权益' }
    ],
    fees: [
      { label: '开卡费', value: '按地区' },
      { label: '年费', value: '按卡种' },
      { label: '外币手续费', value: '按等级' },
      { label: '返现权益', value: '按等级' }
    ],
    region: '多地区',
    funding: 'Crypto.com 账户',
    speed: '账户内申请',
    applyUrl: 'https://crypto.com/',
    note: 'Crypto.com Card 权益随地区和等级变化明显。'
  }),
  okx: spec('okx', {
    rating: 4.3,
    reviews: 864,
    tags: ['交易所', '钱包', '支付'],
    benefits: [
      { icon: 'wallet', text: '交易账户' },
      { icon: 'shield', text: '账户风控' },
      { icon: 'market', text: '支付入口' },
      { icon: 'grid', text: '活动权益' }
    ],
    fees: defaultFees,
    region: '按 OKX 开放地区',
    funding: 'OKX 账户',
    speed: '按产品开放',
    applyUrl: 'https://www.okx.com/',
    note: 'OKX 支付产品能力以官方开放状态为准。'
  }),
  cypher: spec('cypher', {
    rating: 4.2,
    reviews: 407,
    tags: ['钱包', '链上消费', '橙卡'],
    benefits: [
      { icon: 'wallet', text: '钱包余额' },
      { icon: 'shield', text: '链上控制' },
      { icon: 'market', text: '消费支付' },
      { icon: 'grid', text: 'App 管理' }
    ],
    fees: defaultFees,
    region: '按官方开放地区',
    funding: '链上钱包',
    speed: '申请后开通',
    applyUrl: 'https://cypherhq.io/',
    note: 'Cypher 卡片相关费用和支持地区以官方页面为准。'
  }),
  metamask: spec('metamask', {
    rating: 4.4,
    reviews: 1220,
    tags: ['钱包', 'MetaMask', '橙卡'],
    benefits: [
      { icon: 'wallet', text: '钱包连接' },
      { icon: 'shield', text: '自托管体验' },
      { icon: 'market', text: '日常消费' },
      { icon: 'grid', text: '生态集成' }
    ],
    fees: defaultFees,
    region: '按 MetaMask 开放地区',
    funding: '钱包资产',
    speed: '按产品开放',
    applyUrl: 'https://metamask.io/',
    note: 'MetaMask 卡片和地区支持以官方发布为准。'
  }),
  solayer: spec('solayer', {
    rating: 4.0,
    reviews: 308,
    tags: ['Solana', '链上', '青黑卡'],
    benefits: [
      { icon: 'wallet', text: '链上资产' },
      { icon: 'shield', text: '账户控制' },
      { icon: 'market', text: '支付场景' },
      { icon: 'grid', text: '生态权益' }
    ],
    fees: defaultFees,
    region: '按官方开放地区',
    funding: '链上资产',
    speed: '按产品开放',
    applyUrl: 'https://solayer.org/',
    note: 'Solayer 相关卡片能力以官方实际发布为准。'
  }),
  '1inch': spec('1inch', {
    rating: 4.1,
    reviews: 502,
    tags: ['聚合器', 'DeFi', '支付'],
    benefits: [
      { icon: 'wallet', text: 'DeFi 账户' },
      { icon: 'market', text: '兑换场景' },
      { icon: 'shield', text: '链上风控' },
      { icon: 'grid', text: '聚合服务' }
    ],
    fees: defaultFees,
    region: '按官方开放地区',
    funding: '链上资产',
    speed: '按产品开放',
    applyUrl: 'https://1inch.io/',
    note: '1inch 支付或卡片相关能力以官方发布为准。'
  })
})

function makeGenericDetail(id: string): CardDetailSpec {
  return {
    id,
    rating: 4.3,
    reviews: 420,
    tags: ['卡片', '支付', '待补充'],
    benefits: defaultBenefits,
    fees: defaultFees,
    region: '按官网开放地区',
    funding: '按产品说明',
    speed: '按申请进度',
    applyUrl: 'https://card.lengziyu.cn',
    note: '此卡片的详细权益和费用仍待补充，具体请以官方页面为准。'
  }
}

export function getCardDetailSpec(id: string) {
  return cardDetails[id] || makeGenericDetail(id)
}
