export interface DetailCardStyle {
  background: string
  glow: string
  accent: string
  text: string
  pattern: 'mesh' | 'ribbon' | 'grid' | 'orbit' | 'plain'
  material: string
  sourceName: string
  sourceUrl: string
}

export interface CardVisual {
  id: string
  logoSrc: string
  logoSource: string
  logoSourceUrl: string
  detail: DetailCardStyle
}

const logoSourcesByClass: Record<string, string> = {
  'logo-apple': '/brand-logos/apple-cash.ico',
  'logo-n26': '/brand-logos/n26.png',
  'logo-boc': '/brand-logos/boc.gif',
  'logo-hsbc': '/brand-logos/hsbc.png',
  'logo-welab': '/brand-logos/welab.png',
  'logo-bybit': '/brand-logos/bybit.png',
  'logo-plasma': '/brand-logos/plasma.svg',
  'logo-etherfi': '/brand-logos/etherfi.png',
  'logo-redotpay': '/brand-logos/redotpay.png',
  'logo-safepal': '/brand-logos/safepal.ico',
  'logo-bitget': '/brand-logos/bitget.png',
  'logo-mexc': '/brand-logos/mexc.png',
  'logo-tria': '/brand-logos/tria.ico',
  'logo-kast': '/brand-logos/kast.png',
  'logo-crypto': '/brand-logos/crypto.ico',
  'logo-okx': '/brand-logos/okx.png',
  'logo-cypher': '/brand-logos/cypher.svg',
  'logo-metamask': '/brand-logos/metamask.png',
  'logo-solayer': '/brand-logos/solayer.png',
  'logo-inch': '/brand-logos/1inch.png',
  'logo-avici': '/brand-logos/avici.png',
  'logo-coinbase': '/brand-logos/coinbase.ico'
}

