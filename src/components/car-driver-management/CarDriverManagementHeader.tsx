import { Car, Driver } from "@/src/types/CarDriverManagement";
import { PeopleIcon, UploadIcon } from "../icon/Icon";

export default function CarDriverManagementHeader({ carRawData, driverRawData }: { carRawData: Car[], driverRawData: Driver[] }) {
  return <>
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center gap-2">
            <PeopleIcon size={24} />
            <p className="font-bold text-xl">จัดการคนขับและรถขนส่ง</p>
          </div>
          <p className="text-[var(--neutral-color)]">ยืนยันสถานะพร้อมใช้งานของคนขับรถและรถ</p>
        </div>
        <button className="h-fit transition-all border-1 border-[var(--neutral-color)] rounded-xl flex items-center py-3 px-5 gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:stroke-white stroke-black cursor-pointer ">
          <UploadIcon size={24} className="" />
          <p className="text-sm">นำเข้าข้อมูลรถและพนักงานขับรถ</p>
        </button>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-center border-1 border-[var(--neutral-color)] rounded-xl px-20 py-5 gap-3">
          <p className="">จำนวนคนขับรถพร้อมทั้งหมด</p>
          <p className="text-[var(--primary-color)] text-4xl font-bold">{driverRawData.length}</p>
        </div>
        <div className="flex flex-col items-center border-1 border-[var(--neutral-color)] rounded-xl px-20 py-5 gap-3">
          <p className="">จำนวนรถพร้อมทั้งหมด</p>
          <p className="text-[var(--primary-color)] text-4xl font-bold">{carRawData.length}</p>
        </div>
      </div>
    </div>
  </>
}