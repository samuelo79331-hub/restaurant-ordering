"use client"
import { useEffect, useState } from "react"
export default function Kitchen(){
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{ setOrders(JSON.parse(localStorage.getItem('orders')||'[]')) },[])
  return <div style={{padding:20}}>
    <h1>Kitchen Orders</h1>
    {orders.reverse().map((o:any)=>(
      <div key={o.id} style={{border:"2px solid black", margin:10, padding:10}}>
        <b>Table {o.table}</b> - {o.time}<br/>
        {o.items.map((i:any)=> <div>{i.name} x{i.qty}</div>)}
        <b>Total: {o.total}</b>
      </div>
    ))}
  </div>
}