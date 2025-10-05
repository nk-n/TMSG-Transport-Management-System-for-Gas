'use client'
import CarDriverManagement from "../car-driver-management/DataManagement"
import { MenuListType } from "@/src/types/ContentSectoin"
import Navbar from "@/src/components/home/Navbar";
import { useState } from "react";
import UploadDeliveryPlan from "../upload-delivery-plan/UploadDeliveryPlan";
import TrackingCar from "../tracking-car/TrackingCar";
import TravelExpense from "../travel-expense/TravelExpense";
import Billing from "../billing/Billing";

export default function ContentSection() {
  const [currentTab, setCurrentTab] = useState(0)
  let menuList: MenuListType[] = [
    { title: "จัดการข้อมูล", content: <CarDriverManagement /> },
    { title: "อัปโหลดแผน", content: <UploadDeliveryPlan /> },
    { title: "ติดตามรถ", content: <TrackingCar /> },
    { title: "ค่าเที่ยว", content: <TravelExpense /> },
    { title: "ค่าขนส่ง", content: <Billing /> },
    { title: "รายงาน" },
  ]
  return <>
    <div className="flex flex-col gap-5">
      <Navbar menuList={menuList} currentTab={currentTab} onTabChange={(index) => setCurrentTab(index)} />
      {menuList[currentTab].content}
    </div>
  </>
}