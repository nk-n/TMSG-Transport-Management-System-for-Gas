"use client"
import { orderRawData } from "@/src/constants/OrderSampleData"
import { Order } from "@/src/types/Order"
import { useEffect, useState } from "react"
import InputBox from "../utils/InputBox"
import { SearchIcon } from "../icon/Icon"
import TravelExpenseCard from "./TravelExpenseCard"

interface ApproveSectionProps {
  openEditTravelExpensePopup : () => void
}
export default function ApproveSection({openEditTravelExpensePopup} : ApproveSectionProps) {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[] | null>(null)

  useEffect(() => {
    const fetchOrder = () => {
      setOrder([...orderRawData])
    }
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