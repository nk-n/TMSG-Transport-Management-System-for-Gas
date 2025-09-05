'use client'
import { BaseCarDriver, DriverCarStatus } from "@/src/types/CarDriverManagement"
import CheckBox from "../utils/CheckBox"
import clsx from "clsx"
import InputBox from "../utils/InputBox"
import { useState } from "react"


interface CarDriverCardProps<T extends BaseCarDriver> {
  element: T,
  checkMap: { [id: string]: boolean },
  setCheckMap: (newCheckMap: { [id: string]: boolean }) => void
  children: React.ReactNode
}


export default function CarDriverCard<T extends BaseCarDriver>({ element, checkMap, setCheckMap, children }: CarDriverCardProps<T>) {
  const [reason, setReason] = useState<string>("")
  const [reasonBoxOpen, setReasonBoxOpen] = useState(false)
  return <>
    <div key={element.id} className="flex flex-col bg-[var(--background)] border-1 border-[var(--neutral-color)] rounded-xl p-5 gap-3 justify-center">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <CheckBox
            iconSize={20}
            disable={element.status == DriverCarStatus.InProgress}
            check={checkMap[element.id]}
            setCheck={() => {
              let newCheckMap: { [id: string]: boolean } = checkMap
              newCheckMap[element.id] = !checkMap[element.id]
              setCheckMap({ ...newCheckMap })
            }} />
          <div className="flex flex-col gap-1">
            {children}
          </div>
        </div>
        <div className={clsx(" rounded-full px-3 py-1 ml-2 text-sm", {
          "bg-[var(--success-color)]": element.status == DriverCarStatus.Ready,
          "bg-[var(--error-color)]": element.status == DriverCarStatus.NotReady,
          "bg-[var(--inprogess-color)]": element.status == DriverCarStatus.InProgress,
        })}>
          <p className="text-white">{element.status}</p>
        </div>
      </div>
      {(element.status == DriverCarStatus.NotReady) && !reasonBoxOpen ? (element.reason == undefined || element.reason.trim() == "") && !reasonBoxOpen ?
        <button onClick={() => { setReasonBoxOpen(true) }} className="text-sm border-1 border-[var(--neutral-color)] rounded-lg py-2 cursor-pointer transition-transform hover:scale-95">
          ระบุเหตุผล
        </button>
        :
        <div className="text-[var(--error-color)] flex justify-between items-center bg-[var(--error-second-color)] flex-1 text-sm rounded-lg px-3 py-2">
          <p>เหตุผล: {element.reason}</p>
          <button className="cursor-pointer"
            onClick={() => {
              setReasonBoxOpen(true)
            }}
          >แก้ไข</button>
        </div>
        :
        <div></div>}
      {reasonBoxOpen ?
        <div className="max-h-[50px] flex items-center gap-3">
          <InputBox placeholder="กรอกเหตุผล" controller={{
            value: reason, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setReason(e.target.value)
            }
          }} />
          <button onClick={() => {
            element.reason = reason
            setReasonBoxOpen(false)
          }} className="cursor-pointer text-sm">ตกลง</button>
        </div> : <></>
      }
    </div>
  </>
}