'use client'
import { DriverCarStatus, Driver } from "@/src/types/CarDriver";
import { FilterIcon, SearchIcon } from "../../icon/Icon";
import InputBox from "../../utils/InputBox";
import { useEffect, useState } from "react";
import FilterPopup from "../FilterPopup";
import Table from "../../utils/Table";
import CheckBox from "../../utils/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { setDriver } from "@/src/feature/driver/driverSlice";
import { apiClient } from "@/src/services/apiClient";
import UpdateNoteColumn from "../../utils/NoteColumn";

export default function DriverSection() {
  const drivers = useSelector((state: RootState) => state.driver.list)
  const dispatch = useDispatch<AppDispatch>()
  const [filterData, setFilterData] = useState<Driver[]>([])

  // เก็บ state ของ checkbox แต่ละ Driver Card
  const [checkMap, setCheckMap] = useState<{ [id: string]: boolean }>()

  useEffect(() => {
    const initData = () => {
      setFilterData([...drivers])
      const newCheckMap: { [id: string]: boolean } = {}
      drivers.forEach((element) => {
        newCheckMap[element.tel] = false
      })
      setCheckMap({ ...newCheckMap })
    }
    initData()
  }, [drivers])

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
    if (drivers.length != 0) {
      let filterStatus: DriverCarStatus[] = filterMap.filter((element) => {
        if (element.check) {
          return element.status
        }
      }).map((element) => {
        return element.status
      })

      let newFilterData = drivers.filter((element) => {
        if (filterStatus.includes(element.status)) {
          return element
        }
      })

      if (searchKeyword.trim() != "") {
        newFilterData = newFilterData.filter((element) => {
          if (element.name.includes(searchKeyword) || element.tel.replaceAll("-", "").includes(searchKeyword.replaceAll("-", ""))) {
            return element
          }
        })
      }
      setFilterData([...newFilterData])
    }
  }, [filterMap, searchKeyword])

  const getCheckDriver = (): Driver[] => {
    const driverTel: string[] = Object.entries(checkMap ?? {})
      .filter(([key, value]) => value)
      .map(([key]) => key);
    const newDrivers: Driver[] = drivers.map((element) => {
      if (driverTel.includes(element.tel)) {
        return { ...element, status: DriverCarStatus.Ready }
      }
      return { ...element, status: DriverCarStatus.NotReady }
    })
    dispatch(setDriver(newDrivers))
    return newDrivers
  }

  const updateStatus = async () => {
    try {
      const body: { status: DriverCarStatus, available: boolean, tel: string }[] = getCheckDriver().map((element) => {
        return {
          status: element.status,
          available: element.available,
          tel: element.tel
        }
      })
      await apiClient.put("/metadata/driver", body)
    } catch (err) {
      console.error(err)
    }
  }

  return <>
    <div className="bg-primary-second p-5 gap-5 flex flex-col rounded-2xl ">
      <p>เลือกพนักงานขับรถที่พร้อมทำงาน</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจากชื่อ, หรือเบอร์โทรศัพท์ เช่น สมชาย ใจดี, 081-412-8742"
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
            // console.log(checkMap)
            updateStatus()
          }}
          className="bg-background border-1 border-neutral rounded-xl px-5 py-3 cursor-pointer hover:scale-95 transition-all">ยืนยันสถานะพนักงานขับรถที่เลือก</button>
      </div>
      <Table
        haveCheck={true}
        columnName={["ชื่อ", "สถานะ", "เบอร์โทร", "หมายเหตุ", ""]}
        checkMap={checkMap}
        setCheckMap={(newCheckMap: { [id: string]: boolean }) => {
          setCheckMap({ ...newCheckMap })
        }}
        idData={
          filterData.map((element) => {
            return element.tel
          })
        }
      >
        {filterData.map((element, index) => {
          if (element.available) {
            return (
              <tr className="hover:bg-gray-50 border-t border-gray-300" key={index}>
                <td className="px-4 py-4 text-center">
                  <CheckBox disable={element.status == DriverCarStatus.InProgress} iconSize={18}
                    check={checkMap == undefined ? false : checkMap[element.tel]}
                    setCheck={() => {
                      if (checkMap != undefined) {
                        let newCheckMap: { [id: string]: boolean } = checkMap
                        newCheckMap[element.tel] = !checkMap[element.tel]
                        setCheckMap({ ...newCheckMap })
                      }
                    }} /></td>
                <td className="px-4 py-4 text-left w-[20%]">{element.name}</td>
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
                <td className="px-4 py-4 text-left">{element.tel}</td>
                <UpdateNoteColumn id={element.tel} note={element.note ?? "-"} type="driver" />
              </tr>
            )
          }
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