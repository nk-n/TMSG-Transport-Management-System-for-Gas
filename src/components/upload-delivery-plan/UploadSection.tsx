"use client"
import { useState } from "react";
import { ClipIcon, CloseIcon, FileBoldIcon, FileIcon, UploadIcon } from "../icon/Icon";
import TextButton from "../utils/TextButton";
import clsx from "clsx";
import { Order } from "@/src/types/Order";
import { OrderPostBody, toOrderPostBody } from "@/src/types/post-body/OrderPostBody";
import { RowData } from "../car-driver-management/UploadMetadataPopup";
import * as XLSX from "xlsx";
import { useToast } from "../utils/ToastContext";
import { apiClient } from "@/src/services/apiClient";
import LoadingScene from "../utils/LoadingScene";

export default function UploadSection() {
  const [dragFile, setDragFile] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<RowData[] | null>(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()



  const validateOrderField = (jsonData: RowData[]) => {
    const dateTimeRegex = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}$/;
    const checkNull = ["เลขออเดอร์", "ต้นทาง", "ปลายทาง", "เบอร์รถ", "เบอร์พนักงานขับรถ1"]
    for (const row of jsonData) {
      if (isNaN(Number(row["ลำดับเที่ยว"]))) {
        throw new Error("คอลัมน์ ลำดับเที่ยว ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (isNaN(Number(row["น้ำหนักบรรทุก"])) || Number(row["น้ำหนักบรรทุก"]) <= 0 || Number(row["น้ำหนักบรรทุก"]) > 100000) {
        throw new Error("คอลัมน์ น้ำหนักบรรทุก ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (isNaN(Number(row["ลำดับเที่ยว"])) || Number(row["ลำดับเที่ยว"]) <= 0 || Number(row["ลำดับเที่ยว"]) > 100) {
        throw new Error("คอลัมน์ ลำดับเที่ยว ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (isNaN(Number(row["drop"])) || Number(row["drop"]) <= 0 || Number(row["drop"]) > 2) {
        throw new Error("คอลัมน์ drop ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (!dateTimeRegex.test(row["เวลาที่ส่งมอบ"])) {
        throw new Error("คอลัมน์ เวลาส่งมอบ ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (!dateTimeRegex.test(row["เวลาเข้าโหลด"])) {
        throw new Error("คอลัมน์ เวลาเข้าโหลด ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      for (const column of checkNull) {
        if (row[column].trim() === "" || row[column].trim() === "-") {
          throw new Error(`คอลัมน์ ${column} ไม่ถูกต้องตามที่ระบบกำหนด`)
        }
      }
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const orderColumn = ["ลำดับเที่ยว", "เลขออเดอร์", "เวลาที่ส่งมอบ", "น้ำหนักบรรทุก", "ต้นทาง", "ปลายทาง", "drop", "หมายเหตุ", "เบอร์รถ", "เบอร์พนักงานขับรถ1", "เบอร์พนักงานขับรถ2", "เวลาเข้าโหลด", "ลำดับเที่ยว"]
    try {
      if (event.target.files != null) {
        const newFile = event.target.files[0]
        validateFileType(newFile)
        const jsonData = await excelToJSON(newFile)
        validateColumn(jsonData, orderColumn)
        validateOrderField(jsonData)
        setFile(newFile)
        setData(jsonData)
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast("นำเข้าข้อมูลไม่สำเร็จ: " + err.message, "error")
      }
    }
    event.target.value = "";
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
    if (event.dataTransfer.types.includes("Files")) {
      setDragFile(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("Leave")
    setDragFile(false)
  };

  const validateFileType = (file: File) => {
    if (
      file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && // .xlsx
      file.type !== "application/vnd.ms-excel" // .xls
    ) {
      throw new Error("ระบบรองรับไฟล์ประเภท .xlsx หรือ .xls เท่านั้น")
    }
  }

  const validateColumn = (jsonData: RowData[], columnName: string[]) => {
    if (jsonData.length != 0 && jsonData != null && jsonData[0] != null) {
      for (const element of Object.keys(jsonData[0])) {
        console.log(element)
        if (!columnName.includes(element)) {
          throw new Error("คอลัมน์ไม่ถูกต้องตามที่ระบบกำหนด")
        }
      }
    } else {
      throw new Error("คอลัมน์ไม่ถูกต้องตามที่ระบบกำหนด")
    }
  }

  const excelToJSON = async (file: File): Promise<RowData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const binaryStr = evt.target?.result;
        if (!binaryStr) return;

        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData: RowData[] = XLSX.utils.sheet_to_json(sheet, { defval: "" })
        const cleaned = jsonData.map(row => {
          const { __EMPTY, __rowNum__, ...rest } = row;
          return rest;
        });

        resolve(cleaned)
      };
      reader.onerror = () => reject(new Error("File read error"))
      reader.readAsBinaryString(file);
    })
  }

  const uploadData = async () => {
    try {
      if (data != null) {
        setLoading(true)
        let orderPostBody: OrderPostBody[] = data.map((element) => {
          return toOrderPostBody(element)
        })
        await apiClient.post("/order/", orderPostBody)
        setLoading(false)
        showToast("นำเข้าข้อมูลสำเร็จ", "success")
        setFile(null)
      }
    } catch (err: any) {
      showToast("นำเข้าข้อมูลไม่สำเร็จ: " + err.message, "error")
      console.error(err.response.data)
      setLoading(false);
    }
  }

  return <>
    <div className="relative flex flex-col justify-center items-center w-full outline-dashed rounded-xl outline-neutral outline-[2px] px-5  gap-2 h-[300px]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <LoadingScene loading={loading} />
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
            <button className="" onClick={() => {
              setFile(null)
              setData(null)
            }}>
              <CloseIcon size={15} className="absolute right-[10px] top-[20px] cursor-pointer hover:scale-90 transition-all stroke-foreground" />
            </button>
            <FileBoldIcon size={100} className="fill-primary" />
            <p className="text-lg text-foreground">{file.name}</p>
          </div>

      }
      <div className={clsx("flex justify-center items-center flex-col gap-2 transition-all absolute inset-0  pointer-events-none rounded-xl", {
        "backdrop-blur-md opacity-100 bg-foreground/5": dragFile,
        "opacity-0": !dragFile
      })}>
        <ClipIcon size={50} className=" stroke-primary" />
        <p>วางไฟล์ที่นี่</p>
      </div>

    </div>
    <div className="w-full max-w-[500px] flex gap-5">
      <TextButton
        disable={data === null}
        onClick={() => {
          uploadData()
        }} border={false} backgroundColor="bg-primary" foregroundColor="text-white">
        <p>อัปโหลดแผนการจัดส่ง</p>
      </TextButton>
      <a href="/order.xlsx" className="flex-1"
        download={true}
      >
        <TextButton onClick={() => { }} border={true} disable={false}>
          <p>ดาวน์โหลดตัวอย่างไฟล์</p>
        </TextButton>
      </a>
    </div>
  </>
}