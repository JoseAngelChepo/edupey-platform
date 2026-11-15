import { ApiServices } from './config'

export type AdminDonor = {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
} | null

export type AdminPayment = {
  transactionId: string
  amountMinor: number
  status: string
  reviewReason?: string
  webhookId?: string
  paidAt: string
  donationId: string
  campaignId: string
  userId: string
}

export type AdminDonation = {
  id: string
  campaignId: string
  campaignTitle: string
  amountMinor: number
  currency: string
  status: string
  rawStatus: string
  expiresAt: string
  confirmedMinor: number
  providerQrId?: string
  donor: AdminDonor
  payments: AdminPayment[]
}

export type AdminOverview = {
  paymentAvailable: boolean
  donations: { creating: number; pending: number; failed: number; review: number }
  receipts: { confirmed: number; review: number; confirmedMinor: number; needingAttention: number }
  campaigns: { openNonDemo: number; raisedMinor: number }
}

export type AdminList<T> = { items: T[]; total: number; page: number; limit: number }

export const adminApi = {
  overview: () => ApiServices.get<AdminOverview>('/admin/overview').then(r => r.data),
  donations: (params?: { status?: string; page?: number; limit?: number; search?: string }) => {
    const query = new URLSearchParams()
    if (params?.status) query.set('status', params.status)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    if (params?.search) query.set('search', params.search)
    const suffix = query.toString() ? `?${query}` : ''
    return ApiServices.get<AdminList<AdminDonation>>(`/admin/donations${suffix}`).then(r => r.data)
  },
  donation: (id: string) => ApiServices.get<AdminDonation>(`/admin/donations/${id}`).then(r => r.data),
  reconcile: (id: string) => ApiServices.post<AdminDonation>(`/admin/donations/${id}/reconcile`).then(r => r.data),
  receipts: (params?: { status?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams()
    if (params?.status) query.set('status', params.status)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    const suffix = query.toString() ? `?${query}` : ''
    return ApiServices.get<AdminList<AdminPayment>>(`/admin/receipts${suffix}`).then(r => r.data)
  },
}
