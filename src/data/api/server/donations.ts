import { ApiServices } from './config'
export type Donation = {
  id:string;campaignId:string;campaignTitle:string;amountMinor:number;currency:'MXN'
  status:'creating'|'pending'|'confirmed'|'expired'|'failed'|'review'
  expiresAt:string;confirmedMinor:number;qrImage?:string
  payments:{transactionId:string;amountMinor:number;paidAt:string}[]
}
export const donationApi = {
  create:(campaignId:string,amountMinor:number,idempotencyKey:string)=>ApiServices.post<Donation>(`/campaigns/${campaignId}/donations`,{amountMinor,idempotencyKey}).then(r=>r.data),
  detail:(id:string)=>ApiServices.get<Donation>(`/donations/${id}`).then(r=>r.data),
  reconcile:(id:string)=>ApiServices.post<Donation>(`/donations/${id}/reconcile`).then(r=>r.data),
  history:()=>ApiServices.get<{items:Donation[];confirmedMinor:number;paymentAvailable:boolean}>('/donations/mine').then(r=>r.data),
}
export const donationStatus = {creating:'Preparando QR',pending:'Pendiente de pago',confirmed:'Pago confirmado',expired:'QR vencido',failed:'No completada',review:'En revisión'}
