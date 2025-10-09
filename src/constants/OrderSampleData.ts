import { CarType, CarWeight, DriverCarStatus } from "../types/CarDriver";
import { Order, OrderStatus } from "../types/Order";
import { Status } from "../types/StatusHistory";

export const orderRawData: Order[] = [
  {
    car: {
      id: "PTL.401",
      licensePlate: "กท79-0689",
      type: CarType.SemiTrailer,
      status: DriverCarStatus.Ready,
      weight: CarWeight.TenTon,
      available: false,
    },
    drivers: [
      {
        id: "1",
        name: "สมชาย ใจดี",
        tel: "081-852-3548",
        status: DriverCarStatus.Ready,
        available: false,
      },
      {
        id: "5",
        name: "สมปอง สุขใจ",
        tel: "081-234-5678",
        status: DriverCarStatus.Ready,
        available: false,
      },
    ],
    status: OrderStatus.InProgress,
    orderId: "45839PTL.221เที่ยว1",
    note: "โหลดไม่เกิน 85% / ชั่งปิดที่คลัง",
    destination: {
      name: "Pattaya Beach",
      address: "Beach Rd, Bang Lamung District",
      city: "Pattaya",
      region: "Chonburi",
      route: "Beach Road",
      distance: 3,
      timeUsed: 10,
      isDelete: false,
    },
    loadGas: 10000,
    drop: 1,
    serveGas: 0,
    startTime: new Date("2025-09-12T08:00:00Z"),
    deadline: new Date("2025-09-12T14:30:00Z"),
    statusHistory: [
      {
        status: Status.Start,
        timestamp: new Date("2025-09-25T14:00:00+07:00"), // 08:00 UTC → 15:00 ไทย
      },
      {
        status: Status.Waiting,
        timestamp: new Date("2025-09-25T15:00:00+07:00"), // 08:00 UTC → 15:00 ไทย
      },
      {
        status: Status.Load,
        timestamp: new Date("2025-09-25T15:30:00+07:00"), // 08:30 UTC → 15:30 ไทย
      },
      // {
      //   status: Status.Travel,
      //   timestamp: new Date("2025-09-25T16:00:00+07:00"), // 09:00 UTC → 16:00 ไทย
      // },
      // {
      //   status: Status.Deliver,
      //   timestamp: new Date("2025-09-25T17:00:00+07:00"), // 09:00 UTC → 16:00 ไทย
      // },
      // {
      //   status: Status.Finish,
      //   timestamp: new Date("2025-09-25T18:00:00+07:00"), // 09:00 UTC → 16:00 ไทย
      // },
    ],
  },
];
