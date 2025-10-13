import { RowData } from "@/src/components/car-driver-management/UploadMetadataPopup";

export interface OrderPostBody {
  id: string;
  deadline: string;
  gas_amount: number;
  source: string;
  destination: string;
  drop: number;
  note: string;
  car_id: string;
  tel1: string;
  tel2: string;
  load_time: string;
}

export const toOrderPostBody = (row: RowData): OrderPostBody => {
  return {
    id: row["เลขออเดอร์"].trim(),
    deadline: row["เวลาที่ส่งมอบ"].trim(),
    gas_amount: Number(row["น้ำหนักบรรทุก"]),
    source: row["ต้นทาง"].trim(),
    destination: row["ปลายทาง"].trim(),
    drop: Number(row["drop"]),
    note: row["หมายเหตุ"].trim(),
    car_id: row["เบอร์รถ"].trim(),
    tel1: row["เบอร์พนักงานขับรถ1"].trim(),
    tel2:
      row["เบอร์พนักงานขับรถ2"].trim() === "-" ||
      row["เบอร์พนักงานขับรถ2"].trim() === ""
        ? ""
        : row["เบอร์พนักงานขับรถ2"],
    load_time: row["เวลาเข้าโหลด"].trim(),
  };
};
