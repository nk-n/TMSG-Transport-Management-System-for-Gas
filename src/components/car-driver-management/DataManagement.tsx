"use client"
import CarDriverManagementHeader from "./DataManagementHeader"
import React, { JSX, ReactNode, useEffect, useState } from "react"
import TabBar from "./TabBar"
import { Car, Driver, DriverCarStatus } from "@/src/types/CarDriver"
import MetaDataManagementSection from "./MetaDataManagementSection"
import CarDriverManagementSection from "./CarDriverManagementSection"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/src/store/store"
import { setCars } from "@/src/feature/car/carSlice"
import { setDriver } from "@/src/feature/driver/driverSlice"
import { Destination } from "@/src/types/Destination"
import { apiClient } from "@/src/services/apiClient"
import { setDestinations } from "@/src/feature/destination/destinationSlice";

export default function CarDriverManagement() {
  const [totalAmount, setTotalAmount] = useState<{ car: number, driver: number, destination: number }>({ car: 0, driver: 0, destination: 0 })
  const [totalReadyForWork, setTotalReadyForWork] = useState<{ car: number, driver: number }>({ car: 0, driver: 0 })

  const [currentTab, setCurrentTab] = useState(0)

  const dispatch = useDispatch<AppDispatch>()

  const fetchCarData = async () => {
    const res = await apiClient.get("/metadata/cars")
    const cars: Car[] = res.data.data.map((element: any) => {
      return {
        license: element["license"],
        type: element["type"],
        weight: element["weight"],
        id: element["id"],
        status: element["status"],
        note: element["note"],
        available: element["available"],
      }
    })
    dispatch(setCars(cars))
  }

  const fetchDriverData = async () => {
    const res = await apiClient.get("/metadata/drivers")
    const drivers: Driver[] = res.data.data.map((element: any) => {
      return {
        tel: element["tel"],
        name: element["name"],
        line_id: element["line_id"],
        note: element["note"],
        available: element["available"],
        status: element["status"],
      }
    })
    dispatch(setDriver(drivers))
  }

  const fetchDestinationData = async () => {
    const res = await apiClient.get("/metadata/destinations")
    const destinations: Destination[] = res.data.data.map((element: any) => {
      return {
        name: element["name"],
        province: element["province"],
        region: element["region"],
        available: element["available"],
        address: element["address"],
        distance: element["distance"],
        timeUse: element["timeUse"],
        route: element["route"],
      }
    })
    dispatch(setDestinations(destinations))
  }

  useEffect(() => {
    fetchCarData()
    fetchDriverData()
    fetchDestinationData()
  }, [])

  let menuList: { content: JSX.Element }[] = [
    { content: <MetaDataManagementSection /> },
    { content: <CarDriverManagementSection /> },
  ]


  useEffect(() => {
  }, [currentTab])


  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <CarDriverManagementHeader
        currentTab={currentTab}
      />
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