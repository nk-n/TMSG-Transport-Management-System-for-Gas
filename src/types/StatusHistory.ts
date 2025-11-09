export enum Status {
  Start = "เริ่มงาน",
  Waiting = "รอโหลดสินค้า",
  Load = "โหลดสินค้า",
  Travel = "เดินทางส่ง",
  Deliver = "ลงสินค้า",
  Finish = "ส่งสำเร็จ",
  End = "จบงาน"
}

export function toStatus(value: string): Status {
  switch (value) {
    case Status.Start:
      return Status.Start;
    case Status.Waiting:
      return Status.Waiting;
    case Status.Load:
      return Status.Load;
    case Status.Travel:
      return Status.Travel;
    case Status.Deliver:
      return Status.Deliver;
    case Status.Finish:
      return Status.Finish;
    case Status.End:
      return Status.End;
    default:
      return Status.Start;
  }
}


export interface StatusHistory {
  status: Status
  timestamp: Date
}