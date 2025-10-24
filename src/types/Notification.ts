import { Order } from "./Order"

export type NotificationType = {
  id: string,
  tel: string,
}

export const toNotificationType = (order: Order) : NotificationType => {
  return {
    id: order.orderId,
    tel: order.drivers[0].tel,
  }
}