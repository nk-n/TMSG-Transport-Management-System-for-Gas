"use client"
import React, { JSX, ReactNode, use, useEffect, useState } from "react"
import TravelExpenseHeader from "./BillingHeader"
import TabBar from "../car-driver-management/TabBar"
import BillingSection from "./BillingSection"
import BillingHeader from "./BillingHeader"
import { RowData } from "../car-driver-management/UploadMetadataPopup"

export default function Billing() {
  const [currentTab, setCurrentTab] = useState(0)
  const [billingData, setBillingData] = useState<RowData[]>([])
  const [oil, setOil] = useState(0)


  const fetchBilling = () => {
    const storedData = localStorage.getItem("billing");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBillingData(parsedData)
    }
  }

  const fetchOil = () => {
    const storedData = localStorage.getItem("oil_price");
    if (storedData) {
      const parsedData = Number(storedData);
      setOil(parsedData)
    }
  }

  useEffect(() => {
    fetchBilling()
    fetchOil()
  }, [])

  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <BillingHeader fetchData={fetchBilling} fetchOil={fetchOil} />
      <BillingSection
        billingData={billingData} oil={oil} />
    </div>
  </>
}