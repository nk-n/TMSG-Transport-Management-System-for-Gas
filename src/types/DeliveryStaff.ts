import { RowData } from "../components/car-driver-management/UploadMetadataPopup";

export interface DeliveryStaff {
  id: string;
  name: string;
  tel: string;
}

export const toDeliveryStaff = (data: RowData): DeliveryStaff => {
  return {
    id: data["id"],
    name: data["name"],
    tel: data["phone"],
  };
};
