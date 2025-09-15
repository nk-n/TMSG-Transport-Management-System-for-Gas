"use client"
import { useEffect, useState } from "react";
import { SearchIcon } from "../icon/Icon";
import InputBox from "../utils/InputBox";
import TrackingCarCard from "./TrackingCarCard";
import { Order } from "@/src/types/Order";
import { orderRawData } from "@/src/constants/OrderSampleData";

export default function TrackingCarSection() {
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
              <TrackingCarCard order={element} key={element.orderId} />
            )
          })
          :
          <></>
      }
    </div>
  </>
}