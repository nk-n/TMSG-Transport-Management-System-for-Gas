"use client"
import { Car, Driver, toCar } from "@/src/types/CarDriver";
import DriverSection from "./driver/DriverSection";
import DriverSectionMetadata from "./driver/DriverSectionMetadata";
import DestinationSectionMetadata from "./destination/DestinationSectionMetadata";
import CarSectionMetadata from "./car/CarSectionMetadata";

export default function MetaDataManagementSection() {
  return <>
    <div className="flex flex-col gap-5">
      <CarSectionMetadata />
      <DriverSectionMetadata />
      <DestinationSectionMetadata />
    </div>
  </>
}