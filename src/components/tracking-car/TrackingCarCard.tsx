import { DeliveryStatus, Order, OrderStatus } from "@/src/types/Order";
import { ArrowHeadDownIcon, CarIcon } from "../icon/Icon";
import { useState } from "react";
import DeliveryStatusBar from "./DeliveryStatusBar";
import clsx from "clsx";

interface TrackingCarCardProps {
  order: Order
}

export default function TrackingCarCard({ order }: TrackingCarCardProps) {
  const [extend, setExtend] = useState(false)
  return <>
    <div className={clsx("border-1 border-neutral rounded-xl p-5 mt-4 flex flex-col gap-4 transition-all duration-300 overflow-hidden", {
      "max-h-[358px]": !extend,
      "max-h-[1000px]": extend
    })}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <CarIcon size={30} className="stroke-foreground" />
            <p className="font-bold">{order.car.id}</p>
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
          <p className="text-neutral">ตำแหน่งปัจจุบัน</p>
          <p>{order.currentLocation}</p>
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
          <p>{order.balanceGas}</p>
        </div>
      </div>
      <p>ความคืบหน้า (3/4) จุด</p>
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
            <DeliveryStatusBar
              index={1}
              status={order.waitingLoadStatus}
              startTime={order.startTime}
              endTime={new Date(order.startTime.getTime() + (order.timeWaitingLoad * 60 * 1000))}
            />
            <DeliveryStatusBar
              index={2}
              status={order.loadStatus}
              startTime={new Date(order.startTime.getTime() + (order.timeWaitingLoad * 60 * 1000))}
              endTime={new Date(order.startTime.getTime() + (order.timeWaitingLoad * 60 * 1000) + (order.timeLoad * 60 * 1000))}
            />
            <DeliveryStatusBar
              index={3}
              status={order.deliveryStatus}
              startTime={new Date(order.startTime.getTime() + (order.timeWaitingLoad * 60 * 1000) + (order.timeLoad * 60 * 1000))}
              endTime={new Date(order.startTime.getTime() + (order.timeWaitingLoad * 60 * 1000) + (order.timeLoad * 60 * 1000) + (order.timeDelivery * 60 * 1000))}
            />
            <DeliveryStatusBar
              index={4}
              status={order.serveStatus}
              startTime={new Date(order.startTime.getTime() + (order.timeWaitingLoad * 60 * 1000) + (order.timeLoad * 60 * 1000) + (order.timeDelivery * 60 * 1000))}
            />
          </div>
          :
          <div>
            {/* <DeliveryStatusBar status={DeliveryStatus.Late} />
            <DeliveryStatusBar status={DeliveryStatus.Success} />
            <DeliveryStatusBar status={DeliveryStatus.Late} /> */}
          </div>
      }
    </div>
  </>
}