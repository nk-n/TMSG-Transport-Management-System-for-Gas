"use client"
import CarDriverManagementHeader from "./DataManagementHeader"
import { driverRawData } from "@/src/constants/DriverSampleData"
import { carRawData } from "@/src/constants/CarSampleData"
import React, { JSX, ReactNode, useEffect, useState } from "react"
import TabBar from "./TabBar"
import { Car, Driver } from "@/src/types/CarDriver"
import { destinationRawData } from "@/src/constants/DestinationSampleData"
import MetaDataManagementSection from "./MetaDataManagementSection"
import CarDriverManagementSection from "./CarDriverManagementSection"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/src/store/store"
import { setCars } from "@/src/feature/car/carSlice"
import { setDriver } from "@/src/feature/driver/driverSlice"
import UploadDeliveryPlan from "../upload-delivery-plan/UploadDeliveryPlan"
import UploadMetadataPopup from "./UploadMetadataPopup"

export default function CarDriverManagement() {
  const [uploadMetadataPopup, setUploadMetadataPopup] = useState(false)

  const [currentTab, setCurrentTab] = useState(0)

  const cars = useSelector((state: RootState) => state.car.list)
  const dispatch = useDispatch<AppDispatch>()

  const [driverData, setDriverData] = useState<Driver[]>([])
  const [destinationData, setDestinationData] = useState<Destination[]>([])

  let menuList: { content: JSX.Element }[] = [
    { content: <MetaDataManagementSection carData={cars} driverData={driverData} destinationData={destinationData} /> },
    { content: <CarDriverManagementSection /> },
  ]

  const fetchCarAndDriver = () => {
    dispatch(setCars(carRawData))
    dispatch(setDriver(driverRawData))
  }

  const fetchCarAndDriverAndDestination = () => {
    fetchCarAndDriver()
    setDestinationData([...destinationRawData])
  }

  useEffect(() => {
    if (currentTab == 0) {
      fetchCarAndDriver()
    } else if (currentTab == 1) {
      fetchCarAndDriverAndDestination()
    }
  }, [currentTab])


  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <CarDriverManagementHeader
        currentTab={currentTab}
        driverData={driverData}
        destinationData={destinationData} />
      <TabBar currentTab={currentTab} setCurrentTab={(value: number) => {
        setCurrentTab(value)
      }} elementTab={[
        <p>จัดการข้อมูล Metadata</p>,
        <p>ยืนยันสถานะรถและพนักงานขับรถพร้อมใช้งาน</p>
      ]} />
      {menuList[currentTab].content}
    </div>
  </>
}