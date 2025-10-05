import { Car, Driver } from "@/src/types/CarDriver";
import DriverSection from "./driver/DriverSection";
import DriverSectionMetadata from "./driver/DriverSectionMetadata";
import DestinationSectionMetadata from "./destination/DestinationSectionMetadata";
import CarSectionMetadata from "./car/CarSectionMetadata";

interface MetaDataManagementSectionProps {
  carData: Car[]
  driverData: Driver[]
  destinationData: Destination[]
}
export default function MetaDataManagementSection({ carData, driverData, destinationData }: MetaDataManagementSectionProps) {
  return <>
    <div className="flex flex-col gap-5">
      <DriverSectionMetadata />
      <CarSectionMetadata />
      <DestinationSectionMetadata />
    </div>
  </>
}