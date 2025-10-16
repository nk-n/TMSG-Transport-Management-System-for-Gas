import clsx from "clsx";
import TableReportData from "./TableReportData";
import TableReportTitle from "./TableReportTitle";
import { months, titleCarVolume, titleDeliverVolume, titleDistanceVolume, titleDriverVolume, titleTravelVolume } from "@/src/constants/Report";
import { apiClient } from "@/src/services/apiClient";
import { JSX, useEffect, useState } from "react";
import { Shipping, ShippingEntry, toShipping } from "@/src/types/Report";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import MainTable from "./MainTable";

interface AnnualSection {
  year: number
}
export default function AnnualSection({ year }: AnnualSection) {
  const [shipping, setShipping] = useState<{ delivery: Shipping | null, travel: Shipping | null, distance: Shipping | null, car: Shipping | null, driver: Shipping | null }>({ delivery: null, travel: null, distance: null, car: null, driver: null })

  const fillMonthInYear = (data: ShippingEntry[]): ShippingEntry[] => {
    const newData: ShippingEntry[] = []
    for (let i = 0; i < 12; i++) {
      if (data.length >= 1) {
        const firstMonth: number = data[0].month
        const lastMonth: number = data[data.length - 1].month
        if (i + 1 >= firstMonth && i + 1 <= lastMonth) {
          newData.push(data[i + 1 - firstMonth])
        } else {
          newData.push({
            month: i + 1,
            total: 0
          })
        }
      }
      else {
        newData.push({
          month: i + 1,
          total: 0
        })
      }
    }
    return newData
  }

  const adjustReponse = (data: any): Shipping => {
    const dataShipping: Shipping = toShipping(data)
    dataShipping.shipping8Ton = fillMonthInYear(dataShipping.shipping8Ton)
    dataShipping.shipping10Ton = fillMonthInYear(dataShipping.shipping10Ton)
    dataShipping.shippingTrailer = fillMonthInYear(dataShipping.shippingTrailer)
    return dataShipping
  }

  const fetchShipping = async () => {
    const resDelivery = await apiClient.get(`/report/delivery/${year}`)
    const newDataDelivery: Shipping = adjustReponse(resDelivery.data.data)

    const resTravel = await apiClient.get(`/report/travel/${year}`)
    const newDataTravel: Shipping = adjustReponse(resTravel.data.data)

    const resDistance = await apiClient.get(`/report/distance/${year}`)
    const newDataDistance: Shipping = adjustReponse(resDistance.data.data)

    const resCar = await apiClient.get(`/report/car/${year}`)
    const newDataCar: Shipping = adjustReponse(resCar.data.data)

    const resDriver = await apiClient.get(`/report/car/${year}`)
    const newDataDriver: Shipping = adjustReponse(resDriver.data.data)

    setShipping({ delivery: newDataDelivery, travel: newDataTravel, distance: newDataDistance, car: newDataCar, driver: newDataDriver })
  }

  useEffect(() => {
    fetchShipping()
  }, [year])

  return <>
    <div className="flex flex-col gap-16">
      <MainTable data={shipping.delivery} title={titleDeliverVolume} label="รายงานยอดขน" />
      <MainTable data={shipping.travel} title={titleTravelVolume} label="รายงานจำนวนเที่ยววิ่ง" />
      <MainTable data={shipping.distance} title={titleDistanceVolume} label="รายงานระยะทางวิ่ง" />
      <MainTable data={shipping.car} title={titleCarVolume} label="รายงานจำนวนรถ" />
      <MainTable data={shipping.driver} title={titleDriverVolume} label="รายงานจำนวนพนักงานขับรถ" />
    </div>
  </>
}