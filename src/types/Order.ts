import { Car, Driver } from "./CarDriver";

export enum OrderStatus {
  Waiting = "รอรับงาน",
  InProgress = "ระหว่างการจัดส่ง",
  Verify = "ตรวจสอบค่าเที่ยว",
  Approve = "อนุมัติ"
}

export enum DeliveryStatus {
  Success = "สำเร็จ",
  Late = "ล่าช้า",
  InProgress = "กำลังดำเนินการ",
  Pending = "รอดำเนินการ"
}

export interface Order {
  car: Car
  drivers: Driver[]
  status: OrderStatus
  orderId: string
  note: string
  currentLocation: string
  destination: string
  loadGas: number
  drop: number
  serveGas: number
  balanceGas: number
  waitingLoadStatus: DeliveryStatus
  loadStatus: DeliveryStatus
  deliveryStatus: DeliveryStatus
  serveStatus: DeliveryStatus
  timeWaitingLoad: number
  timeLoad: number
  timeDelivery: number
  timeServe: number
  deadline: Date
  startTime: Date
}