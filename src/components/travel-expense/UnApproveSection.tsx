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
  const [filerOrder, setFilterOrder] = useState<Order[]>([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[]>([])

  const fetchOrder = async () => {
    console.log("HAAHAHAH")
    const res = await apiClient.get(`/order/รออนุมัติ`)
    const data: Order[] = res.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    setOrder([...data])
    setFilterOrder([...data])
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

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
        placeholder="ค้นหา"
        controller={{ value: searchKeyword, handdleChange: handleSearchKeyword }} />
      {
        filerOrder.map((element) => {
          return (
            <TravelExpenseCard order={element} key={element.orderId} fetchOrder={() => {
              fetchOrder()
            }} />
          )
        })
      }
    </div>
  </>
}