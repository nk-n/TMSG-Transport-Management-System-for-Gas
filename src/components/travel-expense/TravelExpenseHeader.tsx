"use client"
import { CoinIcon, FileIcon, PeopleIcon, UploadIcon } from "../icon/Icon";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useState } from "react";

export default function TravelExpenseHeader() {

  const carData = useSelector((state: RootState) => state.car.list)
  return <>
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center gap-2">
              <CoinIcon size={24} className="  stroke-foreground" />
              <p className="font-bold text-xl">วางบิลค่าเที่ยว</p>
            </div>
            <p className="text-neutral">ตรวจสอบและอนุมัติค่าเที่ยวให้กับพนักงานขับรถ</p>
          </div>
        </div>
      </div>
    </div>
  </>
}