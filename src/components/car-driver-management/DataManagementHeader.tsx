"use client"
import { Car, Driver, DriverCarStatus } from "@/src/types/CarDriver";
import { PeopleIcon, UploadIcon } from "../icon/Icon";
import TabBar from "./TabBar";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import UploadMetadataPopup from "./UploadMetadataPopup";
import { useState } from "react";

interface CarDriverManagementHeaderProps {
  currentTab: number
  driverData: Driver[] | null
  destinationData: Destination[] | null
}
export default function CarDriverManagementHeader({
  currentTab,
  driverData,
  destinationData }: CarDriverManagementHeaderProps) {
  const [uploadMetadataPopup, setUploadMetadataPopup] = useState(false)

  const carData = useSelector((state: RootState) => state.car.list)
  return <>
    <UploadMetadataPopup isPopupOpen={uploadMetadataPopup} closePopup={() => {
      setUploadMetadataPopup(false)
    }} />
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center gap-2">
            <PeopleIcon size={24} className="  fill-foreground" />
            <p className="font-bold text-xl">จัดการคนขับและรถขนส่ง</p>
          </div>
          <p className="text-neutral">ยืนยันสถานะพร้อมใช้งานของคนขับรถและรถ</p>
        </div>
        <button className="h-fit transition-all border-1 border-neutral rounded-xl flex items-center py-3 px-5 gap-2 hover:scale-95 stroke-foreground cursor-pointer " onClick={() => {
          setUploadMetadataPopup(true)
        }}>
          <UploadIcon size={24} className="" />
          <p className="text-sm">นำเข้าข้อมูล Metadata</p>
        </button>
      </div>
      {currentTab == 0 ?
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนพนักงานขับรถทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{driverData == null ? 0 : driverData.length}</p>
          </div>
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนรถขนส่งทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{carData == null ? 0 : carData.length}</p>
          </div>
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนสถานที่จัดส่งปลายทางทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{destinationData == null ? 0 : destinationData.length}</p>
          </div>
        </div>
        :
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนพนักงานขับรถพร้อมทำงานทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{driverData == null ? 0 : driverData.filter((element) => {
              if (element.status == DriverCarStatus.Ready) {
                return element
              }
            }).length}</p>
          </div>
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนรถขนส่งพร้อมใช้งานทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{carData == null ? 0 : carData.filter((element) => {
              if (element.status == DriverCarStatus.Ready) {
                return element
              }
            }).length}</p>
          </div>
        </div>
      }
    </div>
  </>
}