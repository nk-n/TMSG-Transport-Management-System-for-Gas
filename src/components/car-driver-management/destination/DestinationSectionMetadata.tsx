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
import { setDestinations } from "@/src/feature/destination/destinationSlice";
import { Destination } from "@/src/types/Destination";

export default function DestinationSectionMetadata() {
  const destinations = useSelector((state: RootState) => state.destination.list)
  const dispatch = useDispatch<AppDispatch>()
  const [filterData, setFilterData] = useState<Destination[]>([])

  const [checkMap, setCheckMap] = useState<{ [address: string]: boolean }>()

  useEffect(() => {
    const initData = () => {
      setFilterData([...destinations])
      const newCheckMap: { [address: string]: boolean } = {}
      destinations.forEach((element) => {
        newCheckMap[element.address] = false
      })
      setCheckMap({ ...newCheckMap })
    }
    initData()
  }, [destinations])



  // เก็บ state search keyword
  const [searchKeyword, setSearchKeyword] = useState("")
  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  // จัดการเรื่อง การเลือก filter ของ user และการ search ของ user
  useEffect(() => {
    if (destinations.length != 0) {
      let newFilterData = destinations
      if (searchKeyword.trim() != "") {
        newFilterData = newFilterData.filter((element) => {
          if (element.name.trim().includes(searchKeyword.trim()) || element.address.replaceAll(" ", "").includes(searchKeyword.replaceAll(" ", "")) || element.city.trim().includes(searchKeyword.trim()) || element.region.trim().includes(searchKeyword.trim())) {
            return element
          }
        })
      }
      setFilterData([...newFilterData])
    }
  }, [searchKeyword])

  return <>
    <div className="bg-primary-second p-5 gap-5 flex flex-col rounded-2xl ">
      <p>ข้อมูลสถานที่จัดส่งปลายทาง</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจากชื่อสถานที่, ที่อยู่, จังหวัด, ภูมิภาค"
          controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
        <button
          onClick={() => {
          }}
          className="bg-background border-1 border-neutral rounded-xl px-5 py-3 cursor-pointer hover:scale-95 transition-all">ลบสถานที่จัดส่งที่เลือก</button>
      </div>
      <Table
        haveCheck={true}
        columnName={["ชื่อสถานที่", "ที่อยู่", "จังหวัด", "ภูมิภาค", "ระยะทาง", "เส้นทาง", "ระยะเวลาที่ใช้เดินทาง"]}
        checkMap={checkMap}
        setCheckMap={(newCheckMap: { [address: string]: boolean }) => {
          setCheckMap({ ...newCheckMap })
        }}
        idData={
          filterData.map((element) => {
            return element.address
          })
        }
      >
        {filterData.map((element, index) => {
          return (
            <tr className="hover:bg-gray-50 border-t border-gray-300" key={index}>
              <td className="px-4 py-4 text-center">
                <CheckBox disable={false} iconSize={18}
                  check={checkMap == undefined ? false : checkMap[element.address]}
                  setCheck={() => {
                    if (checkMap != undefined) {
                      let newCheckMap: { [address: string]: boolean } = checkMap
                      newCheckMap[element.address] = !checkMap[element.address]
                      setCheckMap({ ...newCheckMap })
                    }
                  }} /></td>
              <td className="px-4 py-4 text-left w-[20%]">{element.name}</td>
              <td className="px-4 py-4 text-left">{element.address}</td>
              <td className="px-4 py-4 text-left">{element.city}</td>
              <td className="px-4 py-4 text-left">{element.region}</td>
              <td className="px-4 py-4 text-left">{element.distance}</td>
              <td className="px-4 py-4 text-left">{element.route}</td>
              <td className="px-4 py-4 text-left">{element.timeUsed}</td>
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