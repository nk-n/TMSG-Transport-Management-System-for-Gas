"use client"
import { JSX, useEffect, useState } from "react";
import { BusIcon, ErrorIcon, SendIcon, SuccessIcon } from "../icon/Icon";
import { ClipboardClock, Loader, Truck } from "lucide-react";
import { apiClient } from "@/src/services/apiClient";
import { TotalOrderStatus, toTotalOrderStatus } from "@/src/types/Order";

const statusItems: { title: string, amount: number, icon: JSX.Element, textColor: string }[] = [
  { title: "ออเดอร์รอรับงาน", amount: 0, icon: <Loader size={42} className="stroke-foreground" />, textColor: "text-foreground" },
  { title: "ออเดอร์อยู่ระหว่างการจัดส่ง", amount: 1, icon: <Truck size={42} className=" stroke-primary " />, textColor: "text-primary" },
  { title: "ออเดอร์รออนุมัติ", amount: 2, icon: <ClipboardClock size={42} className="stroke-inprogress" />, textColor: "text-inprogress" },
  { title: "ออเดอร์อนุมัติแล้ววันนี้", amount: 4, icon: <SuccessIcon size={42} className="fill-success" />, textColor: "text-success" },
]

export default function StatusBar() {
  const [totalStatus, setTotalStatus] = useState<TotalOrderStatus | null>(null)

  const fetchTotalStatus = async () => {
    const res = await apiClient.get("/order/all-status")
    const totalOrderStatus: TotalOrderStatus = toTotalOrderStatus(res.data.data)
    setTotalStatus(totalOrderStatus)
  }

  const mapOrderStatusToQuantityStatus = (data: string): number => {
    if (totalStatus !== null) {
      switch (data) {
        case "ออเดอร์รอรับงาน":
          return totalStatus.totalWaitingOrder
        case "ออเดอร์อยู่ระหว่างการจัดส่ง":
          return totalStatus.totalDeliveryOrder
        case "ออเดอร์รออนุมัติ":
          return totalStatus.totalWaitingApproveOrder
        case "ออเดอร์อนุมัติแล้ววันนี้":
          return totalStatus.totalApproveOrder
      }
    }
    return 0
  }

  useEffect(() => {
    fetchTotalStatus()
  }, [])

  return <>
    <div className="flex gap-3">
      {statusItems.map((element: { title: string, amount: number, icon: JSX.Element, textColor: string }, index: number) => {
        return <div key={index} className="flex items-center flex-1 justify-between p-5 rounded-xl bg-white border-[1px] border-neutral">
          <div>
            <p className={element.textColor}>{element.title}</p>
            <p className={`text-3xl font-bold ${element.textColor}`}>{mapOrderStatusToQuantityStatus(element.title)}</p>
          </div>
          {element.icon}
        </div>
      })}
    </div>
  </>
}