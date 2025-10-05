import { Car, Driver } from "./CarDriver";
import { StatusHistory } from "./StatusHistory";

export enum OrderStatus {
  Waiting = "รอรับงาน",
  InProgress = "ระหว่างการจัดส่งสินค้า",
  Verify = "รออนุมัติ",
  Approve = "อนุมัติ"
}

export interface Order {
  car: Car
  drivers: Driver[]
  status: OrderStatus
  orderId: string
  note: string
  destination: Destination
  loadGas: number
  drop: number
  serveGas: number
  deadline: Date
  startTime: Date
  statusHistory: StatusHistory[]
}