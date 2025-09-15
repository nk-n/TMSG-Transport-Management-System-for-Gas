export enum DriverCarStatus {
  Ready = "พร้อม",
  NotReady = "ไม่พร้อม",
  InProgress = "ระหว่างการจัดส่ง"
}

export enum CarType {
  EightTon = "รถ 10 ล้อ 8 ตัน",
  TenTon = "รถ 10 ล้อ 10 ตัน",
  Trailer = "รถเทรลเลอร์"
}

export interface BaseCarDriver  {
  id: string,
  status: DriverCarStatus,
  reason?: string
}

export interface Driver extends BaseCarDriver {
  name: string,
  tel: string,
}

export interface Car extends BaseCarDriver {
  licensePlate: string,
  type: CarType,
}