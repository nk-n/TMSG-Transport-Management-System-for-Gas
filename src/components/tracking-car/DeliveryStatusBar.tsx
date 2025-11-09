"use client"
import { JSX, useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "../icon/Icon";
import clsx from "clsx";
import { Status, StatusHistory } from "@/src/types/StatusHistory";
import { Order } from "@/src/types/Order";
import { StatusHistoryMap } from "./TrackingCarCard";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

interface DeliveryStatusBarProps {
  label: string
  index: number
  status: Status
  order: Order
  statusMap: StatusHistoryMap
  setLate: () => void
}

export enum DeliveryStatus {
  Start = "เริ่มงาน",
  WaitingLoad = "รอโหลดสินค้า",
  Load = "โหลดสินค้า",
  Travel = "เดินทางส่ง",
  Deliver = "ลงสินค้า",
  Finish = "ส่งสำเร็จ"
}


export default function DeliveryStatusBar({ label, index, status, order, statusMap, setLate }: DeliveryStatusBarProps) {

  const findStatusHistoryByStatus = (status: Status): StatusHistory | undefined => {
    return statusMap[status]
  }

  useEffect(() => {
    if (isLate()) {
      setLate()
    }
  }, [statusMap])


  // สถานะของ delivery status bar อันนี้
  const statusHistory: StatusHistory | undefined = findStatusHistoryByStatus(status)

  const isCurrentProgresstion = (): boolean => {
    if (statusHistory === undefined) return false
    if (status === Status.Start) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Waiting);
      if (loadStatusHistory !== undefined) {
        return false
      }
    } else if (status === Status.Waiting) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Load);
      if (loadStatusHistory !== undefined) {
        return false;
      }
    } else if (status === Status.Load) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Travel);
      if (loadStatusHistory !== undefined) {
        return false;
      }
    } else if (status === Status.Travel) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Deliver);
      if (loadStatusHistory !== undefined) {
        return false;
      }
    } else if (status === Status.Deliver) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Finish);
      if (loadStatusHistory !== undefined) {
        return false;
      }
    }
    return true
  }

  const getDelivertyStatus = (statusHistory: StatusHistory[]): DeliveryStatus => {
    switch (statusHistory.length) {
      case 1:
        return DeliveryStatus.Start
      case 2:
        return DeliveryStatus.WaitingLoad
      case 3:
        return DeliveryStatus.Load
      case 4:
        return DeliveryStatus.Travel
      case 5:
        return DeliveryStatus.Deliver
      case 6:
        return DeliveryStatus.Finish
      default:
        return DeliveryStatus.Finish
    }
  }

  const calculateEndStandardTime = (): Date => {
    if (statusHistory === undefined) return new Date();
    switch (statusHistory.status) {
      case Status.Waiting:
        return new Date(statusHistory.timestamp.getTime() + (30 * 60 * 1000))
      case Status.Load:
      case Status.Deliver:
        return new Date(statusHistory.timestamp.getTime() + (60 * 60 * 1000))
      case Status.Travel:
        return new Date(statusHistory.timestamp.getTime() + (order.timeUse * 60 * 1000))
      default:
        return new Date(statusHistory.timestamp.getTime())
    }
  }

  const calculateEndActualTime = (): Date => {
    if (statusHistory === undefined) return new Date();
    if (status === Status.Waiting) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Load);
      if (loadStatusHistory !== undefined) {
        return new Date(loadStatusHistory.timestamp.getTime());
      }
    } else if (status === Status.Load) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Travel);
      if (loadStatusHistory !== undefined) {
        return new Date(loadStatusHistory.timestamp.getTime());
      }
    } else if (status === Status.Travel) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Deliver);
      if (loadStatusHistory !== undefined) {
        return new Date(loadStatusHistory.timestamp.getTime());
      }
    } else if (status === Status.Deliver) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Finish);
      if (loadStatusHistory !== undefined) {
        return new Date(loadStatusHistory.timestamp.getTime());
      }
    }
    return new Date()
  }

  const isLate = (): boolean => {
    if (statusHistory === undefined) {
      return false
    }
    const now: Date = new Date("2025-09-26T14:00:00+07:00")
    const status = statusHistory.status
    const endTime: Date = calculateEndStandardTime()
    if (status === Status.Waiting) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Load);
      if (loadStatusHistory !== undefined) {
        return (loadStatusHistory.timestamp.getTime() - statusHistory.timestamp.getTime()) > 30 * 60 * 1000;
      }
    } else if (status === Status.Load) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Travel);
      if (loadStatusHistory !== undefined) {
        return (loadStatusHistory.timestamp.getTime() - statusHistory.timestamp.getTime()) > 60 * 60 * 1000;
      }
    } else if (status === Status.Travel) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Deliver);
      if (loadStatusHistory !== undefined) {
        return (loadStatusHistory.timestamp.getTime() - statusHistory.timestamp.getTime()) > order.timeUse * 60 * 1000;
      }
    } else if (status === Status.Deliver) {
      const loadStatusHistory = findStatusHistoryByStatus(Status.Finish);
      if (loadStatusHistory !== undefined) {
        return (loadStatusHistory.timestamp.getTime() - statusHistory.timestamp.getTime()) > 60 * 60 * 1000;
      }
    }
    return false;
  }

  const generateJSXStatus = (): JSX.Element => {
    if (statusHistory === undefined) {
      return <>
        <div className="bg-neutral rounded-full w-[40px] h-[40px] flex justify-center items-center">
          <p className="text-white font-bold">{index}</p>
        </div>
        <p className="">{label}</p>
      </>
    }
    if (isCurrentProgresstion()) {
      return <>
        <div className="bg-primary rounded-full w-[40px] h-[40px] flex justify-center items-center">
          <p className="text-white font-bold">{index}</p>
        </div>
        <p className="text-primary">{label}</p>
      </>
    }
    if (isLate()) {
      return <>
        <div className="bg-error rounded-full w-[40px] h-[40px] flex justify-center items-center">
          <CloseIcon size={15} className=" stroke-white stroke-3" />
        </div>
        <p className="text-error">{label}</p>
      </>
    } else {
      return <>
        <div className="bg-success rounded-full w-[40px] h-[40px] flex justify-center items-center">
          <CheckIcon size={15} className="stroke-white" />
        </div>
        <p className="text-success">{label}</p>
      </>
    }
  }



  return <>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {generateJSXStatus()}
      </div>
      <p className={clsx(
        "font-bold",
        {
          "text-primary": isCurrentProgresstion(),
          "text-success": !isLate() && !isCurrentProgresstion(),
          "text-error": isLate() && !isCurrentProgresstion(),
        }
      )}>
        {statusHistory ?
          `${statusHistory.timestamp.getHours().toString().padStart(2, '0')}:${statusHistory?.timestamp.getMinutes().toString().padStart(2, '0')} ${statusHistory.timestamp.getTime() === calculateEndStandardTime().getTime() || isCurrentProgresstion() ? "" : `- ${calculateEndActualTime().getHours().toString().padStart(2, '0')}:${calculateEndActualTime()?.getMinutes().toString().padStart(2, '0')}`}`
          :
          ""}
      </p>
    </div>
  </>
}