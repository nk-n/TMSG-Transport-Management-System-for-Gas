"use client"
import { useEffect, useState } from "react";
import { FilterIcon, SearchIcon } from "../icon/Icon";
import InputBox from "../utils/InputBox";
import TrackingCarCard from "./TrackingCarCard";
import { Order, OrderResponse, OrderStatus, toOrder } from "@/src/types/Order";
import { apiClient } from "@/src/services/apiClient";
import FilterPopup from "../car-driver-management/FilterPopup";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function TrackingCarSection() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const orders = useSelector((state: RootState) => state.order.list)
  const [filerOrder, setFilterOrder] = useState<Order[]>([])

  const [filterPopupOpen, setFilterPopupOpen] = useState(false)

  const [filterMap, setFilterMap] = useState<{ status: OrderStatus, check: boolean }[]>([
    { status: OrderStatus.Waiting, check: true },
    { status: OrderStatus.InProgress, check: true },])

  const fetchOrder = async () => {
    setFilterOrder([...orders])
  }

  useEffect(() => {
    let filterStatus: OrderStatus[] = filterMap.filter((element) => {
      if (element.check) {
        return element.status
      }
    }).map((element) => {
      return element.status
    })

    let newFilterData = orders.filter((element) => {
      if (filterStatus.includes(element.status)) {
        return element
      }
    })

    const newOrder: Order[] = newFilterData.filter((element) => {
      if (element.orderId.includes(searchKeyword) || element.carId.includes(searchKeyword)) {
        return element
      }
      else {
        const driver = element.drivers[0]
        if (driver.name.includes(searchKeyword) || driver.tel.includes(searchKeyword)) {
          return element
        }
        if (element.drivers.length === 2) {
          const driver2 = element.drivers[1]
          if (driver2.name.includes(searchKeyword) || driver2.tel.includes(searchKeyword)) {
            return element
          }
        }
      }
    })
    setFilterOrder(newOrder)
  }, [filterMap, searchKeyword])

  useEffect(() => {
    fetchOrder()
  }, [orders])

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword: string = e.target.value.trim()
    setSearchKeyword(keyword)
  }

  return <>
    <div>
      <div className="flex gap-3">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาได้จาก เบอร์รถ, เลขออเดอร์ ชื่อพนักงานขับรถ และเบอร์พนักงานขับรถ"
          controller={{ value: searchKeyword, handdleChange: handleSearchKeyword }} />
        <div className="relative w-full max-w-[150px]">
          <button
            onClick={() => {
              setFilterPopupOpen(!filterPopupOpen)
            }}
            className="bg-background border-1 border-neutral rounded-xl px-4 py-3 cursor-pointer hover:scale-95 transition-all relative w-full flex justify-center items-center">
            <FilterIcon size={24} />
          </button>
          <FilterPopup isOpen={filterPopupOpen} closePopup={() => {
            setFilterPopupOpen(false)
          }} filterMap={filterMap} setFilterMap={(newFilterMap) => {
            setFilterMap(newFilterMap)
          }} />
        </div>
      </div>
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