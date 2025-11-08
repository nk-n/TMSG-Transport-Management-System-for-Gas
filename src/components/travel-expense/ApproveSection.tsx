"use client"
import { Order, OrderResponse, toOrder } from "@/src/types/Order"
import { useEffect, useState } from "react"
import InputBox from "../utils/InputBox"
import { FileIcon, SearchIcon } from "../icon/Icon"
import TravelExpenseCard from "./TravelExpenseCard"
import { apiClient } from "@/src/services/apiClient"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { StatusHistory } from "@/src/types/StatusHistory"
import { SpecialTrip, toSpecialTrip } from "@/src/types/Trip"

export default function ApproveSection() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [order, setOrder] = useState<Order[]>([])
  const [filerOrder, setFilterOrder] = useState<Order[]>([])

  const calculateCost = async (order: Order): Promise<number> => {
    const specialTrip = await fetchSpecialTrip(order.tripId)
    const totalTrip = specialTrip.reduce((sum, item) => {
      return sum + item.money
    }, 0)
    return order.money + totalTrip
  }

  const fetchSpecialTrip = async (tripID: string): Promise<SpecialTrip[]> => {
    const res = await apiClient.get(`/trip/special-trip/${tripID}`)
    const newSpecialTrip: SpecialTrip[] = res.data.data.map((element: SpecialTrip) => {
      return toSpecialTrip(element)
    })
    return newSpecialTrip
  }

  const getRealDeliveryTime = (status: StatusHistory[]) => {
    if (status.length > 0) {
      return status[status.length - 1].timestamp
    }
    return new Date()
  }

  const exportExcel = async () => {
    const data =
      await Promise.all(
        order.map(async (e) => {
          return {
            "เลขออเดอร์": e.orderId,
            "สถานะ": e.status,
            "เวลาส่งมอบ": e.deadline.toLocaleString('th-TH'),
            "เวลาส่งมอบจริง": getRealDeliveryTime(e.statusHistory).toLocaleString('th-TH'),
            "น้ำหนักบรรทุก": e.loadGas,
            "ต้นทาง": "SC BPK",
            "ปลายทาง": e.destination,
            "drop": e.drop,
            "หมายเหตุ": e.note.trim() === "" ? "-" : e.note,
            "เบอร์รถ": e.carId,
            "เบอร์พนักงานขับรถ1": e.drivers[0].tel,
            "เบอร์พนักงานขับรถ2": e.drivers.length === 2 ? e.drivers[1].tel : "-",
            "ค่าเที่ยว": await calculateCost(e),
          }
        })
      )
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "report.xlsx");
  };

  const fetchOrder = async () => {
    const res = await apiClient.get(`/order/อนุมัติ/false`)
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
      <InputBox
        leading={<SearchIcon size={24} />}
        placeholder="ค้นหาได้จาก เบอร์รถ, เลขออเดอร์ ชื่อพนักงานขับรถ และเบอร์พนักงานขับรถ"
        controller={{ value: searchKeyword, handdleChange: handleSearchKeyword }}
      />
      <div className="flex justify-end my-3 ">
        <button className="flex items-center justify-center gap-3 border-1 border-neutral rounded-xl p-3 cursor-pointer hover:scale-95 transition-all" onClick={() => {
          exportExcel()
        }}>
          <FileIcon size={20} className="stroke-foreground" />
          <p>นำออกข้อมูลค่าเที่ยว</p>
        </button>
      </div>
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