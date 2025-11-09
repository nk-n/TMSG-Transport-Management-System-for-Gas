import { RowData } from "../../components/car-driver-management/UploadMetadataPopup";
import { CarType, CarWeight, DriverCarStatus } from "../CarDriver";

export interface CarPostBody {
  id: string;
  status: DriverCarStatus;
  license: string;
  type: CarType;
  weight: CarWeight;
}

export const toCarPostBody = (row: RowData): CarPostBody => {
  let carType: string = String(row["ประเภทรถ"]).trim();
  let carWeight: string = String(row["น้ำหนัก"]).trim();
  return {
    id: row["เบอร์รถ"].trim(),
    status: DriverCarStatus.Ready,
    license: row["ทะเบียนรถ"],
    type:
      carType === "หัวลาก"
        ? CarType.Tractor
        : carType === "สิบล้อ"
        ? CarType.TenWheel
        : CarType.SemiTrailer,
    weight:
      carWeight === "8"
        ? CarWeight.EightTon
        : carWeight === "10"
        ? CarWeight.TenTon
        : CarWeight.Trailer,
  };
};
