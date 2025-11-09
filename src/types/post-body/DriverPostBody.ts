import { RowData } from "../../components/car-driver-management/UploadMetadataPopup";
import { CarType, CarWeight, DriverCarStatus } from "../CarDriver";

export interface DriverPostBody {
  tel: string;
  name: string;
}

export const toDriverPostBody = (row: RowData): DriverPostBody => {
  return {
    tel: row["เบอร์ติดต่อ"],
    name: row["ชื่อ-สกุล"],
  };
};
