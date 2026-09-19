"use client"
import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

type Food = { id:number; name:string; price:number; cat:string; image:string; price2?:number }

const FOODS: Food[] = [
  // MINI PACKAGE
  { id:1, name:"Rice and beef", price:600, cat:"Mini Package", image:"/6f90e8daede28c01" },
  { id:2, name:"Fried rice and beef", price:600, cat:"Mini Package", image:"/2b968b651" },
  { id:3, name:"Jollof and chicken", price:1200, cat:"Mini Package", image:"/b936fa30a" },
  { id:4, name:"Fried rice and chicken", price:1200, cat:"Mini Package", image:"/1c91e" },
  { id:5, name:"Noodles and egg", price:1500, cat:"Mini Package", image:"/eaa95c178812" },
  // ... keep your MAIN DISHES below - don't delete them
]

function MenuContent() {
  const searchParams = useSearchParams()
  const [cart, setCart] = useState<Food[]>([])
  // ... KEEP ALL YOUR EXISTING LOGIC HERE (add, minus, order functions)

  return (
    <div>
      {/* KEEP YOUR EXISTING RETURN JSX HERE */}
    </div>
  )
}

export default function Menu() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <MenuContent />
    </Suspense>
  )
}
