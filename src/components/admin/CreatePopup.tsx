"use client"
import { useState } from "react";
import { CloseIcon, } from "../icon/Icon";
import CheckBox from "../utils/CheckBox";
import InputBox from "../utils/InputBox";
import clsx from "clsx";

interface CreatePopupProps {
  isOpen: boolean
  closePopup: () => void
}

export default function CreatePopup({ isOpen, closePopup }: CreatePopupProps) {
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [id, setId] = useState("")
  return <>
    <div className={clsx("bg-foreground/35 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 transition-all", {
      "opacity-0 pointer-events-none": !isOpen
    })}>
      <div className={clsx(" transition-all bg-white w-full max-w-[500px] rounded-xl flex flex-col p-6 gap-3 relative", {
        "scale-90": !isOpen
      })}>
        <button className="cursor-pointer" onClick={() => {
          closePopup()
        }}>
          <CloseIcon size={20} className="stroke-foreground absolute right-5 top-5" />
        </button>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-primary font-bold text-3xl">สร้างบัญชีพนักงานจัดส่ง</p>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div>
            <p className="mb-2">
              รหัสพนักงาน
            </p>
            <InputBox placeholder="รหัสพนักงาน" controller={{
              value: name, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value)
              }
            }} />
          </div>
          <div>
            <p className="mb-2">
              ชื่อ
            </p>
            <InputBox placeholder="ชื่อ-นามสกุล" controller={{
              value: name, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value)
              }
            }} />
          </div>
          <div>
            <p className="mb-2">
              เบอร์โทร
            </p>
            <InputBox placeholder="เบอร์โทร" controller={{
              value: tel, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setTel(e.target.value)
              }
            }} />
          </div>
        </div>
        <button className="cursor-pointer bg-primary rounded-xl py-3 text-white hover:scale-95 transition-transform mt-8">สร้างบัญชี</button>
      </div>
    </div>
  </>
}