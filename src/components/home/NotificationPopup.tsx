'use client'
import { NotificationType } from "@/src/types/Notification";
import { ClockIcon, CloseIcon } from "../icon/Icon";
import clsx from "clsx";
import { useEffect } from "react";


export default function NotificationPopup({ data, isOpen, closePopup }: { data: NotificationType[], isOpen: boolean, closePopup: () => void }) {

  // if (isOpen) {
  //   document.body.classList.add("overflow-y-hidden")
  // } else {
  //   document.body.classList.remove("overflow-y-hidden")
  // }
  return <>
    <div className={clsx(" transition-all bg-black/50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50", {
      "opacity-100": isOpen,
      "opacity-0 pointer-events-none": !isOpen
    })}>
      <div className={clsx("transition-transform bg-white w-full max-w-[500px] rounded-xl", {
        " scale-95": !isOpen
      })}>
        <div className="flex justify-between items-center p-5 border-b-1 border-b-[var(--neutral-color)]">
          <p className="font-bold text-lg">การแจ้งเตือน</p>
          <button
            onClick={() => {
              closePopup()
            }}
            className="cursor-pointer outline-none">
            <CloseIcon size={20} />
          </button>
        </div>
        <div className="p-5 gap-5 flex flex-col overflow-y-scroll max-h-[500px] scrollbar-hide">
          {data.map((element, index) => {
            return (
              <div key={index} className="flex items-center gap-5 border-1 border-[var(--neutral-color)] rounded-xl p-3">
                <ClockIcon size={30} className=" storke-[var(--error-color)]" />
                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-bold">{element.id} <span className="text-[var(--error-color)] ml-2">ล่าช้า</span></p>
                  <p className="text-[var(--neutral-color)]">ติดต่อ: {element.tel}</p>
                  {element.reason != undefined ?
                    <p className="text-[var(--error-third-color)] text-sm bg-[var(--error-second-color)] border-l-1 border-l-[var(--error-third-color)] px-3 py-2"><span className="font-bold mr-2">หมายเหตุ:</span>{element.reason}</p> : <></>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </>
}