"use client"
import { useState } from "react";
import { EnvelopeIcon, EyeIcon, LockIcon } from "../icon/Icon";
import CheckBox from "../utils/CheckBox";
import InputBox from "../utils/InputBox";

export default function LoginPopup() {
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [check, setCheck] = useState(false)
  return <>
    <div className="bg-foreground/35 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white w-full max-w-[500px] rounded-xl flex flex-col p-6 gap-3">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-primary font-bold text-3xl">เข้าสู่ระบบ</p>
          <p>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div>
            <p className="mb-2">
              รหัสพนักงาน
            </p>
            <InputBox leading={<EnvelopeIcon size={24} />} placeholder="รหัสพนักงาน" controller={{
              value: employeeId, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setEmployeeId(e.target.value)
              }
            }} />
          </div>
          <div>
            <div>
              <p className="mb-2">
                รหัสผ่าน
              </p>
              <InputBox leading={<LockIcon size={24} />} trailing={<EyeIcon size={24} />} placeholder="รหัสพนักงาน" controller={{
                value: password, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value)
                }
              }} />
            </div>
            <div className="flex items-center gap-3 mt-3">
              <CheckBox iconSize={15} disable={false} check={check} setCheck={() => {
                setCheck(!check)
              }} />
              <p>จดจำการเข้าสู่ระบบ</p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer bg-primary rounded-xl py-3 text-white hover:scale-95 transition-transform mt-8">เข้าสู่ระบบ</button>
      </div>
    </div>
  </>
}