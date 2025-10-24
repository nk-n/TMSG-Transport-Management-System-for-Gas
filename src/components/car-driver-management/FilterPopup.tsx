"use client"
import { useState } from "react"
import { CloseIcon } from "../icon/Icon"
import CheckBox from "../utils/CheckBox"
import clsx from "clsx"
import { DriverCarStatus } from "@/src/types/CarDriver"

export default function FilterPopup<T>({ isOpen, closePopup, filterMap, setFilterMap }:
  {
    isOpen: boolean, closePopup: () => void,
    filterMap: { status: T, check: boolean }[],
    setFilterMap: (newFilterMap: { status: T, check: boolean }[]) => void
  }) {
  return <>
    <div className={clsx("transition-all bg-background absolute -left-[100px] -bottom-[220px] border-1 border-neutral rounded-xl z-20", {
      "opacity-0 scale-95 pointer-events-none": !isOpen
    })}>
      <div className="flex justify-between items-center p-5 border-b-1 border-b-neutral">
        <p className="font-bold w-[200px]">กรองการค้นหา</p>
        <button
          onClick={() => {
            closePopup()
          }}
          className="cursor-pointer outline-none">
          <CloseIcon size={13} />
        </button>
      </div>
      {filterMap.map((element, index) => {
        return (
          <div key={index} className="flex p-3 gap-3">
            <CheckBox iconSize={15} disable={false} check={element.check}
              setCheck={() => {
                let newFilterMap = filterMap.map((filterElement) => {
                  if (filterElement.status == element.status) {
                    return { status: element.status, check: !filterElement.check }
                  }
                  return filterElement
                })
                setFilterMap([...newFilterMap])
              }} />
            <p className="flex-1">{String(element.status)}</p>
          </div>
        )
      })}
    </div>
  </>
}