'use client'
import { useState } from "react";
import { NotificationIcon, PeopleIcon } from "../icon/Icon";
import { NotificationType } from "@/src/types/Notification";

export default function AdminHeader() {
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false)
  return <>
    <div className="flex shadow-md rounded-xl p-8 w-full justify-between bg-white">
      <div>
        <p className="text-3xl font-bold mb-2">TMSG - Transport Management System for Gas</p>
        <p className="text-neutral">ระบบจัดการการขนส่งแก๊ส LPG</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border-1 border-neutral rounded-full h-fit px-4 py-3 flex gap-2">
          <PeopleIcon size={24} className="fill-foreground" />
          <p>เจ้าหน้าที่จัดส่ง นายรักษิต รุ่งรัตนไชย</p>
        </div>
        <div className="flex flex-col items-end">
          <p>วันที่</p>
          <p>22/7/2568</p>
        </div>
      </div>
    </div>
  </>
}