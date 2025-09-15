import { DeliveryStatus, OrderStatus } from "@/src/types/Order";
import { CheckIcon, CloseIcon } from "../icon/Icon";
import clsx from "clsx";

interface DeliveryStatusBarProps {
  status: DeliveryStatus
  startTime: Date,
  endTime?: Date
  index: number


}
export default function DeliveryStatusBar({ status, startTime, endTime, index }: DeliveryStatusBarProps) {
  return <>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {status == DeliveryStatus.Success ?
          <div className="bg-success rounded-full w-[40px] h-[40px] flex justify-center items-center">
            <CheckIcon size={15} />
          </div>
          : status == DeliveryStatus.Late ?
            <div className="bg-error rounded-full w-[40px] h-[40px] flex justify-center items-center">
              <CloseIcon size={15} className=" stroke-white stroke-3" />
            </div>
            : status == DeliveryStatus.InProgress ?
              <div className="bg-primary rounded-full w-[40px] h-[40px] flex justify-center items-center">
                <p className="text-white font-bold">{index}</p>
              </div>
              :
              <div className="bg-neutral rounded-full w-[40px] h-[40px] flex justify-center items-center">
                <p className="text-white font-bold">{index}</p>
              </div>
        }
        <p>รอโหลดสินค้า</p>
      </div>
      <p className={clsx(
        "font-bold",
        {
          "text-success": status === DeliveryStatus.Success,
          "text-error": status === DeliveryStatus.Late,
        }
      )}>
        {`${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}` +
          (endTime ? ` - ${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}` : '')
        }
      </p>
    </div>
  </>
}