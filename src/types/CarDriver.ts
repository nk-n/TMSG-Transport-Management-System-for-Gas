import { RowData } from "../components/car-driver-management/UploadMetadataPopup";

export enum DriverCarStatus {
  Ready = "พร้อม",
  NotReady = "ไม่พร้อม",
  InProgress = "ระหว่างจัดส่ง",
}

export enum CarType {
  TenWheel = "สิบล้อ",
  Tractor = "หัวลาก",
  SemiTrailer = "กึ่งพ่วง",
}

export enum CarWeight {
  EightTon = "8",
  TenTon = "10",
  Trailer = "เทรลเลอร์",
}

// export interface BaseCarDriver {
//   id: string;
//   status: DriverCarStatus;
//   note?: string;
//   available: boolean;
// }

export interface Driver {
  name: string;
  tel: string;
  status: DriverCarStatus;
  note?: string;
  available: boolean;
  line_id?: string;
}

export interface Car {
  license: string;
  type: CarType;
  weight: CarWeight;
  id: string;
  status: DriverCarStatus;
  note?: string;
  available: boolean;
}
export const toDriver = (row: RowData): Driver => {
  return {
    name: row["ชื่อ-สกุล"].trim(),
    tel: row["เบอร์ติดต่อ"].trim(),
    status: DriverCarStatus.Ready,
    available: true,
  };
};

export const toCar = (row: RowData): Car => {
  let carType: string = String(row["ประเภทรถ"]).trim();
  let carWeight: string = String(row["น้ำหนัก"]).trim();
  return {
    id: row["เบอร์รถ"].trim(),
    status: DriverCarStatus.Ready,
    available: true,
    license: row["ทะเบียนรถ"],
    type:
      carType === "หัวลาก"
        ? CarType.Tractor
        : carType === "สิบล้อ"
        ? CarType.TenWheel
        : CarType.SemiTrailer,
    weight:
      carWeight === "8"
        ? CarWeight.EightTon
        : carWeight === "10"
        ? CarWeight.TenTon
        : CarWeight.Trailer,
  };
};

