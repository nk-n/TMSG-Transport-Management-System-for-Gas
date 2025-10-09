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
import { setCars } from "@/src/feature/car/carSlice";

export default function CarSectionMetadata() {
  const cars = useSelector((state: RootState) => state.car.list)
  const dispatch = useDispatch<AppDispatch>()
  const [filterData, setFilterData] = useState<Car[]>([])

  // เก็บ state ของ checkbox แต่ละ Driver Card
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

  // จัดการเรื่อง การเลือก filter ของ user และการ search ของ user
  useEffect(() => {
    if (cars.length != 0) {
      let newFilterData = cars
      if (searchKeyword.trim() != "") {
        newFilterData = newFilterData.filter((element) => {
          if (element.id.trim().includes(searchKeyword) || element.weight.replaceAll(" ", "").includes(searchKeyword.replaceAll(" ", "")) || element.license.trim().includes(searchKeyword) || element.type.trim().includes(searchKeyword)) {
            return element
          }
        })
      }
      setFilterData([...newFilterData])
    }
  }, [searchKeyword])

  return <>
    <div className="bg-primary-second p-5 gap-5 flex flex-col rounded-2xl ">
      <p>ข้อมูลรถขนส่ง</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจากเบอร์รถ, ทะเบียนรถ, น้ำหนัก, ประเภทรถ "
          controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
        <button
          onClick={() => {
          }}
          className="bg-background border-1 border-neutral rounded-xl px-5 py-3 cursor-pointer hover:scale-95 transition-all">ลบรถขนส่งที่เลือก</button>
      </div>
      <Table
        haveCheck={true}
        columnName={["เบอร์รถ", "ทะเบียนรถ", "น้ำหนัก", "ประเภทรถ"]}
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
                <CheckBox disable={false} iconSize={18}
                  check={checkMap == undefined ? false : checkMap[element.id]}
                  setCheck={() => {
                    if (checkMap != undefined) {
                      let newCheckMap: { [id: string]: boolean } = checkMap
                      newCheckMap[element.id] = !checkMap[element.id]
                      setCheckMap({ ...newCheckMap })
                    }
                  }} /></td>
              <td className="px-4 py-4 text-left w-[20%]">{element.id}</td>
              <td className="px-4 py-4 text-left">{element.license}</td>
              <td className="px-4 py-4 text-left w-[20%]">{element.weight}</td>
              <td className="px-4 py-4 text-left">{element.type}</td>
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