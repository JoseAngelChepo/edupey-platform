"use client"
import AuthGuard from '@/components/auth/AuthGuard'
import HomeShell from '@/components/layout/HomeShell'
export default function TemplateDashboardPage() { return <AuthGuard><HomeShell/></AuthGuard> }
