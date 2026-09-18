"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ScanPage(){
  const router = useRouter()
  const [table, setTable] = useState("")

  return (
    <main style={{padding:30, textAlign:"center"}}>
      <h2>📷 Scan Table QR</h2>
      <div style={{margin:"30px auto", maxWidth:350, padding:20, border:"1px solid #ddd", borderRadius:12}}>
        <input value={table} onChange={e=>setTable(e.target.value)} placeholder="e.g T1" style={{padding:12, width:"80%", fontSize:18, textAlign:"center", borderRadius:8}} />
        <br/>
        <button onClick={()=>router.push(`/menu?table=${table || 'T1'}`)} style={{marginTop:15, background:"black", color:"white", padding:"12px 20px", borderRadius:8, width:"80%"}}>Open Menu</button>
      </div>
    </main>
  )
}