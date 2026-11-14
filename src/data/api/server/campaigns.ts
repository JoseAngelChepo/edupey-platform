import { ApiServices } from './config'
export type Campaign = {
  id: string; title: string; summary: string; description: string
  category: 'materials' | 'scholarship' | 'technology'; currency: 'MXN'
  goalMinor: number; raisedMinor: number; beneficiaryCount: number
  learningGoal: string; selectionCriteria: string; insufficientFundsPolicy: string; surplusPolicy: string
  deadline: string; budget: { label: string; amountMinor: number }[]
  isDemo: boolean; status: 'open' | 'closed'; paymentAvailable: boolean
}
export type NewCampaign = Omit<Campaign, 'id' | 'currency' | 'raisedMinor' | 'isDemo' | 'status' | 'paymentAvailable'>
export const campaignApi = {
  list: () => ApiServices.get<Campaign[]>('/campaigns').then(r => r.data),
  detail: (id: string) => ApiServices.get<Campaign>(`/campaigns/${id}`).then(r => r.data),
  following: () => ApiServices.get<{ campaigns: Campaign[] }>('/campaigns/following').then(r => r.data.campaigns),
  follow: (id: string) => ApiServices.post(`/campaigns/${id}/follow`),
  unfollow: (id: string) => ApiServices.delete(`/campaigns/${id}/follow`),
  create: (data: NewCampaign) => ApiServices.post<Campaign>('/campaigns', data).then(r => r.data),
}
export const money = (minor: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(minor / 100)
export const categoryNames = { materials: 'Útiles y materiales', scholarship: 'Becas y talento', technology: 'Tecnología educativa' }
