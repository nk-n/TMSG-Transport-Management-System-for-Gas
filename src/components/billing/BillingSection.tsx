"use client"
import { Order, OrderResponse, toOrder } from "@/src/types/Order"
import { useEffect, useState } from "react"
import InputBox from "../utils/InputBox"
import { SearchIcon } from "../icon/Icon"
import BillingCard from "./BillingCard"
import { apiClient } from "@/src/services/apiClient"
import { RowData } from "../car-driver-management/UploadMetadataPopup"

interface BillingSectionProps {
  billingData: RowData[]
  oil: number
}

export default function BillingSection({ billingData, oil }: BillingSectionProps) {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[]>([])
  const [filerOrder, setFilterOrder] = useState<Order[]>([])

  const calculateTotalFee = (): number => {
    const totalFee = filerOrder.reduce((sum, order) => sum + calculateBilling(order) * order.loadGas, 0);
    return totalFee
  }
  

  const calculateBilling = (order: Order): number => {
    if (billingData.length === 0) {
      return 0
    }
    let targetElement: RowData = billingData[0];
    for (const element of billingData) {
      targetElement = element
      if (Number(element["Start_KM"]) <= order.distance && order.distance <= Number(element["End_KM"])) {
        let i = 0
        for (i; i < Object.keys(element).length - 2; i++) {
          if (oil < i + 21) {
            return Number(element[`${i + 1}`])
          }
        }
        return Number(element[`${i}`])
      }
    }
    let i = 0
    for (i; i < Object.keys(targetElement).length - 2; i++) {
      if (oil < i + 21) {
        return Number(targetElement[`${i + 1}`])
      }
    }
    return Number(targetElement[`${i}`])
  }

  const fetchOrder = async () => {
    const res = await apiClient.get(`/order/อนุมัติ/true`)
    const data: Order[] = res.data.data.map((element: OrderResponse) => {
      return toOrder(element)
    })
    setFilterOrder([...data])
    setOrder([...data])
  }

  useEffect(() => {
    fetchOrder()
    const intervalId = setInterval(async () => {
      fetchOrder()
    }, 60000);

    return () => clearInterval(intervalId);
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
      <div className="flex gap-4 justify-center mb-5 ">
        <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3 bg-background">
          <p className="">จำนวนเที่ยวขนส่งทั้งหมด</p>
          <p className="text-primary text-4xl font-bold">{order.length}</p>
        </div>
        <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3 bg-background ">
          <p className="">ยอดรวมค่าขนส่ง</p>
          <p className="text-error text-4xl font-bold">฿{calculateTotalFee().toLocaleString('th-TH', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
      <InputBox
        leading={<SearchIcon size={24} />}
        placeholder="ค้นหา"
        controller={{ value: searchKeyword, handdleChange: handleSearchKeyword }} />
      {
        filerOrder.map((element) => {
          return (
            <BillingCard
              order={element}
              key={element.orderId}
              billingRate={calculateBilling(element)} />
          )
        })
      }
    </div>
  </>
}