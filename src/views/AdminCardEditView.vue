<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminShell from '@/components/AdminShell.vue'
import IconSymbol from '@/components/IconSymbol.vue'
import {
  getAdminCard,
  saveAdminCard,
  type AdminCardRecord,
  type AdminCardStatus
} from '@/api/admin'
import { categories, type Category } from '@/data/cards'

interface AdminCardForm {
  id: string
  name: string
  issuer: string
  category: Category
  status: AdminCardStatus
  network: string
  logo: string
  logoText: string
  suffix: string
  suffixType: AdminCardRecord['suffixType']
  featured: boolean
  rankTier: string
  rating: number
  reviews: number
  tagsText: string
  benefitsText: string
  feesText: string
  region: string
  funding: string
  speed: string
  applyUrl: string
  sourceUrl: string
  sourceName: string
  material: string
  createdAt: string
}

const route = useRoute()
const router = useRouter()
const saving = ref(false)
const error = ref('')
const loaded = ref(false)
const isNew = computed(() => route.params.id === 'new')

const form = reactive<AdminCardForm>({
  id: '',
  name: '',
  issuer: '',
  category: 'U卡',
  status: 'draft',
  network: 'VISA',
  logo: 'logo-plasma',
  logoText: '',
  suffix: 'VISA',
  suffixType: 'visa',
  featured: false,
  rankTier: '待分层',
  rating: 4.3,
  reviews: 0,
  tagsText: 'U卡, 待确认',
  benefitsText: 'wallet: 多币种钱包\nshield: 安全风控\nmarket: 线上消费\ngrid: 权益待确认',
  feesText: '开卡费: 以官网为准\n年费: 以官网为准\n充值手续费: 以官网为准\n取现手续费: 以官网为准',
  region: '按官网开放地区',
  funding: '按产品说明',
  speed: '按申请进度',
  applyUrl: '',
  sourceUrl: '',
  sourceName: '',
  material: '待补充卡面样式',
  createdAt: ''
})

const statusOptions: Array<{ label: string; value: AdminCardStatus }> = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
  { label: '已下架', value: 'archived' }
]

const suffixTypeOptions: Array<{ label: string; value: AdminCardRecord['suffixType'] }> = [
  { label: '普通文本', value: 'text' },
  { label: 'VISA', value: 'visa' },
  { label: 'Mastercard', value: 'mc' },
  { label: '虚拟卡', value: 'virtual' }
]

function assignCard(card: AdminCardRecord) {
  form.id = card.id
  form.name = card.name
  form.issuer = card.issuer
  form.category = card.category
  form.status = card.status
  form.network = card.network
  form.logo = card.logo
  form.logoText = card.logoText
  form.suffix = card.suffix
  form.suffixType = card.suffixType
  form.featured = card.featured
  form.rankTier = card.rankTier
  form.rating = card.rating
  form.reviews = card.reviews
  form.tagsText = card.tags.join(', ')
  form.benefitsText = card.benefits.map((item) => `${item.icon}: ${item.text}`).join('\n')
  form.feesText = card.fees.map((item) => `${item.label}: ${item.value}`).join('\n')
  form.region = card.region
  form.funding = card.funding
  form.speed = card.speed
  form.applyUrl = card.applyUrl
  form.sourceUrl = card.sourceUrl
  form.sourceName = card.sourceName
  form.material = card.material
  form.createdAt = card.createdAt
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

function splitPair(line: string) {
  const normalized = line.replace('：', ':')
  const index = normalized.indexOf(':')
  if (index < 0) return [normalized.trim(), '待确认']
  return [normalized.slice(0, index).trim(), normalized.slice(index + 1).trim()]
}

function toCardRecord(): AdminCardRecord {
  const now = new Date().toISOString()
  const id = form.id.trim() || slugify(form.name) || `card-${Date.now().toString(36)}`

  return {
    id,
    name: form.name.trim(),
    issuer: form.issuer.trim(),
    category: form.category,
    status: form.status,
    network: form.network.trim() || '待确认',
    logo: form.logo.trim() || 'logo-plasma',
    logoText: form.logoText.trim() || form.name.slice(0, 1).toUpperCase(),
    suffix: form.suffix.trim() || form.network.trim() || 'card',
    suffixType: form.suffixType,
    featured: form.featured,
    rankTier: form.rankTier.trim() || '待分层',
    rating: Number(form.rating) || 4.3,
    reviews: Number(form.reviews) || 0,
    tags: form.tagsText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean),
    benefits: form.benefitsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [icon, text] = splitPair(line)
        return { icon: icon || 'grid', text: text || '待确认' }
      }),
    fees: form.feesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, value] = splitPair(line)
        return { label: label || '费用', value: value || '待确认' }
      }),
    region: form.region.trim() || '按官网开放地区',
    funding: form.funding.trim() || '按产品说明',
    speed: form.speed.trim() || '按申请进度',
    applyUrl: form.applyUrl.trim() || 'https://card.lengziyu.cn',
    sourceUrl: form.sourceUrl.trim() || form.applyUrl.trim() || 'https://card.lengziyu.cn',
    sourceName: form.sourceName.trim() || form.issuer.trim() || form.name.trim(),
    material: form.material.trim() || '待补充卡面样式',
    createdAt: form.createdAt || now,
    updatedAt: now
  }
}

