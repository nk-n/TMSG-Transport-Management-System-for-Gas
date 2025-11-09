import { RowData } from "../components/car-driver-management/UploadMetadataPopup";

export interface Destination {
  name: string;
  address: string;
  city: string;
  region: string;
  route: string;
  distance: number;
  available: boolean;
  timeUsed: number;
}

export const toDestination = (row: RowData): Destination => {
  return {
    name: String(row["ชื่อสถานที่"]).trim(),
    address: String(row["ที่อยู่"]).trim(),
    city: String(row["จังหวัด"]).trim(),
    region: String(row["ภูมิภาค"]).trim(),
    route: String(row["เส้นทาง"]).trim(),
    distance: Number(row["ระยะทาง"]),
    available: true,
    timeUsed: Number(row["ระยะเวลาที่ใช้เดินทาง"]),
  };
};
