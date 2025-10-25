"use client"
import { useEffect, useRef, useState } from "react";
import { CheckIcon, CloseIcon, UploadIcon } from "../icon/Icon";
import * as XLSX from "xlsx";
import Table from "../utils/Table";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/store/store";
import { setCars } from "@/src/feature/car/carSlice";
import { Car, Driver, toCar, toDriver } from "@/src/types/CarDriver";
import { apiClient } from "@/src/services/apiClient";
import { CarPostBody, toCarPostBody } from "@/src/types/post-body/CarPostBody";
import { DriverPostBody, toDriverPostBody } from "@/src/types/post-body/DriverPostBody";
import { setDriver } from "@/src/feature/driver/driverSlice";
import { DestinationPostBody, toDestinationPostBody } from "@/src/types/post-body/DestinationPostBody";
import { Destination, toDestination } from "@/src/types/Destination";
import { setDestinations } from "@/src/feature/destination/destinationSlice";
import { useToast } from "../utils/ToastContext";

export interface RowData {
  [key: string]: string;
}

interface UploadMetadataPopupProps {
  isPopupOpen: boolean
  closePopup: () => void
}

export default function UploadMetadataPopup({ isPopupOpen, closePopup }: UploadMetadataPopupProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [file, setFile] = useState<{ car: File | null, driver: File | null, destination: File | null }>
    ({ car: null, driver: null, destination: null })
  const [datas, setDatas] = useState<{ car: RowData[] | null, driver: RowData[] | null, destination: RowData[] | null }>
    ({ car: null, driver: null, destination: null })
  const { showToast } = useToast()

  const validateFileType = (file: File) => {
    if (
      file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && // .xlsx
      file.type !== "application/vnd.ms-excel" // .xls
    ) {
      throw new Error("ระบบรองรับไฟล์ประเภท .xlsx หรือ .xls เท่านั้น")
    }
  }

  const checkNull = (row: RowData, checkColumn: string[]) => {
    for (const column of checkColumn) {
      if (row[column] === "" || row[column] === "-") {
        throw new Error(`คอลัมน์ ${column} ไม่ถูกต้องตามที่ระบบกำหนด`)
      }
    }
  }

  const validateCarField = (jsonData: RowData[]) => {
    const columnCheck = ["เบอร์รถ", "ทะเบียนรถ"]
    const weight = ["Trailer", 8, 10]
    const type = ["หัวลาก", "สิบล้อ", "กึ่งพ่วง"]
    for (const row of jsonData) {
      if (!weight.includes(row["น้ำหนัก"])) {
        throw new Error("คอลัมน์ น้ำหนัก ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (!type.includes(row["ประเภทรถ"])) {
        throw new Error("คอลัมน์ ประเภทรถ ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      checkNull(row, columnCheck)
    }

  }

  const validateDriverField = (jsonData: RowData[]) => {
    const columnCheck = ["ชื่อ-สกุล", "เบอร์ติดต่อ"]
    for (const row of jsonData) {
      checkNull(row, columnCheck)
    }

  }

  const validateDestinationField = (jsonData: RowData[]) => {
    const columnCheck = ["ชื่อสถานที่", "ที่อยู่", "จังหวัด", "ภูมิภาค", "เส้นทาง"]
    for (const row of jsonData) {
      if (isNaN(Number(row["ระยะทาง"]))) {
        throw new Error("คอลัมน์ ระยะทาง ไม่ถูกต้องตามที่ระบบกำหนด")
      }
      if (isNaN(Number(row["ระยะเวลาที่ใช้เดินทาง"]))) {
        throw new Error("คอลัมน์ ระยะเวลา ที่ใช้เดินทางไม่ถูกต้องตามที่ระบบกำหนด")
      }
      checkNull(row, columnCheck)
    }
  }

  const validateColumn = (jsonData: RowData[], columnName: string[], validateField?: (jsonData: RowData[]) => void) => {
    console.log(jsonData)
    if (jsonData.length != 0 && jsonData != null && jsonData[0] != null) {
      for (const element of Object.keys(jsonData[0])) {
        if (!columnName.includes(element)) {
          throw new Error("คอลัมน์ไม่ถูกต้องตามที่ระบบกำหนด")
        }
      }
    }
    if (validateField) {
      validateField(jsonData)
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


  const handleCarFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const carColumn = ["เบอร์รถ", "น้ำหนัก", "ทะเบียนรถ", "ประเภทรถ", "สถานะรถ"]
    try {
      if (event.target.files != null) {
        file.car = event.target.files[0]
        validateFileType(event.target.files[0])
        setFile({ ...file })
        const jsonData = await excelToJSON(event.target.files[0])
        validateColumn(jsonData, carColumn, validateCarField)
        datas.car = jsonData
        setDatas({ ...datas })
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message, "error")
      }
    }
    event.target.value = "";
  }
  const handleDriverFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const driverColumn = ["ชื่อ-สกุล", "เบอร์ติดต่อ"]
    try {
      if (event.target.files != null) {
        file.driver = event.target.files[0]
        validateFileType(event.target.files[0])
        setFile({ ...file })
        const jsonData = await excelToJSON(event.target.files[0])
        validateColumn(jsonData, driverColumn, validateDriverField)
        datas.driver = jsonData
        setDatas({ ...datas })
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message, "error")
      }
      event.target.value = "";
    }
  }
  const handleDestinationFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const destinationColumn = ["ชื่อสถานที่", "ที่อยู่", "จังหวัด", "ภูมิภาค", "ระยะทาง", "เส้นทาง", "ระยะเวลาที่ใช้เดินทาง"]
    try {
      if (event.target.files != null) {
        file.destination = event.target.files[0]
        validateFileType(event.target.files[0])
        setFile({ ...file })
        const jsonData = await excelToJSON(event.target.files[0])
        validateColumn(jsonData, destinationColumn, validateDestinationField)
        datas.destination = jsonData
        setDatas({ ...datas })
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message, "error")
      }
    }
    event.target.value = "";
  }

  const uploadCarData = async (data: CarPostBody[]) => {
    try {
      const res = await apiClient.post("/metadata/cars", data)
      showToast("บันทึกข้อมูลสำเร็จ", "success")
    } catch (err: any) {
      showToast(err.message, "error")
    }
  }

  const uploadDriverData = async (data: DriverPostBody[]) => {
    try {
      await apiClient.post("/metadata/drivers", data)
      showToast("บันทึกข้อมูลสำเร็จ", "success")
    } catch (err: any) {
      showToast(err.message, "error")
    }
  }

  const uploadDestinationData = async (data: DestinationPostBody[]) => {
    try {
      await apiClient.post("/metadata/destinations", data)
      showToast("บันทึกข้อมูลสำเร็จ", "success")
    } catch (err: any) {
      showToast(err.message, "error")
    }
  }

  const uploadData = () => {
    if (datas.car != null) {
      let newCarsPostBody: CarPostBody[] = datas.car.map((element) => {
        return toCarPostBody(element)
      })
      let newCars: Car[] = datas.car.map((element) => {
        return toCar(element)
      })
      uploadCarData(newCarsPostBody)
      dispatch(setCars(newCars))
    }
    if (datas.driver != null) {
      let newDriversPostBody: DriverPostBody[] = datas.driver.map((element) => {
        return toDriverPostBody(element)
      })
      let newDrivers: Driver[] = datas.driver.map((element) => {
        return toDriver(element)
      })
      uploadDriverData(newDriversPostBody)
      dispatch(setDriver(newDrivers))
    }
    if (datas.destination != null) {
      let newDestinationPostBody: DestinationPostBody[] = datas.destination.map((element) => {
        return toDestinationPostBody(element)
      })
      let newDestinations: Destination[] = datas.destination.map((element) => {
        return toDestination(element)
      })
      uploadDestinationData(newDestinationPostBody)
      dispatch(setDestinations(newDestinations))
    }
    closePopup()
  }

  return <>
    <div className={clsx("fixed bg-foreground/25 inset-0 flex justify-center items-center z-10 transition-all", {
      "opacity-0 pointer-events-none": !isPopupOpen
    })}>
      <div className={clsx("transition-all bg-background rounded-xl p-10 flex flex-col items-center max-h-[700px] overflow-y-scroll overflow-hidden scrollbar-hide gap-4 relative", {
        "scale-90": !isPopupOpen
      })}>
        <button onClick={() => {
          closePopup()
          setDatas({ car: null, driver: null, destination: null })
        }}>
          <CloseIcon size={20} className="stroke-foreground absolute right-5 top-5 stroke-2 cursor-pointer hover:scale-95 transition-all" />
        </button>
        <p className="text-3xl font-bold">อัปโหลดข้อมูล Metadata</p>
        <div className="flex mt-8 gap-5 max-w-[1000px] w-full">
          <div className="flex flex-col items-center justify-center border-1 border-neutral rounded-xl p-5 gap-3 flex-1">
            <UploadIcon size={100} className="stroke-primary stroke-1" />
            <p className="text-2xl font-bold text-primary">ข้อมูลรถยนต์</p>
            <p><label htmlFor="car-upload-file" className="text-primary cursor-pointer"> คลิกเพื่อเลือกไฟล์ </label> หรือเลือกไฟล์มาวางที่นี่</p>
            <p className="text-neutral pointer-events-none">รองรับไฟล์ Excel (.xlsx, .xls) เท่านั้น</p>
            <input id="car-upload-file" type="file" className=" hidden" onChange={handleCarFileUpload} />
          </div>
          <div className="flex flex-col items-center justify-center border-1 border-neutral rounded-xl p-5 gap-3 flex-1">
            <UploadIcon size={100} className="stroke-inprogress stroke-1" />
            <p className="text-2xl font-bold text-inprogress">ข้อมูลพนักงานขับรถ</p>
            <p><label htmlFor="driver-upload-file" className="text-inprogress cursor-pointer"> คลิกเพื่อเลือกไฟล์ </label> หรือเลือกไฟล์มาวางที่นี่</p>
            <p className="text-neutral pointer-events-none">รองรับไฟล์ Excel (.xlsx, .xls) เท่านั้น</p>
            <input id="driver-upload-file" type="file" className=" hidden" onChange={handleDriverFileUpload} />
          </div>
          <div className="flex flex-col items-center justify-center border-1 border-neutral rounded-xl p-5 gap-3 flex-1">
            <UploadIcon size={100} className="stroke-purple-500 stroke-1" />
            <p className="text-2xl font-bold text-purple-500">ข้อมูลสถานที่จัดส่ง</p>
            <p><label htmlFor="destination-upload-file" className="text-purple-500 cursor-pointer"> คลิกเพื่อเลือกไฟล์ </label> หรือเลือกไฟล์มาวางที่นี่</p>
            <p className="text-neutral pointer-events-none">รองรับไฟล์ Excel (.xlsx, .xls) เท่านั้น</p>
            <input id="destination-upload-file" type="file" className=" hidden" onChange={handleDestinationFileUpload} />
          </div>
        </div>
        <div className="w-full border-1 border-error bg-error-second p-6 rounded-xl text-error-third">
          <p className="font-bold">ข้อกำหนดรูปแบบในการนำเข้าข้อมูล</p>
          <ul className="list-disc list-inside">
            <li>ระบบรองรับเฉพาะไฟล์ประเภท .xlsx และ .xls เท่านั้น</li>
            <li>
              กำหนดรูปแบบของไฟล์รถขนส่งจะต้องมีคอลัมน์ดังต่อไปนี้ เบอร์รถ, น้ำหนัก, ทะเบียนรถ, ประเภทรถ
              <ul className="list-disc list-inside pl-6">
                <li>คอลัมน์น้ำหนักกำหนดให้ 3 ค่า: <span className="font-bold">8</span>, <span className="font-bold">10</span>, <span className="font-bold">Trailer</span></li>
              </ul>
              <ul className="list-disc list-inside pl-6">
                <li>คอลัมน์ประเภทรถกำหนดให้ 3 ค่า: <span className="font-bold">หัวลาก</span>, <span className="font-bold">สิบล้อ</span>, <span className="font-bold">กึ่งพ่วง</span></li>
              </ul>
            </li>
            <li>กำหนดรูปแบบของไฟล์จะต้องมีคอลัมน์ดังต่อไปนี้ ชื่อ-สกุล, เบอร์ติดต่อ</li>
            <li>
              กำหนดรูปแบบของไฟล์สถานที่จัดส่งจะต้องมีคอลัมน์ดังต่อไปนี้ ชื่อสถานที่, ที่อยู่, จังหวัด, ภูมิภาค, ระยะทาง, เส้นทาง, ระยะเวลาที่ใช้เดินทาง
              <ul className="list-disc list-inside pl-6">
                <li>คอลัมน์ระยะทางและระยะเวลาที่ใช้เดินทางต้องเป็น <span className="font-bold">ตัวเลข</span> เป็นระยะเวลาและระยะทางจากต้นทาง SCBPK</li>
              </ul>
            </li>
            <li>ทุกคอลัมน์ไม่สามารถเป็นค่าว่างได้</li>
          </ul>
        </div>
        <div className="flex items-end w-full flex-col gap-3">
          <button className="bg-primary text-white px-5 py-3 rounded-xl hover:scale-95 transition-all cursor-pointer w-fit" onClick={() => {
            uploadData()
          }}>อัปโหลดข้อมูล Metadata</button>
        </div>
        <div className="max-w-[1000px] flex flex-col gap-10 w-full">
          {datas.car != null ?
            <div className="">
              <p className="mb-5">ไฟล์ข้อมูลรถที่อัปโหลด</p>
              <Table haveCheck={false} columnName={Object.keys(datas.car[0])}>
                {datas.car.map((elementInRow, indexInRow) => {
                  return (
                    <tr className="hover:bg-gray-50 border-t border-gray-300" key={indexInRow}>
                      {Object.keys(elementInRow).map((elementInColumn, indexInColumn) => {
                        return (
                          <td className="px-4 py-4 text-left" key={indexInColumn + indexInRow}>{elementInRow[elementInColumn]}</td>
                        )
                      })}
                    </tr>
                  )
                })}
              </Table>
            </div>
            :
            <></>
          }
          {datas.driver != null ?
            <div className="">
              <p className="mb-5">ไฟล์ข้อมูลพนักงานขับรถที่อัปโหลด</p>
              <Table haveCheck={false} columnName={Object.keys(datas.driver[0])}>
                {datas.driver.map((elementInRow, indexInRow) => {
                  return (
                    <tr className="hover:bg-gray-50 border-t border-gray-300" key={indexInRow}>
                      {Object.keys(elementInRow).map((elementInColumn, indexInColumn) => {
                        return (
                          <td className="px-4 py-4 text-left" key={indexInColumn + indexInRow}>{elementInRow[elementInColumn]}</td>
                        )
                      })}
                    </tr>
                  )
                })}
              </Table>
            </div>
            :
            <></>
          }
          {datas.destination != null ?
            <div className="">
              <p className="mb-5">ไฟล์ข้อมูลสถานที่จัดส่งปลายทาง</p>
              <Table haveCheck={false} columnName={Object.keys(datas.destination[0])}>
                {datas.destination.map((elementInRow, indexInRow) => {
                  return (
                    <tr className="hover:bg-gray-50 border-t border-gray-300" key={indexInRow}>
                      {Object.keys(elementInRow).map((elementInColumn, indexInColumn) => {
                        return (
                          <td className="px-4 py-4 text-left" key={indexInColumn + indexInRow}>{elementInRow[elementInColumn]}</td>
                        )
                      })}
                    </tr>
                  )
                })}
              </Table>
            </div>
            :
            <></>
          }
        </div>
      </div>
    </div >
  </>
}