import { RowData } from "../components/car-driver-management/UploadMetadataPopup"

export enum DriverCarStatus {
  Ready = "พร้อม",
  NotReady = "ไม่พร้อม",
  InProgress = "ระหว่างการจัดส่ง"
}

export enum CarType {
  TenWheel = "สิบล้อ",
  Tractor = "หัวลาก",
  SemiTrailer = "กึ่งพ่วง"
}

export enum CarWeight {
  EightTon = "8 ตัน",
  TenTon = "10 ตัน",
  Trailer = "เทรลเลอร์"
}

export interface BaseCarDriver  {
  id: string,
  status: DriverCarStatus,
  reason?: string
  isDelete : boolean
}

export interface Driver extends BaseCarDriver {
  name: string,
  tel: string,
}

export interface Car extends BaseCarDriver {
  licensePlate: string,
  type: CarType,
  weight: CarWeight 
}

export const toCar = (row: RowData) : Car => {
  let carType : string = String(row["ประเภทรถ"]).trim()
  let carWeight : string = String(row["น้ำหนัก"]).trim()
    return {
      id: row["เบอร์รถ"].trim(),
      status: DriverCarStatus.Ready,
      isDelete: false,
      licensePlate: row["ทะเบียนรถ"],
      type: carType === "หัวลาก" ? CarType.Tractor : carType === "สิบล้อ" ? CarType.TenWheel : CarType.SemiTrailer,
      weight: carWeight === "8" ? CarWeight.EightTon : carWeight === "10" ? CarWeight.TenTon : CarWeight.Trailer
    }
}