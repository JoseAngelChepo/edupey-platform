import AuthGuard from '@/components/auth/AuthGuard'
import DonationPayment from '@/components/donations/DonationPayment'
export default async function DonationPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params
  return <AuthGuard><DonationPayment id={id}/></AuthGuard>
}
