"use client"
import { Car, Driver, DriverCarStatus } from "@/src/types/CarDriver";
import { CheckIcon, CloseIcon, PeopleIcon, UploadIcon } from "../icon/Icon";
import TabBar from "./TabBar";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import UploadMetadataPopup from "./UploadMetadataPopup";
import { useState } from "react";
import clsx from "clsx";
import { Destination } from "@/src/types/Destination";

interface CarDriverManagementHeaderProps {
  currentTab: number
}
export default function CarDriverManagementHeader({
  currentTab,
}: CarDriverManagementHeaderProps) {
  const [uploadMetadataPopup, setUploadMetadataPopup] = useState(false)
  const [successDialog, setSuccessDialog] = useState(false)
  const [errorDialog, setErrorDialog] = useState(false)
  const [error, setError] = useState("")
  const cars = useSelector((state: RootState) => state.car.list)
  const drivers = useSelector((state: RootState) => state.driver.list)
  const destinations = useSelector((state: RootState) => state.destination.list)

  const filterReadyForWork = (data: Car[] | Driver[]) => {
    const newData = data.filter((element) => {
      if (element.status === DriverCarStatus.Ready && element.available === true) {
        return element
      }
    })
    return newData
  }

  const filterForAvailable = (data: Car[] | Driver[] | Destination[]) => {
    const newData = data.filter((element) => {
      if (element.available === true) {
        return element
      }
    })
    return newData
  }

  return <>
    <div className="flex flex-col gap-10">
      <div className={clsx("transition-all fixed bg-white right-5 bottom-5 flex gap-3 items-center p-3 rounded-xl shadow-xl z-50", {
        "translate-y-28": !errorDialog,
        "translate-y-0": errorDialog,
      })}>
        <div className="rounded-full bg-error w-fit p-3">
          <CloseIcon size={16} className="stroke-white stroke-3" />
        </div>
        <p>{error}</p>
      </div>
      <div className={clsx("transition-all fixed bg-white right-5 bottom-5 flex gap-3 items-center p-3 rounded-xl shadow-xl z-50", {
        "translate-y-28": !successDialog,
        "translate-y-0": successDialog
      })}>
        <div className="rounded-full bg-success w-fit p-3">
          <CheckIcon size={20} className="stroke-white" />
        </div>
        <p>นำเข้าข้อมูลสำเร็จ</p>
      </div>
      <UploadMetadataPopup isPopupOpen={uploadMetadataPopup}
        closePopup={() => {
          setUploadMetadataPopup(false)
        }}
        setErrorDialog={(bool) => {
          setErrorDialog(bool)
        }}
        setSuccessDialog={(bool) => {
          setSuccessDialog(bool)
        }}
        setError={(text) => {
          setError(text)
        }}
      />
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
            <p className="">จำนวนรถขนส่งทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{filterForAvailable(cars).length}</p>
          </div>
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนพนักงานขับรถทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{filterForAvailable(drivers).length}</p>
          </div>
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนสถานที่จัดส่งปลายทางทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{filterForAvailable(destinations).length}</p>
          </div>
        </div>
        :
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนรถขนส่งพร้อมใช้งานทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{filterReadyForWork(cars).length}</p>
          </div>
          <div className="flex flex-col items-center border-1 border-neutral rounded-xl px-20 py-5 gap-3">
            <p className="">จำนวนพนักงานขับรถพร้อมทำงานทั้งหมด</p>
            <p className="text-primary text-4xl font-bold">{filterReadyForWork(drivers).length}</p>
          </div>
        </div>
      }
    </div>
  </>
}