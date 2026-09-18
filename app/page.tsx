"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main style={{ padding: 30, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>🍽️ MytJ Restaurant Ordering</h1>
      <p>Scan your table QR to order</p>
      
      <div style={{ marginTop: 30, display: "flex", gap: 15, justifyContent: "center" }}>
        <Link href="/scan" style={{ background: "black", color: "white", padding: "12px 20px", borderRadius: 8, textDecoration: "none" }}>
          📷 Scan QR
        </Link>
        <Link href="/menu?table=T1" style={{ background: "green", color: "white", padding: "12px 20px", borderRadius: 8, textDecoration: "none" }}>
          View Menu
        </Link>
      </div>

      <p style={{ marginTop: 40, color: "#666" }}>Connected to: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
    </main>
  )
}