async function loadCard() {
  loaded.value = false
  error.value = ''

  if (isNew.value) {
    loaded.value = true
    return
  }

  const card = await getAdminCard(String(route.params.id))
  if (!card) {
    error.value = '没有找到这张卡片'
    loaded.value = true
    return
  }

  assignCard(card)
  loaded.value = true
}

async function handleSave() {
  error.value = ''
  if (!form.name.trim() || !form.issuer.trim()) {
    error.value = '卡片名称和发行方必填'
    return
  }

  saving.value = true
  try {
    const saved = await saveAdminCard(toCardRecord())
    router.replace(`/admin/cards/${saved.id}/edit`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '保存失败'
  } finally {
    saving.value = false
  }
}

onMounted(loadCard)
</script>

<template>
  <AdminShell
    :title="isNew ? '新增卡片' : '编辑卡片'"
    :subtitle="isNew ? '先创建草稿，再补充来源和卡面信息。' : '更新卡片字段，发布前确认费用和来源。'"
  >
    <template #actions>
      <RouterLink class="admin-secondary-action" to="/admin/cards">
        <IconSymbol name="back" />
        返回列表
      </RouterLink>
    </template>

    <section v-if="!loaded" class="admin-empty">加载中...</section>
    <section v-else class="admin-edit-panel">
      <p v-if="error" class="form-error admin-form-error">{{ error }}</p>

      <div class="admin-form-grid">
        <label class="admin-field">
          <span>卡片 ID</span>
          <input v-model="form.id" :disabled="!isNew" placeholder="自动生成或手动填写" />
        </label>
        <label class="admin-field">
          <span>卡片名称</span>
          <input v-model="form.name" placeholder="Plasma Card" />
        </label>
        <label class="admin-field">
          <span>发行方</span>
          <input v-model="form.issuer" placeholder="Plasma" />
        </label>
        <label class="admin-field">
          <span>分类</span>
          <select v-model="form.category">
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </label>
        <label class="admin-field">
          <span>状态</span>
          <select v-model="form.status">
            <option v-for="item in statusOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
          </select>
        </label>
        <label class="admin-field">
          <span>卡组织 / 网络</span>
          <input v-model="form.network" placeholder="VISA" />
        </label>
        <label class="admin-field">
          <span>Logo class</span>
          <input v-model="form.logo" placeholder="logo-plasma" />
        </label>
        <label class="admin-field">
          <span>Logo 文本</span>
          <input v-model="form.logoText" placeholder="P" />
        </label>
        <label class="admin-field">
          <span>右侧标识</span>
          <input v-model="form.suffix" placeholder="VISA" />
        </label>
        <label class="admin-field">
          <span>标识类型</span>
          <select v-model="form.suffixType">
            <option v-for="item in suffixTypeOptions" :key="item.label" :value="item.value">{{ item.label }}</option>
          </select>
        </label>
        <label class="admin-field">
          <span>排行榜分层</span>
          <input v-model="form.rankTier" placeholder="顶级" />
        </label>
        <label class="admin-field">
          <span>评分</span>
          <input v-model.number="form.rating" type="number" min="0" max="5" step="0.1" />
        </label>
        <label class="admin-field">
          <span>评价数</span>
          <input v-model.number="form.reviews" type="number" min="0" />
        </label>
        <label class="admin-field admin-check-field">
          <input v-model="form.featured" type="checkbox" />
          <span>添加页置顶推荐</span>
        </label>
      </div>

      <div class="admin-form-grid">
        <label class="admin-field admin-wide-field">
          <span>标签</span>
          <input v-model="form.tagsText" placeholder="U卡, 稳定币, Visa" />
        </label>
        <label class="admin-field">
          <span>地区</span>
          <input v-model="form.region" />
        </label>
        <label class="admin-field">
          <span>资金来源</span>
          <input v-model="form.funding" />
        </label>
        <label class="admin-field">
          <span>开通速度</span>
          <input v-model="form.speed" />
        </label>
        <label class="admin-field">
          <span>官网 / 申请链接</span>
          <input v-model="form.applyUrl" placeholder="https://..." />
        </label>
        <label class="admin-field">
          <span>来源名称</span>
          <input v-model="form.sourceName" />
        </label>
        <label class="admin-field">
          <span>来源 URL</span>
          <input v-model="form.sourceUrl" placeholder="https://..." />
        </label>
        <label class="admin-field admin-wide-field">
          <span>卡面样式说明</span>
          <input v-model="form.material" placeholder="深绿稳定币卡" />
        </label>
      </div>

      <div class="admin-form-grid">
        <label class="admin-field admin-textarea-field">
          <span>权益，每行格式：icon: 文案</span>
          <textarea v-model="form.benefitsText" rows="6" />
        </label>
        <label class="admin-field admin-textarea-field">
          <span>费用，每行格式：费用项: 数值</span>
          <textarea v-model="form.feesText" rows="6" />
        </label>
      </div>

      <div class="admin-form-actions">
        <button class="admin-primary-action" type="button" :disabled="saving" @click="handleSave">
          <IconSymbol name="card" />
          {{ saving ? '保存中...' : '保存卡片' }}
        </button>
      </div>
    </section>
  </AdminShell>
</template>
