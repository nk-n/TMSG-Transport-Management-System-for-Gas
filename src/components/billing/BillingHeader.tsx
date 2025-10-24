"use client"
import { useEffect, useState } from "react";
import { CoinIcon, FileIcon, PenIcon, PeopleIcon, UploadIcon } from "../icon/Icon";
import InputBox from "../utils/InputBox";
import { RowData } from "../car-driver-management/UploadMetadataPopup";
import * as XLSX from "xlsx";
import { useToast } from "../utils/ToastContext";

interface BillingHeader {
  fetchData: () => void
  fetchOil: () => void
}
export default function BillingHeader({ fetchData, fetchOil }: BillingHeader) {
  const [oilInput, setOilInput] = useState("")
  const [oilPrice, setOilPrice] = useState(0)
  const [editOil, setEditOil] = useState(false)
  const [notion, setNotion] = useState("")
  const { showToast } = useToast()

  useEffect(() => {
    fetchBillingTable()
  }, [])

  const fetchBillingTable = () => {
    const storedData = localStorage.getItem("billing");
    if (!storedData) {
      setNotion("ไม่มีข้อมูลค่าขนส่งในระบบกรุณานำเข้าข้อมูลค่าขนส่ง")
      return
    }
    setNotion("มีข้อมูลค่าขนส่งในระบบแล้ว (สามารถเปลี่ยนแปลงได้โดยการนำเข้าไฟล์ใหม่เข้าไปแทนที่)")
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const orderColumn = ["ลำดับเที่ยว", "เลขออเดอร์", "เวลาที่ส่งมอบ", "น้ำหนักบรรทุก", "ต้นทาง", "ปลายทาง", "drop", "หมายเหตุ", "เบอร์รถ", "เบอร์พนักงานขับรถ1", "เบอร์พนักงานขับรถ2", "เวลาเข้าโหลด"]
    try {
      if (event.target.files != null) {
        const newFile = event.target.files[0]
        // validateFileType(newFile)
        const jsonData = await excelToJSON(newFile)
        // validateColumn(jsonData, orderColumn)
        // validateOrderField(jsonData)
        localStorage.setItem("billing", JSON.stringify(jsonData))
        fetchData()
        showToast("นำเข้าข้อมูลสำเร็จ", "success")
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast("นำเข้าข้อมูลไม่สำเร็จ: " + err.message, "error")
      }
    }
    event.target.value = "";
  }

  const handdleSaveOilPrice = () => {
    if (isNaN(Number(oilInput)) || Number(oilInput) === 0) {
      setEditOil(false)
      return
    }
    localStorage.setItem("oil_price", String(oilInput))
    fetchOil()
    setEditOil(false)
    setOilPrice(Number(oilInput))
  }

  const fetchOilPrice = () => {
    const oilPrice: string | null = localStorage.getItem("oil_price")
    setOilPrice(Number(oilPrice))
  }

  useEffect(() => {
    fetchOilPrice()
  }, [])

  return <>
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CoinIcon size={24} className="  stroke-foreground" />
                <p className="font-bold text-xl">วางบิลค่าขนส่ง</p>
              </div>
              <p className="text-neutral">จัดการคำนวณค่าขนส่งเพื่อเรียกเก็บกับผู้ว่าจ้าง</p>
            </div>
            <div className="border-neutral border-1 rounded-xl p-4 flex gap-4 items-center">
              <p>กำหนดราคาน้ำมัน (บาท/ลิตร):</p>
              <p className="font-bold">{oilPrice}</p>
              {
                editOil ?
                  <div className="flex gap-4">
                    <InputBox placeholder="ราคาน้ำมัน" controller={
                      {
                        value: oilInput,
                        handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          setOilInput(e.target.value)
                        }
                      }
                    } />
                    <button className="border-1 border-neutral p-3 button-effect rounded-xl"
                      onClick={() => {
                        handdleSaveOilPrice()

                      }}
                    >
                      ตกลง
                    </button>
                  </div>
                  :
                  <button className="button-effect"
                    onClick={() => {
                      setEditOil(true)
                    }}
                  >
                    <PenIcon size={20} className="stroke-foreground" />
                  </button>
              }
            </div>
            <button className="flex items-center justify-center gap-1 border-1 border-neutral rounded-xl p-4 button-effect" onClick={() => {
            }}>
              <FileIcon size={20} className="stroke-foreground" />
              <p><label htmlFor="upload-file" className="text-foreground cursor-pointer"> นำเข้าข้อมูลค่าขนส่ง </label></p>
              <input id="upload-file" type="file" className=" hidden" onChange={handleFileUpload} />
            </button>
            <p className="text-primary">{notion}</p>
          </div>
        </div>
      </div>
    </div>
  </>
}