'use client'
import { useEffect, useState } from "react";
import { PeopleIcon } from "../icon/Icon";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/src/middleware/cookies";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const [time, setTime] = useState<string>("")
  const [name, setName] = useState<string>("")
  const router = useRouter()

  const calTime = () => {
    setTime(new Date().toLocaleString('th-TH'))
  }

  const getUserName = () => {
    const name = localStorage.getItem("username")
    if (name) {
      setName(name)
    }
  }

  useEffect(() => {
    calTime()
    getUserName()
  }, [])

  return <>
    <div className="flex shadow-md rounded-xl p-8 w-full justify-between bg-white">
      <div>
        <p className="text-3xl font-bold mb-2">TMSG - Transport Management System for Gas</p>
        <p className="text-neutral">ระบบจัดการการขนส่งแก๊ส LPG</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border-1 border-neutral rounded-full h-fit px-4 py-3 flex gap-2">
          <PeopleIcon size={24} className="fill-foreground" />
          <p>ผู้ดูแลระบบ {name}</p>
        </div>
        <button className="rounded-full border-1 border-neutral p-3 button-effect" onClick={async () => {
          router.replace("/login")
          deleteCookie("role")
          deleteCookie("jwt")
        }}>
          <LogOut className="stroke-foreground" />
        </button>
        <div className="flex flex-col items-end">
          <p>วันที่ เวลา</p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  </>
}