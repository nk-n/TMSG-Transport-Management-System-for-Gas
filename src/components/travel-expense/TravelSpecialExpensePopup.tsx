import clsx from "clsx"
import { BuildingIcon, CloseIcon, LocationIcon } from "../icon/Icon"
import InputBox from "../utils/InputBox"
import { useEffect, useState } from "react"
import { SpecialTrip, Trip } from "@/src/types/Trip"
import { apiClient } from "@/src/services/apiClient"
import { Order } from "@/src/types/Order"
import { useToast } from "../utils/ToastContext"

interface TravelSpecialExpensePopup {
  isPopupOpen: boolean
  closePopup: () => void
  specialTrip: SpecialTrip[]
  fetchSpecialTrip: () => void
  trip: Trip
  distance: number
}

export default function TravelSpecialExpensePopup({ isPopupOpen, closePopup, specialTrip, trip, fetchSpecialTrip, distance }: TravelSpecialExpensePopup) {
  // const [distance, setDistance] = useState<string>("")
  const [addTravelSpecialExpensePopup, setAddTravelSpecialExpensePopup] = useState(false)
  const [descTravelSpecialExpense, setDescTravelSpecialExpense] = useState("")
  const [costTravelSpecialExpense, setCostTravelSpecialExpense] = useState("")
  const { showToast } = useToast()

  const clearTextField = () => {
    setDescTravelSpecialExpense("")
    setCostTravelSpecialExpense("")
  }

  const totalTrip = (): number => {
    let total: number = trip.money
    specialTrip.forEach((element) => {
      total += element.money
    })
    return total
  }

  // useEffect(() => {
  //   setDistance(order.distance)
  // }, [])

  const addSpecialTrip = async () => {
    const cost: number = Number(costTravelSpecialExpense)
    if (cost < 0 || isNaN(cost)) {
      showToast("ไม่สามารถกำหนดค่าเที่ยวพิเศษเป็นเลขติดลบหรือค่าที่ไม่ใช่ตัวเลขได้", "error")
      return
    }
    const res = await apiClient.post("/trip/special-trip", {
      trip_id: trip.trip_id,
      reason: descTravelSpecialExpense,
      money: Number(costTravelSpecialExpense),
    })
    fetchSpecialTrip()
    console.log(res)
  }

  const deleteSpecialTrip = async (id: string) => {
    const res = await apiClient.delete(`/trip/special-trip/${id}`)
    fetchSpecialTrip()
    console.log(res)
  }

  return <>
    <div className={clsx("fixed bg-foreground/25 inset-0 flex justify-center items-center z-10 transition-all", {
      "opacity-0 pointer-events-none": !isPopupOpen,
      "opacity-100 ": isPopupOpen
    })}>
      <div className={clsx("transition-all bg-white w-full max-w-[500px] rounded-xl p-5 flex flex-col items-start gap-4 max-h-[700px] overflow-y-auto scrollbar-hide", {
        "scale-90": !isPopupOpen
      })}>
        <div className="w-full flex justify-end">
          <button className=" w-fit" onClick={() => {
            closePopup()
            setAddTravelSpecialExpensePopup(false)
          }}>
            <CloseIcon size={16} className="stroke-foreground cursor-pointer hover:scale-95 transition-all" />
          </button>
        </div>
        <p className="text-2xl w-full text-center font-bold">คำนวณค่าเที่ยว</p>
        <div className="border-1 border-success bg-success-second flex flex-col justify-center items-center rounded-xl p-5 gap-2 w-full">
          <p className="text-success text-lg">ค่าเที่ยวรวม</p>
          <p className="text-5xl text-success font-bold">฿{totalTrip().toFixed(2)}</p>
        </div>
        <div className="pb-6 border-b-1 border-neutral w-full gap-3 flex flex-col">
          <p className="w-full text-start">ระยะทาง (กิโลเมตร)</p>
          <p className="border border-neutral rounded-xl py-3 px-3">{distance}</p>
          {/* <InputBox placeholder="ระยะทาง" controller={{
            value: distance, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setDistance(e.target.value)
            }
          }} /> */}
        </div>
        <div className="border-b-1 border-b-neutral pb-6 w-full gap-4 flex flex-col">
          <p>รายละเอียดค่าเที่ยว</p>
          {
            specialTrip.map((element) => {
              return (
                <div className="flex justify-between w-full border-1 border-inprogress rounded-xl p-3 bg-inprogress-second" key={element.special_trip_id}>
                  <div className="flex gap-3 items-center">
                    <p>{element.reason}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-inprogress">฿{element.money}</p>
                    <button className="cursor-pointer" onClick={() => {
                      deleteSpecialTrip(element.special_trip_id)
                    }}>
                      <CloseIcon size={15} className="stroke-foreground " />
                    </button>
                  </div>
                </div>
              )
            })
          }
          <button className={clsx("flex border-1 border-neutral border-dashed w-full p-3 rounded-xl justify-center items-center gap-3 cursor-pointer hover:scale-95 transition-all", {
            "hidden": addTravelSpecialExpensePopup
          })} onClick={() => {
            setAddTravelSpecialExpensePopup(true)
          }}>

            <CloseIcon size={10} className="stroke-foreground rotate-45" />
            <p>เพิ่มรายการค่าเที่ยว</p>
          </button>
          <div className={clsx("transition-all flex-col flex gap-5  rounded-xl bg-neutral-second p-3", {
            "hidden": !addTravelSpecialExpensePopup
          })}>
            <InputBox placeholder="ชื่อรายการ เช่น ค่าผ่านทาง, ค่าน้ำมัน" controller={{
              value: descTravelSpecialExpense, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setDescTravelSpecialExpense(e.target.value)
              }
            }} />
            <div className="flex gap-3">
              <InputBox placeholder="จำนวนเงิน" controller={{
                value: costTravelSpecialExpense, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setCostTravelSpecialExpense(e.target.value)
                }
              }} />
              <button className="bg-success p-3 text-white rounded-xl button-effect" onClick={() => {
                setAddTravelSpecialExpensePopup(false)
                addSpecialTrip()
                clearTextField()
              }}>เพิ่ม</button>
              <button className="button-effect" onClick={() => {
                setAddTravelSpecialExpensePopup(false)
                clearTextField()
              }}>ยกเลิก</button>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3">
          <button className="flex-1 bg-success text-white p-3 rounded-xl button-effect" onClick={() => {
            closePopup()
            setAddTravelSpecialExpensePopup(false)
          }}>ยืนยัน</button>
        </div>
      </div>
    </div>
  </>
}