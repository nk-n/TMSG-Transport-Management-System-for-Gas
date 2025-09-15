import { PeopleIcon, UploadIcon } from "../icon/Icon"
import CarDriverManagementHeader from "./CarDriverManagementHeader"
import DriverSection from "./driver/DriverSection"
import CarSection from "./car/CarSection"
import { driverRawData } from "@/src/constants/DriverSampleData"
import { carRawData } from "@/src/constants/CarSampleData"

export default function CarDriverManagement() {
  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <CarDriverManagementHeader carRawData={carRawData} driverRawData={driverRawData} />
      <DriverSection rawData={driverRawData} />
      <CarSection rawData={carRawData} />
    </div>
  </>
}