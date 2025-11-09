"use client"
import { useState } from "react";
import { UploadIcon } from "../icon/Icon";
import UploadSection from "./UploadSection";

export default function UploadDeliveryPlan() {
  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-2">
          <UploadIcon size={24} className=" stroke-foreground" />
          <p className="font-bold text-xl">อัปโหลดแผนการจัดส่ง</p>
        </div>
        <p className="text-neutral">ยืนยันสถานะพร้อมใช้งานของคนขับรถและรถ</p>
        <div className="w-full border-1 border-error bg-error-second p-6 rounded-xl text-error-third">
          <p className="font-bold">ข้อกำหนดรูปแบบในการนำเข้าข้อมูล</p>
          <ul className="list-disc list-inside">
            <li>ระบบรองรับเฉพาะไฟล์ประเภท .xlsx และ .xls เท่านั้น</li>
            <li>
              กำหนดรูปแบบของไฟล์รถขนส่งจะต้องมีคอลัมน์ดังต่อไปนี้ (ไม่ต้องเรียงลำดับ) ลำดับเที่ยว, เลขออเดอร์, เวลาที่ส่งมอบ, น้ำหนักบรรทุก, ต้นทาง, ปลายทาง, drop, หมายเหตุ, เบอร์รถ, เบอร์พนักงานขับรถ1, เบอร์พนักงานขับรถ2, เวลาเข้าโหลด, ลำดับเที่ยว
              <ul className="list-disc list-inside pl-6">
                <li>กำหนดให้คอลัมน์ เวลาที่ส่งมอบ และ เวลาเข้าโหลด จะต้องเป็นวันเวลาในรูปแบบ <span className="font-bold">วัน/เดือน/ปีคริสตศักราช ชั่วโมง:นาที</span> เช่น 26/7/2025 14:00</li>
              </ul>
              <ul className="list-disc list-inside pl-6">
                <li>คอลัมน์น้ำหนักบรรทุกเป็นตัวเลขที่มากกว่า 0 และไม่เกิน 100,000 </li>
                <li>คอลัมน์ drop มากกว่า 0 และไม่เกิน 2 </li>
                <li>ทุกคอลัมน์ยกเว้น เบอร์พนักงานขับรถ2 ห้ามเป็น - หรือ ค่าว่าง </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <UploadSection />
    </div>
  </>
}