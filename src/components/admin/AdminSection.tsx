import { PeopleIcon } from "../icon/Icon"
import DeliveryStaffSection from "./DeliveryStaffSection"

export default function AdminSection() {
  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-2">
          <PeopleIcon size={24} className=" fill-foreground" />
          <p className="font-bold text-xl">จัดการข้อมูลพนักงานจัดส่ง</p>
        </div>
        <p className="text-neutral">เพิ่ม ลบ แก้ไข ข้อมูลพนักงานจัดส่ง</p>
      </div>
      <DeliveryStaffSection />
    </div>
  </>
}