import { RowData } from "../components/car-driver-management/UploadMetadataPopup";
import { Car, Driver } from "./CarDriver";
import { Destination } from "./Destination";
import { StatusHistory, toStatus } from "./StatusHistory";

export enum OrderStatus {
  Waiting = "รอรับงาน",
  InProgress = "ระหว่างจัดส่งสินค้า",
  Verify = "รออนุมัติ",
  Approve = "อนุมัติ",
}

export function toOrderStatus(value: string): OrderStatus {
  switch (value) {
    case OrderStatus.Waiting:
      return OrderStatus.Waiting;
    case OrderStatus.InProgress:
      return OrderStatus.InProgress;
    case OrderStatus.Verify:
      return OrderStatus.Verify;
    case OrderStatus.Approve:
      return OrderStatus.Approve;
    default:
      return OrderStatus.Waiting;
  }
}

export interface OrderDriver {
  name: string;
  tel: string;
}

export interface Order {
  carId: string;
  drivers: OrderDriver[];
  status: OrderStatus;
  orderId: string;
  note: string;
  destination: string;
  timeUse: number;
  loadGas: number;
  drop: number;
  serveGas: number;
  deadline: Date;
  startTime: Date;
  statusHistory: StatusHistory[];
}
export interface OrderResponse {
  car_id: string;
  drivers: { name: string; tel: string }[];
  order_status: string;
  order_id: string;
  deadline: string;
  load_time: string;
  note: string;
  destination: string;
  time_use: string;
  gas_amount: number;
  drop: number;
  gas_send: number;
  delivery_status: { status: string; timestamp: string }[];
}

export const toOrder = (data: OrderResponse): Order => {
  return {
    orderId: data.order_id,
    carId: data.car_id,
    drivers: data.drivers.map((element) => {
      return {
        name: element.name,
        tel: element.tel,
      };
    }),
    status: toOrderStatus(data.order_status),
    note: data.note,
    destination: data.destination,
    loadGas: data.gas_amount,
    drop: data.drop,
    serveGas: data.gas_send,
    deadline: new Date(data.deadline),
    timeUse: Number(data.time_use),
    startTime: new Date(data.load_time),
    statusHistory: data.delivery_status.map((element) => {
      return {
        status: toStatus(element.status),
        timestamp: new Date(element.timestamp),
      };
    }),
  };
};
