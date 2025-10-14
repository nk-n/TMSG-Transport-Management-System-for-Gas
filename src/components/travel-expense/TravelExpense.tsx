"use client"
import React, { JSX, ReactNode, useEffect, useState } from "react"
import TravelExpenseHeader from "./TravelExpenseHeader"
import TabBar from "../car-driver-management/TabBar"
import ApproveSection from "./ApproveSection"
import UnApproveSection from "./UnApproveSection"
import TravelSpecialExpensePopup from "./TravelSpecialExpensePopup"

export default function TravelExpense() {
  const [travelSpecialExpensePopup, setTravelSpecialExpensePopup] = useState(false)

  const [currentTab, setCurrentTab] = useState(0)
  let menuList: { content: JSX.Element }[] = [
    { content: <UnApproveSection openEditTravelExpensePopup={() => { setTravelSpecialExpensePopup(true) }} /> },
    {
      content: <ApproveSection openEditTravelExpensePopup={() => {
        setTravelSpecialExpensePopup(true)
      }} />
    },
  ]

  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <TravelSpecialExpensePopup isPopupOpen={travelSpecialExpensePopup} closePopup={() => {
        setTravelSpecialExpensePopup(false)
      }} />
      <TravelExpenseHeader />
      <TabBar currentTab={currentTab} setCurrentTab={(value: number) => {
        setCurrentTab(value)
      }} elementTab={[
        <div className="flex gap-3 items-center justify-center">
          <div className="w-[15px] h-[15px] bg-inprogress rounded-full"></div>
          <p>รอการอนุมัติ</p>
        </div>,
        <div className="flex gap-3 items-center justify-center">
          <div className="w-[15px] h-[15px] bg-success rounded-full"></div>
          <p>อนุมัติแล้ว</p>
        </div>
      ]} />
      {menuList[currentTab].content}
    </div>
  </>
}