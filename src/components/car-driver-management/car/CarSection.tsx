'use client'
import { DriverCarStatus, Car } from "@/src/types/CarDriverManagement";
import { FilterIcon, SearchIcon } from "../../icon/Icon";
import InputBox from "../../utils/InputBox";
import { useEffect, useState } from "react";
import FilterPopup from "../FilterPopup";
import CarCardList from "./CarCardList";

export default function CarSection({ rawData }: { rawData: Car[] }) {
  const [data, setData] = useState<Car[]>([])
  const [filterData, setFilterData] = useState<Car[]>([])

  // เก็บ state search keyword
  const [searchKeyword, setSearchKeyword] = useState("")
  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  // เก็บ state ของ checkbox แต่ละ Driver Card
  const [checkMap, setCheckMap] = useState<{ [id: string]: boolean }>()

  // เก็บ state filter ข้อมูลเมื่อกดปุ่ม filter
  const [filterMap, setFilterMap] = useState<{ status: DriverCarStatus, check: boolean }[]>([
    { status: DriverCarStatus.Ready, check: true },
    { status: DriverCarStatus.NotReady, check: true },
    { status: DriverCarStatus.InProgress, check: true },])

  const [filterPopupOpen, setFilterPopupOpen] = useState(false)


  useEffect(() => {
    const fetchData = () => {
      setData([...rawData])
      setFilterData([...rawData])
      const newCheckMap: { [id: string]: boolean } = {}
      rawData.forEach((element) => {
        newCheckMap[element.id] = false
      })
      setCheckMap({ ...newCheckMap })
    }
    fetchData()
  }, [])

  // จัดการเรื่อง การเลือก filter ของ user และการ search ของ user
  useEffect(() => {
    if (data.length != 0) {
      let filterStatus: DriverCarStatus[] = filterMap.filter((element) => {
        if (element.check) {
          return element.status
        }
      }).map((element) => {
        return element.status
      })

      let newFilterData = data.filter((element) => {
        if (filterStatus.includes(element.status)) {
          return element
        }
      })

      if (searchKeyword.trim() != "") {
        newFilterData = newFilterData.filter((element) => {
          if (element.id.includes(searchKeyword) ||
            element.licensePlate.includes(searchKeyword) ||
            element.type.replaceAll(" ", "").includes(searchKeyword.replaceAll(" ", ""))) {
            return element
          }
        })
      }
      setFilterData([...newFilterData])
    }
  }, [filterMap, searchKeyword])

  return <>
    <div className="bg-[var(--primary-second-color)] p-5 gap-5 flex flex-col rounded-2xl">
      <p>เลือกพนักงานขับรถที่พร้อมทำงาน</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจาก เบอร์รถ, ทะเบียน, ประเภทรถ เช่น รถ 10 ล้อ 8 ต้น, PTL.401"
          controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
        <div className="relative">
          <button
            onClick={() => {
              setFilterPopupOpen(!filterPopupOpen)
            }}
            className="bg-[var(--background)] border-1 border-[var(--neutral-color)] rounded-xl px-4 py-3 cursor-pointer hover:scale-95 transition-all relative">
            <FilterIcon size={24} />
          </button>
          <FilterPopup isOpen={filterPopupOpen} closePopup={() => {
            setFilterPopupOpen(false)
          }} filterMap={filterMap} setFilterMap={(newFilterMap) => {
            setFilterMap(newFilterMap)
          }} />
        </div>
        <button
          onClick={() => {
            let idFilterData: string[] = filterData.map((element) => {
              return element.id
            })
            if (checkMap != undefined) {
              let checkMapKeys = Object.keys(checkMap)
              let newCheckMap = checkMap
              checkMapKeys.forEach((element) => {
                if (idFilterData.includes(element)) {
                  return newCheckMap[element] = true
                }
              })
              setCheckMap({ ...newCheckMap })
            }
          }}
          className="bg-[var(--background)] border-1 border-[var(--neutral-color)] rounded-xl px-5 py-3 cursor-pointer hover:scale-95 transition-all">เลือกทั้งหมด</button>
      </div>
      {checkMap != undefined ?
        <CarCardList data={filterData} checkMap={checkMap} setCheckMap={(newCheckMap) => {
          setCheckMap(newCheckMap)
        }} />
        :
        <></>
      }
      <button className="bg-[var(--primary-color)] text-white rounded-2xl py-3 hover:scale-95 transition-transform cursor-pointer">ยืนยันสถานะรถที่เลือก</button>
    </div>
  </>
}