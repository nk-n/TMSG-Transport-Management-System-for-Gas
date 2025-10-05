import { Car, Driver } from "@/src/types/CarDriver";
import DriverSection from "./driver/DriverSection";
import CarSection from "./car/CarSection";

export default function CarDriverManagementSection() {
  return <>
    <DriverSection />
    <CarSection />
  </>
}