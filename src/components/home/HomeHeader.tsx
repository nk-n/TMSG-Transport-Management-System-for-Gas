'use client'
import { useState } from "react";
import { NotificationIcon, PeopleIcon } from "../icon/Icon";
import NotificationPopup from "./NotificationPopup";
import { NotificationType } from "@/src/types/Notification";

let data: NotificationType[] = [
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
    reason: "รถรอต่อแถวส่งสินค้านานมาก"
  },
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
  },
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
  },
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
    reason: "รถรอต่อแถวส่งสินค้านานมาก"
  },
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
    reason: "รถรอต่อแถวส่งสินค้านานมาก"
  },
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
    reason: "รถรอต่อแถวส่งสินค้านานมาก"
  },
  {
    id: "45778PTL.401เที่ยว 1",
    tel: "061-879-8569",
    reason: "รถรอต่อแถวส่งสินค้านานมาก"
  },
]

export default function HomeHeader() {
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false)
  return <>
    <div className="flex shadow-md rounded-xl p-8 w-full justify-between bg-white">
      <div>
        <p className="text-3xl font-bold mb-2">TMSG - Transport Management System for Gas</p>
        <p className="text-neutral">ระบบจัดการการขนส่งแก๊ส LPG</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => {
            setNotificationPopupOpen(true)
          }}
          className="border-1 border-neutral rounded-full h-fit p-3 cursor-pointer relative transition-transform hover:scale-95">
          <div className=" text-sm bg-error text-white flex justify-center items-center rounded-full absolute px-[9px] py-[3px] -top-[10px] -right-[10px]">{data.length}</div>
          <NotificationIcon size={24} className="stroke-foreground" />
        </button>
        <div className="border-1 border-neutral rounded-full h-fit px-4 py-3 flex gap-2">
          <PeopleIcon size={24} />
          <p>เจ้าหน้าที่จัดส่ง นายรักษิต รุ่งรัตนไชย</p>
        </div>
        <div className="flex flex-col items-end">
          <p>วันที่</p>
          <p>22/7/2568</p>
        </div>
      </div>
    </div>
    <NotificationPopup data={data} isOpen={notificationPopupOpen} closePopup={() => {
      setNotificationPopupOpen(false)
    }} />
  </>
}