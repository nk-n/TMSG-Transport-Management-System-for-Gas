"use client"
import { useEffect, useState } from "react"
import { PenIcon, SearchIcon } from "../icon/Icon"
import InputBox from "../utils/InputBox"
import Table from "../utils/Table"
import { DeliveryStaff, toDeliveryStaff } from "@/src/types/DeliveryStaff"
import CheckBox from "../utils/CheckBox"
import EditPopup from "./EditPopup"
import { apiClient } from "@/src/services/apiClient"
import { RowData } from "../car-driver-management/UploadMetadataPopup"
import { useToast } from "../utils/ToastContext"
import EditOrCreatePopup from "./EditOrCreatePopup"

export default function DeliveryStaffSection() {
  const { showToast } = useToast()
  // const drivers = useSelector((state: RootState) => state.driver.list)
  const [deliveryStaff, setDeliveryStaff] = useState<DeliveryStaff[]>([])
  const [filterData, setFilterData] = useState<DeliveryStaff[]>([])
  const [editPopup, setEditPopup] = useState(false)
  const [createPopup, setCreatePopup] = useState(false)
  const [editData, setEditData] = useState<DeliveryStaff | null>(null)

  // เก็บ state ของ checkbox แต่ละ Driver Card
  const [checkMap, setCheckMap] = useState<{ [id: string]: boolean }>()

  // เก็บ state search keyword
  const [searchKeyword, setSearchKeyword] = useState("")

  const deleteDeliveryStaff = async () => {
    try {
      const selectedIds: string[] = Object.keys(checkMap ?? {}).filter(id => checkMap?.[id])
      if (selectedIds.length === 0) return
      for (const element of selectedIds) {
        await apiClient.put("/users/delete", {
          id: element
        })
      }
      fetchDeliveryStaff()
      showToast("ลบบัญชีพนักงานจัดส่งสำเร็จ", "success")
    } catch (e: any) {
      showToast("ลบบัญชีพนักงานจัดส่งไม่สำเร็จ", "error")
    }
  }

  const fetchDeliveryStaff = async () => {
    const res = await apiClient.get("/users/all")
    const newData = res.data.data.map((element: RowData) => {
      return toDeliveryStaff(element)
    })
    console.log(newData)
    setDeliveryStaff(newData)
    setDeliveryStaff([...newData])
    setFilterData([...newData])
    const newCheckMap: { [id: string]: boolean } = {}
    newData.forEach((element: DeliveryStaff) => {
      newCheckMap[element.id] = false
    })
    setCheckMap({ ...newCheckMap })
  }

  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }



  useEffect(() => {
    const initData = () => {
      fetchDeliveryStaff()
    }
    initData()
  }, [])
  // อย่าลืมเอา data มาใส่

  // จัดการเรื่อง การเลือก filter ของ user และการ search ของ user
  useEffect(() => {
    if (deliveryStaff.length != 0) {
      let newFilterData = deliveryStaff
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
      <EditPopup isOpen={editPopup} closePopup={() => {
        setEditPopup(false)
      }} />
      <EditOrCreatePopup
        isOpen={createPopup}
        closePopup={() => {
          setCreatePopup(false)
        }}
        fetchData={fetchDeliveryStaff}
        edit={false}
      />

      <EditOrCreatePopup
        isOpen={editPopup}
        closePopup={() => {
          setEditPopup(false)
        }}
        fetchData={fetchDeliveryStaff}
        edit={true}
        deliveryStaff={editData}
      />
      <p>ข้อมูลพนักงานจัดส่ง</p>
      <div className="flex gap-5">
        <InputBox
          leading={<SearchIcon size={24} />}
          placeholder="ค้นหาจากชื่อ, หรือเบอร์โทรศัพท์ เช่น สมชาย ใจดี, 081-412-8742"
          controller={{ value: searchKeyword, handdleChange: handdleSearchKeyword }} />
        <button
          onClick={() => {
            deleteDeliveryStaff()
          }}
          className="bg-error-second border-1 border-error rounded-xl px-5 py-3 cursor-pointer button-effect text-error">ลบพนักงานขับรถที่เลือก</button>
        <button
          onClick={() => {
            setCreatePopup(true)
          }}
          className="bg-primary-second border-1 border-primary rounded-xl px-5 py-3 cursor-pointer button-effect text-primary" >สร้างบัญชีพนักงานจัดส่ง</button>
      </div>
      <Table
        haveCheck={true}
        columnName={["รหัสพนักงาน", "ชื่อ", "เบอร์โทร", ""]}
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
              <td className="px-4 py-4 text-left w-[20%]">{element.name}</td>
              <td className="px-4 py-4 text-left">{element.tel}</td>
              <td className="px-4 py-4 text-left">
                <button className="flex justify-between items-center gap-3 border-1 border-neutral rounded-xl p-2 cursor-pointer button-effect"
                  onClick={() => {
                    setEditData(element)
                    setEditPopup(true)
                  }}>
                  <PenIcon size={20} className="stroke-foreground" />
                  <p>แก้ไข</p>
                </button>
              </td>
            </tr>

          )
        })}
      </Table>
    </div >
  </>
}