"use client"
import { apiClient } from "@/src/services/apiClient"
import { Order, OrderResponse, toOrder } from "@/src/types/Order"
import { useEffect, useState } from "react"
import InputBox from "../utils/InputBox"
import { SearchIcon } from "../icon/Icon"
import TravelExpenseCard from "./TravelExpenseCard"

interface UnApproveSectionProps {
  openEditTravelExpensePopup: () => void
}
export default function UnApproveSection({ openEditTravelExpensePopup }: UnApproveSectionProps) {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[] | null>(null)

  const fetchOrder = async () => {
    const res = await apiClient.get(`/order/รออนุมัติ`)
    const data: Order[] = res.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    setOrder([...data])
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
              <TravelExpenseCard order={element} key={element.orderId} openEditTravelExpensePopup={openEditTravelExpensePopup} />
            )
          })
          :
          <></>
      }
    </div>
  </>
}