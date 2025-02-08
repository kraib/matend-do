import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import AuthProvider from "@/components/providers/auth-provider"
import { PatientProvider } from "@/context/patient-context"
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Health Vitals Tracker",
  description: "Track your health vitals with ease",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PatientProvider>
            <Navigation />
            <main className="container mx-auto mt-8 px-4 py-8">
              {children}
            </main>
          </PatientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
