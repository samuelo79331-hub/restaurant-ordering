"use client"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

type Food = { id:number; name:string; price:number; cat:string; image:string; price2?:number }

const FOODS: Food[] = [
  // MINI PACKAGE
  { id:1, name:"Rice and beef", price:600, cat:"Mini Package", image:"/6f0e0daede28c011a2a1385f1e206f14.jpg" },
  { id:2, name:"Fried rice and beef", price:600, cat:"Mini Package", image:"/2b968b651b26d005fd6439c7b304c4b4.jpg" },
  { id:3, name:"Jollof and chicken", price:1200, cat:"Mini Package", image:"/b936fa30a12f68ed42629327d42ad33b.jpg" },
  { id:4, name:"Fried rice and chicken", price:1200, cat:"Mini Package", image:"/1c91ebfea4c4bf9caa518ec49172c41d.jpg" },
  { id:5, name:"Noodles and egg", price:1500, cat:"Mini Package", image:"/eaa95c1788120d82ee37664b0caa0cc9 (1).jpg" },

  // MAIN DISHES
  { id:10, name:"Jollof Rice with Turkey", price:4500, cat:"Main Dishes", image:"/d7e5bbd3a51a24e7dd4b5b09c9346d50.jpg" },
  { id:11, name:"Fried Rice with Turkey", price:4500, cat:"Main Dishes", image:"/d4cc467bbdc03ba3d271bc1839b58255.jpg" },
  { id:12, name:"Jollof Rice & Chicken", price:3000, cat:"Main Dishes", image:"/31d5c67ca8e6b6d0ae4abb4bcb70dbe8.jpg" },
  { id:13, name:"Fried Rice with Chicken", price:3000, cat:"Main Dishes", image:"/c9ba54a5a63838b60067224cd7e3ad36.jpg" },
  { id:14, name:"Fried yam & egg / peppered sauce", price:1500, cat:"Main Dishes", image:"/91e60f914540fa63d58abf5dd068593a.jpg" },
  { id:15, name:"White Rice & Stew", price:1400, cat:"Main Dishes", image:"/534021c423749269e53e6f178177b5d0.jpg" },
  { id:16, name:"Native Spaghetti", price:2000, cat:"Main Dishes", image:"/74fa45bb95945894ca5f05b13f7add5a.jpg" },
  { id:17, name:"Native Rice", price:2000, cat:"Main Dishes", image:"/c4d93219bbc295151136de4b804ecfdd.jpg" },
  { id:18, name:"Coconut Rice", price:2000, cat:"Main Dishes", image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500" },
  { id:19, name:"Stir fried noodles and egg", price:2500, cat:"Main Dishes", image:"/ded2e5bd607b154d2ad29c5c515a9da0.jpg" },
  { id:20, name:"Salad", price:500, cat:"Main Dishes", image:"/8171f13c2052f303fd10bbce5e4b9966.jpg" },
  { id:21, name:"Plantain", price:500, cat:"Main Dishes", image:"/ea2447672935ec12a5baba0183391fe5.jpg" },

  // PROTEINS
  { id:30, name:"Peppered Turkey (small)", price:2500, price2:3500, cat:"Proteins", image:"/35c0f6e05a25dcc44ed45262bacfd5d9.jpg" },
  { id:31, name:"Peppered Chicken", price:2000, cat:"Proteins", image:"/458c7378258897cb12baf4e59535e11a.jpg" },
  { id:32, name:"Peppered Beef", price:500, price2:1000, cat:"Proteins", image:"/5acf1032c03f7632a850f563ed30c399.jpg" },
  { id:33, name:"Round Fish (Kpania Fish)", price:500, price2:1000, cat:"Proteins", image:"/409a274691980f4b1f91eeeb59fad0e0.jpg" },
  { id:34, name:"Peppered Snail", price:4500, cat:"Proteins", image:"/6089e2c37a3343044c245e63fa91444b.jpg"},
  { id:35, name:"Peppered Goat Meat (2 Pcs)", price:3000, cat:"Proteins", image:"/8e29aacf38bd40ea48db701bf4b786fc.jpg" },
  { id:36, name:"Egg", price:500, cat:"Proteins", image:"/247129ef02eff445f32e065b5da320cb.jpg" },
]

const CATS = ["All","Mini Package","Main Dishes","Proteins"]

export default function Menu(){
  const params = useSearchParams()
  const table = params.get("table") || "T1"
  const [cart,setCart]=useState<any[]>([])
  const [activeCat,setActiveCat]=useState("All")

  const add = (item:Food) => {
    const f = cart.find((c:any)=>c.id===item.id)
    if(f) setCart(cart.map((c:any)=>c.id===item.id?{...c,qty:c.qty+1}:c))
    else setCart([...cart,{...item,qty:1}])
  }
  const minus = (id:number) => {
    const f = cart.find((c:any)=>c.id===id)
    if(f.qty===1) setCart(cart.filter((c:any)=>c.id!==id))
    else setCart(cart.map((c:any)=>c.id===id?{...c,qty:c.qty-1}:c))
  }
  const total = cart.reduce((s:any,i:any)=>s+i.price*i.qty,0)
  const filtered = activeCat==="All" ? FOODS : FOODS.filter(f=>f.cat===activeCat)

  const order = () => {
    if(!cart.length) return
    const newOrder = { id:Date.now(), table, items:cart, total, time:new Date().toISOString() }
    const old = JSON.parse(localStorage.getItem('orders')||'[]')
    localStorage.setItem('orders', JSON.stringify([...old,newOrder]))
    let msg = `*MYTJ NEW ORDER - Table ${table}*%0A%0A`
    cart.forEach((i:any)=> msg+=`• ${i.name} x${i.qty} = ₦${i.price*i.qty}%0A`)
    msg+=`%0A*Total: ₦${total.toLocaleString()}*%0A_Please confirm_`
    window.open(`https://wa.me/2348168722893?text=${msg}`,'_blank')
    setCart([])
    alert("✅ Order sent to 08168722893")
  }

  return (
    <div style={{background:"#0f0f0f", minHeight:"100vh", color:"white", fontFamily:"sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,#ff0000,#ff8c00)", padding:16, position:"sticky", top:0, zIndex:10}}>
        <h1 style={{margin:0, fontSize:28, fontWeight:900}}>MYTJ<span style={{fontWeight:400, fontStyle:"italic", fontSize:22}}> Menu</span></h1>
        <p style={{margin:0, fontSize:13}}>Table {table} • Fruits & Conches • 📞 08168722893</p>
      </div>

      <div style={{display:"flex", gap:8, padding:12, overflowX:"auto"}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} style={{whiteSpace:"nowrap", padding:"8px 16px", borderRadius:20, border:"none", background: activeCat===c?"white":"#2a2a2a", color: activeCat===c?"black":"white", fontWeight:"bold"}}>{c}</button>
        ))}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:12, paddingBottom:110}}>
        {filtered.map(f=>{
          const inCart = cart.find((c:any)=>c.id===f.id)
          return (
            <div key={f.id} style={{background:"white", color:"black", borderRadius:18, overflow:"hidden", boxShadow:"0 4px 12px rgba(0,0,0,0.3)"}}>
              <img src={f.image} alt={f.name} style={{width:"100%", height:110, objectFit:"cover"}}/>
              <div style={{padding:10}}>
                <div style={{fontSize:10, background:"#ffe5e5", color:"#c00", display:"inline-block", padding:"2px 6px", borderRadius:6, fontWeight:"bold"}}>{f.cat}</div>
                <div style={{fontWeight:"800", fontSize:13, marginTop:4, lineHeight:"16px"}}>{f.name}</div>
                <div style={{marginTop:6, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:900}}>₦{f.price.toLocaleString()}</div>
                    {f.price2 && <div style={{fontSize:10, color:"gray"}}>Big: ₦{f.price2.toLocaleString()}</div>}
                  </div>
                  {!inCart ? (
                    <button onClick={()=>add(f)} style={{background:"black", color:"white", border:"none", borderRadius:20, padding:"7px 14px", fontWeight:"bold"}}>+ Add</button>
                  ):(
                    <div style={{display:"flex", alignItems:"center", gap:6, background:"black", color:"white", borderRadius:20, padding:"3px 8px"}}>
                      <button onClick={()=>minus(f.id)} style={{background:"none", border:"none", color:"white", fontSize:16}}>-</button>
                      <span style={{fontWeight:"bold"}}>{inCart.qty}</span>
                      <button onClick={()=>add(f)} style={{background:"none", border:"none", color:"white", fontSize:16}}>+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {cart.length>0 && (
        <div style={{position:"fixed", bottom:0, left:0, right:0, background:"white", color:"black", padding:14, borderTopLeftRadius:20, borderTopRightRadius:20, boxShadow:"0 -4px 20px rgba(0,0,0,0.3)"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:14, marginBottom:8}}>
            <b>{cart.reduce((s:any,i:any)=>s+i.qty,0)} items</b><b>₦{total.toLocaleString()}</b>
          </div>
          <button onClick={order} style={{width:"100%", background:"#16a34a", color:"white", border:"none", padding:14, borderRadius:12, fontWeight:900, fontSize:16}}>Order on WhatsApp • ₦{total.toLocaleString()}</button>
        </div>
      )}
    </div>
  )
}