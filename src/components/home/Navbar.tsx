'use client'
import clsx from "clsx"
import { JSX, useState } from "react"

export default function Navbar() {
  const [currentTab, setCurrentTab] = useState(0)
  let menuList: { title: string, content?: JSX.Element }[] = [
    { title: "จัดการรถและพนักงานขับรถ" },
    { title: "อัปโหลดแผน" },
    { title: "ติดตามรถ" },
    { title: "ค่าเที่ยว" },
    { title: "ค่าขนส่ง" },
    { title: "รายงาน" },
  ]
  return <>
    <div className="bg-[var(--neutral-second-color)] p-3 flex gap-2 justify-between">
      {menuList.map((element: { title: string, content?: JSX.Element }, index: number) => {
        return <button
          onClick={() => {
            setCurrentTab(index)
          }}
          key={index} className={clsx("transition-all cursor-pointer flex-1 p-3 rounded-xl", {
            "bg-white": currentTab == index,
            "bg-white/0": currentTab != index,
          })}>
          <p className="text-center hover:scale-95 transition-transform">{element.title}</p>
        </button>
      })}
    </div>
  </>
}