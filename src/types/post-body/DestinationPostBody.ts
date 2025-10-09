import { RowData } from "../../components/car-driver-management/UploadMetadataPopup";

export interface DestinationPostBody {
  name: string;
  address: string;
  province: string;
  region: string;
  distance: number;
  route: string;
  timeUse: number;
}

export const toDestinationPostBody = (row: RowData): DestinationPostBody => {
  return {
    name: String(row["ชื่อสถานที่"]).trim(),
    address: String(row["ที่อยู่"]).trim(),
    province: String(row["จังหวัด"]).trim(),
    region: String(row["ภูมิภาค"]).trim(),
    route: String(row["เส้นทาง"]).trim(),
    distance: Number(row["ระยะทาง"]),
    timeUse: Number(row["ระยะเวลาที่ใช้เดินทาง"]),
  };
};
