"use client"
import { useEffect, useState } from "react";
import { SearchIcon } from "../icon/Icon";
import InputBox from "../utils/InputBox";
import TrackingCarCard from "./TrackingCarCard";
import { Order, OrderResponse, toOrder } from "@/src/types/Order";
import { apiClient } from "@/src/services/apiClient";

export default function TrackingCarSection() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[]>([])
  const [filerOrder, setFilterOrder] = useState<Order[]>([])

  const fetchOrder = async () => {
    const resWaiting = await apiClient.get(`/order/รอรับงาน`)
    const dataWaiting: Order[] = resWaiting.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    const resProgress = await apiClient.get(`/order/ระหว่างจัดส่งสินค้า`)
    const dataProgress: Order[] = resProgress.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    setFilterOrder([...dataWaiting, ...dataProgress])
    setOrder([...dataWaiting, ...dataProgress])
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword: string = e.target.value.trim()
    const newOrder: Order[] = order.filter((element) => {
      if (element.orderId.includes(keyword) || element.carId.includes(keyword)) {
        return element
      }
      else {
        const driver = element.drivers[0]
        if (driver.name.includes(keyword) || driver.tel.includes(keyword)) {
          return element
        }
        if (element.drivers.length === 2) {
          const driver2 = element.drivers[1]
          if (driver2.name.includes(keyword) || driver2.tel.includes(keyword)) {
            return element
          }
        }
      }
    })
    setSearchKeyword(keyword)
    setFilterOrder(newOrder)
  }

  return <>
    <div>
      <InputBox
        leading={<SearchIcon size={24} />}
        placeholder="ค้นหาได้จาก เบอร์รถ, เลขออเดอร์ ชื่อพนักงานขับรถ และเบอร์พนักงานขับรถ"
        controller={{ value: searchKeyword, handdleChange: handleSearchKeyword }} />
      {
        filerOrder.map((element) => {
          return (
            <TrackingCarCard order={element} key={element.orderId} />
          )
        })
      }
    </div>
  </>
}