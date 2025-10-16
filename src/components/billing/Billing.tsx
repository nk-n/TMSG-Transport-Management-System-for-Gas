"use client"
import React, { JSX, ReactNode, useEffect, useState } from "react"
import TravelExpenseHeader from "./BillingHeader"
import TabBar from "../car-driver-management/TabBar"
import BillingSection from "./BillingSection"
import BillingHeader from "./BillingHeader"

export default function Billing() {
  const [currentTab, setCurrentTab] = useState(0)

  const [totalFee, setTotalFee] = useState<number[]>([])
  const calculateTotalFee = (): number => {
    let newTotalFee: number = 0
    totalFee.forEach((element) => {
      newTotalFee += element
    })
    return newTotalFee
  }

  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <BillingHeader totalFee={calculateTotalFee()} />
      <BillingSection setTotalFee={(data: number) => {
        setTotalFee([...totalFee, data])
      }} />
    </div>
  </>
}