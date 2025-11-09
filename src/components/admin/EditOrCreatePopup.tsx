"use client"
import { useState } from "react";
import { CloseIcon, } from "../icon/Icon";
import CheckBox from "../utils/CheckBox";
import InputBox from "../utils/InputBox";
import clsx from "clsx";
import { apiClient } from "@/src/services/apiClient";
import FormField from "../utils/FormField";
import { useToast } from "../utils/ToastContext";
import { DeliveryStaff } from "@/src/types/DeliveryStaff";

interface EditOrCreatePopupProps {
  isOpen: boolean
  closePopup: () => void
  fetchData: () => void
  edit: boolean
  deliveryStaff?: DeliveryStaff | null
}

interface Field {
  name: string,
  tel: string,
  id: string,
  password: string,
  confirmPassword: string
}

export default function EditOrCreatePopup({ isOpen, closePopup, fetchData, edit, deliveryStaff }: EditOrCreatePopupProps) {
  const [field, setField] = useState<Field>({ name: deliveryStaff ? deliveryStaff.name : "", tel: "", id: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const { showToast } = useToast()

  const clearInput = () => {
    setField({ name: "", tel: "", id: "", password: "", confirmPassword: "" })
    setError("")
  }

  const createDeliveryStaff = async () => {
    try {
      if (!edit) {
        if (field.id.trim() === "") {
          setError("กรุณากรอกข้อมูลรหัสพนักงานไม่สามารถปล่อยเป็นค่าว่างได้")
          return
        } else if (field.name.trim() === "") {
          setError("กรุณากรอกข้อมูลชื่อไม่สามารถปล่อยเป็นค่าว่างได้")
          return
        } else if (field.tel.trim() === "") {
          setError("กรุณากรอกข้อมูลเบอร์โทรไม่สามารถปล่อยเป็นค่าว่างได้")
          return
        } else if (field.password.trim() === "") {
          setError("กรุณากรอกข้อมูลรหัสผ่านไม่สามารถปล่อยเป็นค่าว่างได้")
          return
        } else if (field.confirmPassword.trim() !== field.password.trim()) {
          setError("ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน")
          return
        }
        setError("")
        await apiClient.post("/auth/new-user", {
          username: field.name,
          password: field.password,
          phone: field.tel,
          name: field.name
        })
        fetchData()
        showToast("สร้างบัญชีพนักงานจัดส่งสำเร็จ", "success")
      } else {
        if (field.confirmPassword.trim() !== field.password.trim()) {
          setError("ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน")
          return
        }
        console.log(
          {
            id: deliveryStaff?.id,
            name: field.name,
            phone: field.tel,
            password: field.password
          }
        )
        await apiClient.put("/users/edit",
          {
            id: deliveryStaff?.id,
            name: field.name,
            phone: field.tel,
            password: field.password
          }
        )
        fetchData()
        showToast("แก้ไขบัญชีพนักงานจัดส่งสำเร็จ", "success")
      }
      clearInput()
      closePopup()
    } catch (e: any) {
      showToast("บันทึกพนักงานจัดส่งไม่สำเร็จ", "error")
    }
  }

  return <>
    <div className={clsx("bg-foreground/35 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 transition-all", {
      "opacity-0 pointer-events-none": !isOpen
    })}>
      <div className={clsx(" transition-all bg-white w-full max-w-[500px] rounded-xl flex flex-col p-6 gap-3 relative", {
        "scale-90": !isOpen
      })}>
        <button className="cursor-pointer" onClick={() => {
          clearInput()
          closePopup()
        }}>
          <CloseIcon size={20} className="stroke-foreground absolute right-5 top-5" />
        </button>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-primary font-bold text-3xl">{edit ? "แก้ไขข้อมูล" : "สร้างบัญชีพนักงานจัดส่ง"}</p>
          <p className="text-primary">
            {edit ? "***ไม่จำเป็นต้องกรอกทข้อมูลให้ครบทุกช่อง***" : ""}
          </p>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          {edit ?
            <></>
            :
            <FormField
              label="รหัสพนักงาน"
              placeholder="รหัสพนักงาน"
              onChange={(data: string) => {
                setField({ ...field, id: data })
              }}
              password={false}
              value={field.id}
            />
          }
          <FormField
            label="ชื่อ-สกุล"
            placeholder="ชื่อ-สกุล"
            onChange={(data: string) => {
              setField({ ...field, name: data })
            }}
            password={false}
            value={field.name}
          />
          <FormField
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            onChange={(data: string) => {
              setField({ ...field, tel: data })
            }}
            password={false}
            value={field.tel}
          />
          <FormField
            label="รหัสผ่าน"
            placeholder="รหัสผ่าน"
            onChange={(data: string) => {
              setField({ ...field, password: data })
            }}
            password={true}
            value={field.password}
          />
          <FormField
            label="ยืนยันรหัสผ่าน"
            placeholder="ยืนยันรหัสผ่าน"
            onChange={(data: string) => {
              setField({ ...field, confirmPassword: data })
            }}
            password={true}
            value={field.confirmPassword}
          />
        </div>
        <p className="text-error">{error}</p>
        <button className="cursor-pointer bg-primary rounded-xl py-3 text-white hover:scale-95 transition-transform mt-8"
          onClick={() => {
            createDeliveryStaff()
          }}
        >{edit ? "บันทึกการแก้ไข" : "สร้างบัญชี"}</button>
      </div>
    </div>
  </>
}