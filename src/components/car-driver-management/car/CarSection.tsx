'use client'
import { DriverCarStatus, Driver, Car } from "@/src/types/CarDriver";
import { FilterIcon, SearchIcon } from "../../icon/Icon";
import InputBox from "../../utils/InputBox";
import { useEffect, useState } from "react";
import FilterPopup from "../FilterPopup";
import Table from "../../utils/Table";
import CheckBox from "../../utils/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import axios from "axios";
import { apiClient } from "@/src/services/apiClient";
import { setCars } from "@/src/feature/car/carSlice";

export default function CarSection() {
  const cars = useSelector((state: RootState) => state.car.list)
  const dispatch = useDispatch<AppDispatch>()
  const [filterData, setFilterData] = useState<Car[]>([])

  const [checkMap, setCheckMap] = useState<{ [id: string]: boolean }>()

  useEffect(() => {
    const initData = () => {
      setFilterData([...cars])
      const newCheckMap: { [id: string]: boolean } = {}
      cars.forEach((element) => {
        newCheckMap[element.id] = false
      })
      setCheckMap({ ...newCheckMap })
    }
    initData()
  }, [cars])

  // เก็บ state search keyword
  const [searchKeyword, setSearchKeyword] = useState("")
  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }


  // เก็บ state filter ข้อมูลเมื่อกดปุ่ม filter
  const [filterMap, setFilterMap] = useState<{ status: DriverCarStatus, check: boolean }[]>([
    { status: DriverCarStatus.Ready, check: true },
    { status: DriverCarStatus.NotReady, check: true },
    { status: DriverCarStatus.InProgress, check: true },])

  const [filterPopupOpen, setFilterPopupOpen] = useState(false)


  // จัดการเรื่อง การเลือก filter ของ user และการ search ของ user
  useEffect(() => {
    if (cars.length != 0) {
      let filterStatus: DriverCarStatus[] = filterMap.filter((element) => {
        if (element.check) {
          return element.status
        }
      }).map((element) => {
        return element.status
      })

      let newFilterData = cars.filter((element) => {
        if (filterStatus.includes(element.status)) {
          return element
        }
      })

      if (searchKeyword.trim() != "") {
        newFilterData = newFilterData.filter((element) => {
          if (
            element.license.includes(searchKeyword) ||
            element.type.includes(searchKeyword) ||
            element.weight.replaceAll(" ", "").includes(searchKeyword.replaceAll(" ", "")) ||
            element.note?.includes(searchKeyword)
          ) {
            return element
          }
        })
      }
      setFilterData([...newFilterData])
    }
  }, [filterMap, searchKeyword])

  const getCheckCarID = (): Car[] => {
    const carID: string[] = Object.entries(checkMap ?? {})
      .filter(([key, value]) => value)
      .map(([key]) => key);
    const newCars: Car[] = cars.map((element) => {
      if (carID.includes(element.id)) {
        return { ...element, status: DriverCarStatus.Ready }
      }
      return { ...element, status: DriverCarStatus.NotReady }
    })
    dispatch(setCars(newCars))
    return newCars
  }

  const updateStatus = async () => {
    try {
      const body: { status: DriverCarStatus, available: boolean, id: string }[] = getCheckCarID().map((element) => {
        return {
          status: element.status,
          available: element.available,
          id: element.id
        }
      })
      await apiClient.put("/metadata/car", body)
    } catch (err) {
      console.error(err)
    }
  }

  return <>
    <div className="bg-primary-second p-5 gap-5 flex flex-col rounded-2xl ">
      <p>เลือกรถขนส่งที่พร้อมใช้งาน</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจากเบอร์รถ, ทะเบียน, ประเภท, น้ำหนัก หรือหมายเหตุ เช่น PTL.401, กท79-0689, สิบล้อ, 8 ตัน เป็นต้น"
          controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
        <div className="relative">
          <button
            onClick={() => {
              setFilterPopupOpen(!filterPopupOpen)
            }}
            className="bg-background border-1 border-neutral rounded-xl px-4 py-3 cursor-pointer hover:scale-95 transition-all relative">
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
            updateStatus()
          }}
          className="bg-background border-1 border-neutral rounded-xl px-5 py-3 cursor-pointer hover:scale-95 transition-all">ยืนยันสถานะรถขนส่งที่เลือก</button>
      </div>
      <Table
        haveCheck={true}
        columnName={["เบอร์รถ", "สถานะ", "ทะเบียน", "ประเภท", "น้ำหนัก", "หมายเหตุ"]}
        checkMap={checkMap}
        setCheckMap={(newCheckMap: { [id: string]: boolean }) => {
          setCheckMap({ ...newCheckMap })
        }}
        idData={
          filterData.map((element) => {
            return element.id
          })
        }
      >
        {filterData.map((element, index) => {
          return (
            <tr className="hover:bg-gray-50 border-t border-gray-300" key={index}>
              <td className="px-4 py-4 text-center">
                <CheckBox disable={element.status == DriverCarStatus.InProgress} iconSize={18}
                  check={checkMap == undefined ? false : checkMap[element.id]}
                  setCheck={() => {
                    if (checkMap != undefined) {
                      let newCheckMap: { [id: string]: boolean } = checkMap
                      newCheckMap[element.id] = !checkMap[element.id]
                      setCheckMap({ ...newCheckMap })
                    }
                  }} /></td>
              <td className="px-4 py-4 text-left ">{element.id}</td>
              <td className="px-4 py-4 text-left">{
                element.status == DriverCarStatus.Ready ?
                  <div className="bg-success-second rounded-full py-2 px-4 w-fit border-1 border-success">
                    <p className="text-success text-sm">{DriverCarStatus.Ready}</p>
                  </div>
                  :
                  element.status == DriverCarStatus.NotReady ?
                    <div className="bg-error-second rounded-full py-2 px-4 w-fit border-error border-1">
                      <p className="text-error text-sm">{DriverCarStatus.NotReady}</p>
                    </div>
                    :
                    element.status == DriverCarStatus.InProgress ?
                      <div className="bg-inprogress-second rounded-full py-2 px-4 w-fit border-1 border-inprogress">
                        <p className="text-inprogress text-sm">{DriverCarStatus.InProgress}</p>
                      </div>
                      : <></>
              }</td>
              <td className="px-4 py-4 text-left">{element.license}</td>
              <td className="px-4 py-4 text-left">{element.type}</td>
              <td className="px-4 py-4 text-left">{element.weight}</td>
              <td className="px-4 py-4 text-left w-[40%] text-wrap">{element.note ?? "-"}</td>
            </tr>
          )
        })}
      </Table>
      {/* {checkMap != undefined ?
        <DriverCardList data={filterData} checkMap={checkMap} setCheckMap={(newCheckMap) => {
          setCheckMap(newCheckMap)
        }} />
        :
        <></>
      } */}
      {/* <button className="bg-primary text-white rounded-2xl py-3 hover:scale-95 transition-transform cursor-pointer">ยืนยันสถานะคนขับที่เลือก</button> */}
    </div >
  </>
}