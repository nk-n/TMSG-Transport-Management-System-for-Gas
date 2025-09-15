import { DriverCarStatus, Driver } from "../types/CarDriver";

export const driverRawData: Driver[] = [
   {
    id: "1",
    name: "สมชาย ใจดี",
    tel: "081-852-3548",
    status: DriverCarStatus.Ready
  },
  {
    id: "2",
    name: "มะเขือ เทศ",
    tel: "081-578-1235",
    status: DriverCarStatus.NotReady
  },
  {
    id: "3",
    name: "มะเขือ เทศ",
    tel: "081-578-1235",
    status: DriverCarStatus.NotReady,
    reason: "ไม่บอก"
  },
  {
    id: "4",
    name: "มะเขือ พวง",
    tel: "081-578-1235",
    status: DriverCarStatus.InProgress,
    reason: "ไม่บอก"
  },
  {
    id: "5",
    name: "สมปอง สุขใจ",
    tel: "081-234-5678",
    status: DriverCarStatus.Ready
  },
  {
    id: "6",
    name: "สมชาย ดีมาก",
    tel: "081-987-6543",
    status: DriverCarStatus.InProgress
  },
  {
    id: "7",
    name: "มะเขือ แดง",
    tel: "081-555-1212",
    status: DriverCarStatus.NotReady,
    reason: "กำลังลาป่วย"
  },
  {
    id: "8",
    name: "สมหญิง ใจดี",
    tel: "081-777-8888",
    status: DriverCarStatus.Ready
  },
  {
    id: "9",
    name: "มะเขือ เหลือง",
    tel: "081-666-9999",
    status: DriverCarStatus.InProgress,
    reason: "อยู่ระหว่างฝึกอบรม"
  },
  {
    id: "10",
    name: "สมชาย เลิศล้ำ",
    tel: "081-111-2222",
    status: DriverCarStatus.Ready
  }
]