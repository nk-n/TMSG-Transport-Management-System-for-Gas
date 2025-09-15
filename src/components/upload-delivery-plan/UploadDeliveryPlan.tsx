"use client"
import { useState } from "react";
import { UploadIcon } from "../icon/Icon";
import UploadSection from "./UploadSection";

export default function UploadDeliveryPlan() {
  const [file, setFile] = useState<File | null>(null)
  return <>
    <div className="border-1 border-neutral rounded-xl p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-2">
          <UploadIcon size={24} className=" stroke-foreground" />
          <p className="font-bold text-xl">อัปโหลดแผนการจัดส่ง</p>
        </div>
        <p className="text-neutral">ยืนยันสถานะพร้อมใช้งานของคนขับรถและรถ</p>
      </div>
      <UploadSection file={file} setFile={(newFile: File | null) => {
        setFile(newFile)
      }} />
    </div>
  </>
}