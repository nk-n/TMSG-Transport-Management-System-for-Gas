import { LocationIcon } from "../icon/Icon"
import TrackingCarSection from "./TrackingCarSection"

export default function TrackingCar() {
  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-2">
          <LocationIcon size={24} className=" stroke-foreground" />
          <p className="font-bold text-xl">ติดตามสถานะรถขนส่ง</p>
        </div>
        <p className="text-neutral">ติดตามสถานะการจัดส่งแบบเรียลไทม์</p>
      </div>
      <TrackingCarSection />
    </div>
  </>
}