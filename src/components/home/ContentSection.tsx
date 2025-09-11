'use client'
import CarDriverManagement from "../car-driver-management/CarDriverManagement"
import { MenuListType } from "@/src/types/ContentSectoin"
import Navbar from "@/src/components/home/Navbar";
import { useState } from "react";
import UploadDeliveryPlan from "../upload-delivery-plan/UploadDeliveryPlan";

export default function ContentSection() {
  const [currentTab, setCurrentTab] = useState(0)
  let menuList: MenuListType[] = [
    { title: "จัดการรถและพนักงานขับรถ", content: <CarDriverManagement /> },
    { title: "อัปโหลดแผน", content: <UploadDeliveryPlan /> },
    { title: "ติดตามรถ" },
    { title: "ค่าเที่ยว" },
    { title: "ค่าขนส่ง" },
    { title: "รายงาน" },
  ]
  return <>
    <div className="flex flex-col gap-5">
      <Navbar menuList={menuList} currentTab={currentTab} onTabChange={(index) => setCurrentTab(index)} />
      {menuList[currentTab].content}
    </div>
  </>
}