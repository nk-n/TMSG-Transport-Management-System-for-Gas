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
import { removeDriver, setDriver } from "@/src/feature/driver/driverSlice";
import { apiClient } from "@/src/services/apiClient";
import ConfirmmationPopup from "../../utils/ConfirmationPopup";

export default function DriverSectionMetadata() {
  const drivers = useSelector((state: RootState) => state.driver.list)
  const [filterData, setFilterData] = useState<Driver[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const [confirmPopupIsOpen, setConfirmPopupIsOpen] = useState(false)

  // เก็บ state ของ checkbox แต่ละ Driver Card
  const [checkMap, setCheckMap] = useState<{ [id: string]: boolean }>()

  const deleteTarget = () => {
    const idSelect: string[] = Object.entries(checkMap ?? {}).filter((value, key) => {
      if (value[1]) {
        return value
      }
    }).map((element) => {
      return element[0]
    })

    for (const driver of drivers) {
      if (idSelect.includes(driver.tel)) {
        dispatch(removeDriver(driver.tel))
      }
    }

    for (const id of idSelect) {
      apiClient.put(`/metadata/driver/delete/${id}`)
    }
  }

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

  // จัดการเรื่อง การเลือก filter ของ user และการ search ของ user
  useEffect(() => {
    if (drivers.length != 0) {
      let newFilterData = drivers
      if (searchKeyword.trim() != "") {
        newFilterData = newFilterData.filter((element) => {
          if (element.name.includes(searchKeyword) || element.tel.replaceAll("-", "").includes(searchKeyword.replaceAll("-", ""))) {
            return element
          }
        })
      }
      setFilterData([...newFilterData])
    }
  }, [searchKeyword])

  return <>
    <div className="bg-primary-second p-5 gap-5 flex flex-col rounded-2xl ">
      <ConfirmmationPopup
        isPopupOpen={confirmPopupIsOpen}
        closePopup={() => {
          setConfirmPopupIsOpen(false)
        }}
        deleteData={() => {
          deleteTarget()
        }}
      />
      <p>ข้อมูลพนักงานขับรถ</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจากชื่อ, หรือเบอร์โทรศัพท์ เช่น สมชาย ใจดี, 081-412-8742"
          controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
        <button
          onClick={() => {
            setConfirmPopupIsOpen(true)
          }}
          className="bg-background border-1 border-neutral rounded-xl px-5 py-3 cursor-pointer button-effect">ลบพนักงานขับรถที่เลือก</button>
      </div>
      <Table
        haveCheck={false}
        columnName={["", "ชื่อ", "เบอร์โทร"]}
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
                  <CheckBox disable={false} iconSize={18}
                    check={checkMap == undefined ? false : checkMap[element.tel]}
                    setCheck={() => {
                      if (checkMap != undefined) {
                        let newCheckMap: { [id: string]: boolean } = checkMap
                        newCheckMap[element.tel] = !checkMap[element.tel]
                        setCheckMap({ ...newCheckMap })
                      }
                    }} /></td>
                <td className="px-4 py-4 text-left w-[20%]">{element.name}</td>
                <td className="px-4 py-4 text-left">{element.tel}</td>
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