export const cardVisuals: Record<string, CardVisual> = {
  'apple-cash': {
    id: 'apple-cash',
    logoSrc: '/brand-logos/apple-cash.ico',
    logoSource: 'Apple',
    logoSourceUrl: 'https://www.apple.com/apple-cash/',
    detail: {
      background: 'linear-gradient(135deg, #fafcff 0%, #e8edf6 48%, #ffffff 100%)',
      glow: 'rgba(255, 255, 255, 0.72)',
      accent: '#1d1f29',
      text: '#141720',
      pattern: 'plain',
      material: '白色钛感虚拟卡',
      sourceName: 'Apple Cash',
      sourceUrl: 'https://www.apple.com/apple-cash/'
    }
  },
  n26: {
    id: 'n26',
    logoSrc: '/brand-logos/n26.png',
    logoSource: 'N26',
    logoSourceUrl: 'https://n26.com/',
    detail: {
      background: 'linear-gradient(135deg, #c7f0ff 0%, #5c78ff 56%, #172253 100%)',
      glow: 'rgba(126, 217, 255, 0.48)',
      accent: '#dff6ff',
      text: '#ffffff',
      pattern: 'ribbon',
      material: '蓝紫渐变借记卡',
      sourceName: 'N26',
      sourceUrl: 'https://n26.com/'
    }
  },
  boc: {
    id: 'boc',
    logoSrc: '/brand-logos/boc.gif',
    logoSource: 'Bank of China',
    logoSourceUrl: 'https://www.boc.cn/en/',
    detail: {
      background: 'linear-gradient(135deg, #0b0d12 0%, #191a1f 56%, #050507 100%)',
      glow: 'rgba(214, 33, 45, 0.28)',
      accent: '#d6212d',
      text: '#ffffff',
      pattern: 'orbit',
      material: '黑底红色银行识别',
      sourceName: 'BOC brand page',
      sourceUrl: 'https://www.boc.cn/english/thisisboc/ab3/brd/202601/t20260104_25638404.html'
    }
  },
  hsbc: {
    id: 'hsbc',
    logoSrc: '/brand-logos/hsbc.png',
    logoSource: 'HSBC',
    logoSourceUrl: 'https://www.hsbc.com/',
    detail: {
      background: 'linear-gradient(135deg, #083d63 0%, #22a7cf 50%, #062b4d 100%)',
      glow: 'rgba(34, 167, 207, 0.42)',
      accent: '#e51e2b',
      text: '#ffffff',
      pattern: 'mesh',
      material: '蓝色金属卡面',
      sourceName: 'HSBC',
      sourceUrl: 'https://www.hsbc.com/'
    }
  },
  welab: {
    id: 'welab',
    logoSrc: '/brand-logos/welab.png',
    logoSource: 'WeLab Bank',
    logoSourceUrl: 'https://www.welab.bank/',
    detail: {
      background: 'linear-gradient(115deg, #69a8ff 0%, #957bff 52%, #ff9fc3 100%)',
      glow: 'rgba(255, 159, 195, 0.48)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'mesh',
      material: '柔彩数字银行卡',
      sourceName: 'WeLab Bank',
      sourceUrl: 'https://www.welab.bank/'
    }
  },
  bybit: {
    id: 'bybit',
    logoSrc: '/brand-logos/bybit.png',
    logoSource: 'Bybit',
    logoSourceUrl: 'https://www.bybit.com/en/cards/',
    detail: {
      background: 'linear-gradient(135deg, #08090d 0%, #111318 58%, #030303 100%)',
      glow: 'rgba(245, 199, 83, 0.34)',
      accent: '#f5c753',
      text: '#ffffff',
      pattern: 'grid',
      material: '黑金加密借记卡',
      sourceName: 'Bybit Card',
      sourceUrl: 'https://www.bybit.com/en/cards/'
    }
  },
  plasma: {
    id: 'plasma',
    logoSrc: '/brand-logos/plasma.svg',
    logoSource: 'Plasma',
    logoSourceUrl: 'https://www.plasma.org/personal',
    detail: {
      background: 'linear-gradient(135deg, #151f1c 0%, #06110f 56%, #17312d 100%)',
      glow: 'rgba(157, 245, 205, 0.28)',
      accent: '#9df5cd',
      text: '#ffffff',
      pattern: 'orbit',
      material: '深绿稳定币卡',
      sourceName: 'Plasma One',
      sourceUrl: 'https://www.plasma.org/personal'
    }
  },
  etherfi: {
    id: 'etherfi',
    logoSrc: '/brand-logos/etherfi.png',
    logoSource: 'ether.fi',
    logoSourceUrl: 'https://www.ether.fi/',
    detail: {
      background: 'linear-gradient(135deg, #8c66ff 0%, #4f25dc 54%, #17113d 100%)',
      glow: 'rgba(140, 102, 255, 0.52)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'ribbon',
      material: '紫色 DeFi 信用卡',
      sourceName: 'ether.fi Cash',
      sourceUrl: 'https://www.ether.fi/'
    }
  },
  redotpay: {
    id: 'redotpay',
    logoSrc: '/brand-logos/redotpay.png',
    logoSource: 'RedotPay',
    logoSourceUrl: 'https://www.redotpay.com/',
    detail: {
      background: 'linear-gradient(135deg, #ff4b5c 0%, #dd1629 54%, #64141c 100%)',
      glow: 'rgba(255, 75, 92, 0.48)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'mesh',
      material: '红色稳定币支付卡',
      sourceName: 'RedotPay',
      sourceUrl: 'https://www.redotpay.com/'
    }
  },
  safepal: {
    id: 'safepal',
    logoSrc: '/brand-logos/safepal.ico',
    logoSource: 'SafePal',
    logoSourceUrl: 'https://www.safepal.com/',
    detail: {
      background: 'linear-gradient(135deg, #06091d 0%, #1d0964 52%, #3815a9 100%)',
      glow: 'rgba(96, 76, 255, 0.46)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'grid',
      material: '深蓝硬件钱包卡',
      sourceName: 'SafePal',
      sourceUrl: 'https://www.safepal.com/'
    }
  },
  bitget: {
    id: 'bitget',
    logoSrc: '/brand-logos/bitget.png',
    logoSource: 'Bitget',
    logoSourceUrl: 'https://www.bitget.com/',
    detail: {
      background: 'linear-gradient(135deg, #071316 0%, #03cfc6 46%, #07292c 100%)',
      glow: 'rgba(3, 207, 198, 0.45)',
      accent: '#a7fff8',
      text: '#ffffff',
      pattern: 'mesh',
      material: '青绿色交易所卡',
      sourceName: 'Bitget',
      sourceUrl: 'https://www.bitget.com/'
    }
  },
  mexc: {
    id: 'mexc',
    logoSrc: '/brand-logos/mexc.png',
    logoSource: 'MEXC',
    logoSourceUrl: 'https://www.mexc.com/',
    detail: {
      background: 'linear-gradient(135deg, #0b3eff 0%, #1666ff 55%, #041a63 100%)',
      glow: 'rgba(22, 102, 255, 0.48)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'ribbon',
      material: '高饱和蓝色交易卡',
      sourceName: 'MEXC',
      sourceUrl: 'https://www.mexc.com/'
    }
  },
  tria: {
    id: 'tria',
    logoSrc: '/brand-logos/tria.ico',
    logoSource: 'Tria',
    logoSourceUrl: 'https://tria.so/',
    detail: {
      background: 'linear-gradient(135deg, #06080c 0%, #232631 54%, #0c0f18 100%)',
      glow: 'rgba(188, 202, 255, 0.26)',
      accent: '#c8d3ff',
      text: '#ffffff',
      pattern: 'orbit',
      material: '黑银抽象通行卡',
      sourceName: 'Tria',
      sourceUrl: 'https://tria.so/'
    }
  },
  kast: {
    id: 'kast',
    logoSrc: '/brand-logos/kast.png',
    logoSource: 'KAST',
    logoSourceUrl: 'https://kast.xyz/',
    detail: {
      background: 'linear-gradient(135deg, #050507 0%, #16171d 46%, #2b241c 100%)',
      glow: 'rgba(255, 214, 150, 0.24)',
      accent: '#ffd696',
      text: '#ffffff',
      pattern: 'grid',
      material: '黑金会员卡',
      sourceName: 'KAST',
      sourceUrl: 'https://kast.xyz/'
    }
  },
  crypto: {
    id: 'crypto',
    logoSrc: '/brand-logos/crypto.ico',
    logoSource: 'Crypto.com',
    logoSourceUrl: 'https://crypto.com/',
    detail: {
      background: 'linear-gradient(135deg, #1e66e5 0%, #254987 54%, #071c47 100%)',
      glow: 'rgba(30, 102, 229, 0.44)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'mesh',
      material: '蓝色 Visa 加密卡',
      sourceName: 'Crypto.com',
      sourceUrl: 'https://crypto.com/'
    }
  },
  okx: {
    id: 'okx',
    logoSrc: '/brand-logos/okx.png',
    logoSource: 'OKX',
    logoSourceUrl: 'https://www.okx.com/',
    detail: {
      background: 'linear-gradient(135deg, #07080a 0%, #14161d 58%, #000000 100%)',
      glow: 'rgba(255, 255, 255, 0.2)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'grid',
      material: '极简黑白交易卡',
      sourceName: 'OKX',
      sourceUrl: 'https://www.okx.com/'
    }
  },
  cypher: {
    id: 'cypher',
    logoSrc: '/brand-logos/cypher.svg',
    logoSource: 'Cypher',
    logoSourceUrl: 'https://cypherhq.io/',
    detail: {
      background: 'linear-gradient(135deg, #f4aa21 0%, #ba6109 56%, #3b1b05 100%)',
      glow: 'rgba(244, 170, 33, 0.42)',
      accent: '#fff5d6',
      text: '#ffffff',
      pattern: 'ribbon',
      material: '橙金链上消费卡',
      sourceName: 'Cypher',
      sourceUrl: 'https://cypherhq.io/'
    }
  },
  metamask: {
    id: 'metamask',
    logoSrc: '/brand-logos/metamask.png',
    logoSource: 'MetaMask',
    logoSourceUrl: 'https://metamask.io/',
    detail: {
      background: 'linear-gradient(135deg, #ff9b34 0%, #e55222 52%, #42160d 100%)',
      glow: 'rgba(255, 155, 52, 0.44)',
      accent: '#fff0de',
      text: '#ffffff',
      pattern: 'mesh',
      material: '橙色钱包卡',
      sourceName: 'MetaMask',
      sourceUrl: 'https://metamask.io/'
    }
  },
  solayer: {
    id: 'solayer',
    logoSrc: '/brand-logos/solayer.png',
    logoSource: 'Solayer',
    logoSourceUrl: 'https://solayer.org/',
    detail: {
      background: 'linear-gradient(135deg, #031c1f 0%, #0b5657 56%, #011012 100%)',
      glow: 'rgba(64, 229, 213, 0.3)',
      accent: '#8ffff0',
      text: '#ffffff',
      pattern: 'orbit',
      material: '青黑链上卡',
      sourceName: 'Solayer',
      sourceUrl: 'https://solayer.org/'
    }
  },
  '1inch': {
    id: '1inch',
    logoSrc: '/brand-logos/1inch.png',
    logoSource: '1inch',
    logoSourceUrl: 'https://1inch.io/',
    detail: {
      background: 'linear-gradient(135deg, #d1e9ff 0%, #172342 58%, #d52842 100%)',
      glow: 'rgba(209, 233, 255, 0.4)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'ribbon',
      material: '蓝红聚合器卡',
      sourceName: '1inch',
      sourceUrl: 'https://1inch.io/'
    }
  },
  avici: {
    id: 'avici',
    logoSrc: '/brand-logos/avici.png',
    logoSource: 'Avici',
    logoSourceUrl: 'https://avici.money/',
    detail: {
      background: 'linear-gradient(135deg, #dbdbdb 0%, #71737b 54%, #25272d 100%)',
      glow: 'rgba(219, 219, 219, 0.38)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'mesh',
      material: '银灰自托管信用卡',
      sourceName: 'Avici',
      sourceUrl: 'https://avici.money/'
    }
  },
  coinbase: {
    id: 'coinbase',
    logoSrc: '/brand-logos/coinbase.ico',
    logoSource: 'Coinbase',
    logoSourceUrl: 'https://www.coinbase.com/',
    detail: {
      background: 'linear-gradient(135deg, #1d5dff 0%, #1647c7 56%, #071a59 100%)',
      glow: 'rgba(29, 93, 255, 0.48)',
      accent: '#ffffff',
      text: '#ffffff',
      pattern: 'plain',
      material: '蓝色交易所卡',
      sourceName: 'Coinbase',
      sourceUrl: 'https://www.coinbase.com/'
    }
  }
}

export function getLogoSourceByClass(logo: string) {
  return logoSourcesByClass[logo]
}

export function getCardVisual(id: string) {
  return cardVisuals[id]
}
