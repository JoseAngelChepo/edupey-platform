"use client"
import AuthGuard from '@/components/auth/AuthGuard'
import CampaignDashboard from '@/components/campaigns/CampaignDashboard'
export default function DashboardPage() { return <AuthGuard><CampaignDashboard/></AuthGuard> }
