"use client"
import { useEffect, useRef, useState } from "react";
import { EnvelopeIcon, EyeIcon, LockIcon } from "../icon/Icon";
import CheckBox from "../utils/CheckBox";
import InputBox from "../utils/InputBox";
import { apiClient } from "@/src/services/apiClient";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { setJWT } from "@/src/feature/jwt/jwtSlice";
import { create, getCookies } from "@/src/middleware/cookies";
import { useToast } from "../utils/ToastContext";
import LoadingScene from "../utils/LoadingScene";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default function LoginPopup() {
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
  }, [])
  const handdleSignIn = async () => {
    try {
      setLoading(true)
      const response = await apiClient.post(`/auth/signin`,
        {
          "username": employeeId,
          "password": password
        }
      )

      await create(response.data.data.token, "jwt")
      await create(response.data.data.role, "role")
      localStorage.setItem("username", response.data.data.name)
      localStorage.setItem("role", response.data.data.role)
      dispatch(setJWT(response.data.token))
      if (response.data.data.role === "[ROLE_ADMIN]") {
        router.replace("/admin")
      } else {
        router.replace("/home")
      }
      showToast("เข้าสู่ระบบสำเร็จ", "success")
    } catch (e: any) {
      console.log(e.response.data.message)
      showToast("เข้าสู่ระบบไม่สำเร็จ: " + e.response.data.message, "error")
    } finally {
      setLoading(false)
    }
    // if (response.data.data !== "invalid credentials") {
    //   router.replace("/home")
    // }
  }

  return <>
    <LoadingScene loading={loading} />
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
              <InputBox
                leading={<LockIcon size={24} />}
                placeholder="รหัสพนักงาน" controller={{
                  value: password, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                  }
                }}
                password={true}
                trailing={
                  <EyeIcon size={20} />
                }
              />
            </div>
            {/* <div className="flex items-center gap-3 mt-3">
              <CheckBox iconSize={15} disable={false} check={check} setCheck={() => {
                setCheck(!check)
              }} />
              <p>จดจำการเข้าสู่ระบบ</p>
            </div> */}
          </div>
        </div>
        <button className=" bg-primary rounded-xl py-3 text-white  mt-8 button-effect"
          onClick={() => {
            handdleSignIn()
          }}
        >
          เข้าสู่ระบบ</button>
      </div>
    </div>
  </>
}