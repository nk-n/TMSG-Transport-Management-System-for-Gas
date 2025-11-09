'use client'
import { useEffect, useState } from "react";
import { NotificationIcon, PeopleIcon } from "../icon/Icon";
import NotificationPopup from "./NotificationPopup";
import { NotificationType, toNotificationType } from "@/src/types/Notification";
import { apiClient } from "@/src/services/apiClient";
import { Order, OrderResponse, toOrder } from "@/src/types/Order";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/store/store";
import { setOrder } from "@/src/feature/order/orderSlice";
import { Status, StatusHistory } from "@/src/types/StatusHistory";
import { StatusHistoryMap } from "../tracking-car/TrackingCarCard";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/src/middleware/cookies";
import { useRouter } from "next/navigation";


export default function HomeHeader() {
  const dispatch = useDispatch<AppDispatch>()
  const [orders, setOrders] = useState<Order[]>([])
  // const [statusMap, setStatusMap] = useState<StatusHistoryMap>({})
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false)
  const router = useRouter()

  const [time, setTime] = useState<string>("")
  const [name, setName] = useState<string>("")

  const calTime = () => {
    setTime(new Date().toLocaleString('th-TH'))
  }

  const getUserName = () => {
    const name = localStorage.getItem("username")
    if (name) {
      setName(name)
    }
  }

  useEffect(() => {
    calTime()
    getUserName()
  }, [])

  const findStatusHistoryByStatus = (status: Status, statusMap: StatusHistoryMap): StatusHistory => {
    return statusMap[status]
  }

  const statusHistoryToMap = (data: Order): StatusHistoryMap => {
    const statusHistoryMap: StatusHistoryMap = {}
    for (const element of data.statusHistory) {
      statusHistoryMap[element.status] = element
    }
    return statusHistoryMap
    // setStatusMap(statusHistoryMap)
  }

  const isLate = (data: Order): boolean => {
    const now: Date = new Date("2025-09-26T14:00:00+07:00")
    const statusHistoryMap = statusHistoryToMap(data)
    for (const element of data.statusHistory) {
      const status = element.status
      if (status === Status.Waiting) {
        const loadStatusHistory = findStatusHistoryByStatus(Status.Load, statusHistoryMap);
        if (loadStatusHistory !== undefined && (loadStatusHistory.timestamp.getTime() - element.timestamp.getTime()) > 30 * 60 * 1000) {
          return true
        }
      }
      else if (status === Status.Load) {
        const loadStatusHistory = findStatusHistoryByStatus(Status.Travel, statusHistoryMap);
        if (loadStatusHistory !== undefined && (loadStatusHistory.timestamp.getTime() - element.timestamp.getTime()) > 60 * 60 * 1000) {
          return true
        }
      } else if (status === Status.Travel) {
        const loadStatusHistory = findStatusHistoryByStatus(Status.Deliver, statusHistoryMap);
        if (loadStatusHistory !== undefined && (loadStatusHistory.timestamp.getTime() - element.timestamp.getTime()) > data.timeUse * 60 * 1000) {
          return true
        }
      } else if (status === Status.Deliver) {
        const loadStatusHistory = findStatusHistoryByStatus(Status.Finish, statusHistoryMap);
        if (loadStatusHistory !== undefined && (loadStatusHistory.timestamp.getTime() - element.timestamp.getTime()) > 60 * 60 * 1000) {
          return true
        }
      }
    }
    return false;
  }

  const filterOrderLate = (data: Order[]) => {
    const newOrder = data.filter((element) => {
      if (isLate(element)) {
        return element
      }
    })
    setOrders(newOrder)
  }

  const fetchOrder = async () => {
    console.log("FETCHING DATA...")
    const resWaiting = await apiClient.get(`/order/รอรับงาน/true`)
    const dataWaiting: Order[] = resWaiting.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    const resProgress = await apiClient.get(`/order/ระหว่างจัดส่งสินค้า/true`)
    const dataProgress: Order[] = resProgress.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    dispatch(setOrder([...dataProgress, ...dataWaiting]))
    filterOrderLate([...dataProgress, ...dataWaiting])
  }

  useEffect(() => {
    fetchOrder()
    const intervalId = setInterval(async () => {
      fetchOrder()
    }, 6000);

    return () => clearInterval(intervalId);
  }, [])

  return <>
    <div className="flex shadow-md rounded-xl p-8 w-full justify-between bg-white">
      <div>
        <p className="text-3xl font-bold mb-2">TMSG - Transport Management System for Gas</p>
        <p className="text-neutral">ระบบจัดการการขนส่งแก๊ส LPG</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => {
            setNotificationPopupOpen(true)
          }}
          className="border-1 border-neutral rounded-full h-fit p-3 cursor-pointer relative transition-transform hover:scale-95">
          {
            orders.length > 0 ?
              <div className=" text-sm bg-error text-white flex justify-center items-center rounded-full absolute px-[9px] py-[3px] -top-[10px] -right-[10px]">{orders.length}</div>
              :
              <></>
          }
          <NotificationIcon size={24} className="stroke-foreground" />
        </button>
        <div className="border-1 border-neutral rounded-full h-fit px-4 py-3 flex gap-2">
          <PeopleIcon size={24} className="fill-foreground" />
          <p>เจ้าหน้าที่จัดส่ง {name}</p>
        </div>
        <button className="rounded-full border-1 border-neutral p-3 button-effect" onClick={async () => {
          router.replace("/login")
          deleteCookie("role")
          deleteCookie("jwt")
        }}>
          <LogOut className="stroke-foreground" />
        </button>
        <div className="flex flex-col items-end">
          <p>วันที่ เวลา</p>
          <p>{time}</p>
        </div>
      </div>
    </div>
    <NotificationPopup data={orders.map((element) => {
      return toNotificationType(element)
    })} isOpen={notificationPopupOpen} closePopup={() => {
      setNotificationPopupOpen(false)
    }} />
  </>
}