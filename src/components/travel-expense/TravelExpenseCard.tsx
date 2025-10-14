"use client"
import { Order, OrderStatus } from "@/src/types/Order";
import { ArrowHeadDownIcon, CarIcon } from "../icon/Icon";
import { useState } from "react";
import clsx from "clsx";
import { Status, StatusHistory } from "@/src/types/StatusHistory";
import DeliveryStatusBar from "../tracking-car/DeliveryStatusBar";

interface TrackingCarCardProps {
  order: Order
  openEditTravelExpensePopup: () => void
}

export interface StatusHistoryMap {
  [key: string]: StatusHistory,
}

export default function TravelExpenseCard({ order, openEditTravelExpensePopup }: TrackingCarCardProps) {
  const [extend, setExtend] = useState(false)
  const [isLate, setIsLate] = useState(false)

  const deliveryStatusLable = ["เริ่มงาน", "รอโหลดสินค้า", "โหลดสินค้า", "เดินทางไปปลายทาง", "ลงสินค้า"]
  const statusHistoryArray = [Status.Start, Status.Waiting, Status.Load, Status.Travel, Status.Deliver]


  const statusHistoryToMap = (): StatusHistoryMap => {
    const statusHistoryMap: StatusHistoryMap = {}
    for (const element of order.statusHistory) {
      statusHistoryMap[element.status] = element
    }
    return statusHistoryMap
  }

  const currentProgresstion = (): string => {
    if (order.statusHistory.length === 0) return "-"
    let targetStatusHistory: Status = order.statusHistory[0].status
    let targetTimeStamp: number = 0
    for (const element of order.statusHistory) {
      if (element.timestamp.getTime() > targetTimeStamp) {
        targetTimeStamp = element.timestamp.getTime()
        targetStatusHistory = element.status
      }
    }
    return targetStatusHistory
  }


  return <>
    <div className={clsx("border-1  rounded-tr-xl rounded-tl-xl p-5 mt-4 flex flex-col gap-4 transition-all duration-300 overflow-hidden", {
      "max-h-[375px]": !extend,
      "max-h-[1000px]": extend,
      "border-error border-1": isLate,
      "border-neutral": !isLate
    })}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <CarIcon size={30} className="stroke-foreground" />
            <p className="font-bold">{order.carId}</p>
          </div>
          <p className="text-white bg-primary rounded-full px-3 py-2 text-sm">{order.status}</p>
          <p className="border-1 border-neutral text-neutral  rounded-full px-3 py-2 text-sm">{order.orderId}</p>
        </div>
        <div className="flex flex-col items-end text-neutral">
          <p className="">คนขับคนที่ 1: {order.drivers[0].name} ({order.drivers[0].tel}) คนขับคนที่ 2: {order.drivers.length > 1 ? `${order.drivers[1].name} (${order.drivers[1].tel})` : "-"}-</p>
          <p>เวลาส่งมอบ: {order.deadline.toDateString()}</p>
        </div>
      </div>
      <div className="bg-primary-second border-1 border-primary rounded py-3 px-4">
        <p>หมายเหตุ: {order.note}</p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p className="text-neutral">สถานะการขนส่งปัจจุบัน</p>
          {currentProgresstion()}
          <p className="mt-4 text-neutral">Drop</p>
          <p>{order.drop}</p>
        </div>
        <div className="flex-1">
          <p className="text-neutral">ปลายทาง</p>
          <p>{order.destination}</p>
          <p className="mt-4 text-neutral">กิโลกรัมแก๊สที่ลงให้ลูกค้า</p>
          <p>{order.serveGas == 0 ? "-" : order.serveGas}</p>
        </div>
        <div className="flex-1">
          <p className="text-neutral">ปริมาณแก๊สที่โหลด</p>
          <p>{order.loadGas} กิโลกรัม</p>
          <p className="mt-4 text-neutral">แก๊สเหลือ</p>
          <p>{order.serveGas === 0 ? "-" : order.loadGas - order.serveGas}</p>
        </div>
        <div className="border-1 border-neutral rounded-xl flex-[0.5] p-4">
          <p className="font-bold text-primary">ค่าเที่ยว</p>
          <p className="text-4xl font-bold text-primary">฿400.00 </p>
          <button className="w-full text-end text-primary underline cursor-pointer" onClick={() => {
            openEditTravelExpensePopup()
          }}>แก้ไข</button>
        </div>
      </div>
      <p>ความคืบหน้า ({order.statusHistory.length > 5 ? "5" : order.statusHistory.length}/5) จุด</p>
      <div className="flex justify-between ">
        <p>สถานะการขนส่ง</p>
        <button className="flex gap-2 cursor-pointer rounded-full hover:scale-95 transition-all" onClick={() => {
          setExtend(!extend)
        }}>
          <p>แสดงรายละเอียด</p>
          <ArrowHeadDownIcon size={24} className={clsx("transition-all", {
            "-rotate-180": !extend
          })} />
        </button>
      </div>
      {
        order.drop ?
          <div className="flex flex-col gap-4">
            <p></p>
            {
              statusHistoryArray.map((element, index) => {
                return (
                  <DeliveryStatusBar
                    key={index}
                    index={index + 1}
                    label={deliveryStatusLable[index]}
                    order={order}
                    status={element}
                    statusMap={statusHistoryToMap()}
                    setIsLate={() => {
                      setIsLate(true)
                    }}

                  />
                )
              })
            }
          </div>
          :
          <div>
          </div>
      }
    </div>
    <button className="bg-success w-full py-3 rounded-br-xl rounded-bl-xl cursor-pointer">
      <p className="font-bold text-white text-center w-full hover:scale-95 transition-all">อนุมัติค่าเที่ยว</p>
    </button>
  </>
}