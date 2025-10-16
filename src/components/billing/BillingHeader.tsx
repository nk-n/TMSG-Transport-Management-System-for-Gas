"use client"
import { useState } from "react";
import { CoinIcon, FileIcon, PeopleIcon, UploadIcon } from "../icon/Icon";

interface BillingHeader {
  totalFee: number
}
export default function BillingHeader({ totalFee }: BillingHeader) {

  return <>
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CoinIcon size={24} className="  stroke-foreground" />
              <p className="font-bold text-xl">วางบิลค่าขนส่ง</p>
            </div>
            <p className="text-neutral">จัดการคำนวณค่าขนส่งเพื่อเรียกเก็บกับผู้ว่าจ้าง</p>
          </div>
          <button className="flex items-center justify-center gap-3 border-1 border-neutral rounded-xl p-3 cursor-pointer hover:scale-95 transition-all">
            <FileIcon size={20} className="stroke-foreground" />
            <p>นำออกข้อมูลค่าขนส่ง</p>
          </button>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
          <p className="">จำนวนเที่ยวขนส่งทั้งหมด</p>
          <p className="text-primary text-4xl font-bold">8</p>
        </div>
        <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
          <p className="">ยอดรวมค่าขนส่ง</p>
          <p className="text-error text-4xl font-bold">฿{totalFee.toLocaleString()}</p>
        </div>
      </div>
    </div>
  </>
}