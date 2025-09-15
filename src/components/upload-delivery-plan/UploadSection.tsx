"use client"
import { useState } from "react";
import { ClipIcon, CloseIcon, FileBoldIcon, FileIcon, UploadIcon } from "../icon/Icon";
import TextButton from "../utils/TextButton";
import clsx from "clsx";

interface UploadSection {
  file: File | null,
  setFile: (newFile: File | null) => void
}
export default function UploadSection({ file, setFile }: UploadSection) {
  const [dragFile, setDragFile] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files)
    if (event.target.files != null) {
      setFile(event.target.files[0])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragFile(false)
    if (event.dataTransfer.files) {
      setFile(Array.from(event.dataTransfer.files)[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("Over")
    if (event.dataTransfer.types.includes("Files")) {
      setDragFile(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("Leave")
    setDragFile(false)
  };

  return <>
    <div className="relative flex flex-col justify-center items-center w-full outline-dashed rounded-xl outline-neutral outline-[2px] px-5  gap-2 h-[300px] z-0"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {
        file == null ?
          <div className={clsx("flex justify-center items-center flex-col gap-2 transition-all")}>
            <UploadIcon size={100} className="stroke-neutral pointer-events-none" />
            <p><label htmlFor="upload-file" className="text-primary cursor-pointer"> คลิกเพื่อเลือกไฟล์ </label> หรือเลือกไฟล์มาวางที่นี่</p>
            <p className="text-neutral pointer-events-none">รองรับไฟล์ Excel (.xlsx, .xls) เท่านั้น</p>
            <input id="upload-file" type="file" className=" hidden" onChange={handleFileUpload} />
          </div>
          :
          <div className="flex flex-col justify-center items-center shadow-lg rounded-lg px-14 py-10 relative gap-3">
            <button className="" onClick={() => { setFile(null) }}>
              <CloseIcon size={15} className="absolute right-[10px] top-[20px] cursor-pointer hover:scale-90 transition-all" />
            </button>
            <FileBoldIcon size={100} className="fill-primary" />
            <p className="text-lg">{file.name}</p>
          </div>

      }
      <div className={clsx("flex justify-center items-center flex-col gap-2 transition-all absolute inset-0  pointer-events-none rounded-xl", {
        "backdrop-blur-md opacity-100 bg-black/5": dragFile,
        "opacity-0": !dragFile
      })}>
        <ClipIcon size={50} className=" stroke-primary" />
        <p>วางไฟล์ที่นี่</p>
      </div>

    </div>
    <div className="w-full max-w-[500px] flex gap-5">
      <TextButton onClick={() => { }} border={false} backgroundColor="bg-primary" foregroundColor="text-white">
        <p>อัปโหลดแผนการจัดส่ง</p>
      </TextButton>
      <TextButton onClick={() => { }} border={true}>
        <p>ดาวน์โหลดตัวอย่างไฟล์</p>
      </TextButton>
    </div>
  </>
}