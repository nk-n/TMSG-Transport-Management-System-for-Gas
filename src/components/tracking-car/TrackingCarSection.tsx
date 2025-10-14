"use client"
import { useEffect, useState } from "react";
import { SearchIcon } from "../icon/Icon";
import InputBox from "../utils/InputBox";
import TrackingCarCard from "./TrackingCarCard";
import { Order, OrderResponse, toOrder } from "@/src/types/Order";
import { apiClient } from "@/src/services/apiClient";

export default function TrackingCarSection() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[] | null>(null)

  const fetchOrder = async () => {
    const resWaiting = await apiClient.get(`/order/รอรับงาน`)
    const dataWaiting: Order[] = resWaiting.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    const resProgress = await apiClient.get(`/order/ระหว่างจัดส่งสินค้า`)
    const dataProgress: Order[] = resProgress.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    setOrder([...dataWaiting, ...dataProgress])
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  return <>
    <div>
      <InputBox
        leading={<SearchIcon size={24} />}
        placeholder="ค้นหา"
        controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
      {
        order != null ?
          order?.map((element) => {
            return (
              <TrackingCarCard order={element} key={element.orderId} />
            )
          })
          :
          <></>
      }
    </div>
  </>
}