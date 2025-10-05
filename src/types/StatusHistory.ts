export enum Status {
  Start = "เริ่มงาน",
  Waiting = "รอโหลดสินค้า",
  Load = "โหลดสินค้า",
  Travel = "เดินทางไปส่งสินค้า",
  Deliver = "ส่งสินค้า",
  Finish = "ส่งสำเร็จ",
  End = "จบงาน"
}

export interface StatusHistory {
  status: Status
  timestamp: Date
}