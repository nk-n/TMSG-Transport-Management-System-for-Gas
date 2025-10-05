import { Car, CarType, CarWeight, DriverCarStatus } from "../types/CarDriver";

export const carRawData: Car[] = [
  { id: "PTL.401", licensePlate: "กท79-0689", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.402", licensePlate: "กท79-1245", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.NotReady, reason: "กำลังซ่อมเครื่องยนต์", isDelete: false },
  { id: "PTL.403", licensePlate: "กท79-5678", type: CarType.SemiTrailer, weight: CarWeight.Trailer, status: DriverCarStatus.InProgress, isDelete: false },
  { id: "PTL.404", licensePlate: "กท79-9834", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.405", licensePlate: "กท79-4521", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.406", licensePlate: "กท79-7789", type: CarType.SemiTrailer, weight: CarWeight.Trailer, status: DriverCarStatus.NotReady, reason: "คนขับลาป่วย", isDelete: false },
  { id: "PTL.407", licensePlate: "กท79-1134", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.InProgress, isDelete: false },
  { id: "PTL.408", licensePlate: "กท79-3345", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.409", licensePlate: "กท79-9021", type: CarType.SemiTrailer, weight: CarWeight.Trailer, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.410", licensePlate: "กท79-6654", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.NotReady, reason: "รอเปลี่ยนยาง", isDelete: false },
  { id: "PTL.411", licensePlate: "กท79-2398", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.InProgress, isDelete: false },
  { id: "PTL.412", licensePlate: "กท79-8741", type: CarType.SemiTrailer, weight: CarWeight.Trailer, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.413", licensePlate: "กท79-1402", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.414", licensePlate: "กท79-7850", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.NotReady, reason: "อยู่ระหว่างตรวจสภาพรถ", isDelete: false },
  { id: "PTL.415", licensePlate: "กท79-5544", type: CarType.SemiTrailer, weight: CarWeight.Trailer, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.416", licensePlate: "กท79-3312", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.InProgress, isDelete: false },
  { id: "PTL.417", licensePlate: "กท79-6677", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.418", licensePlate: "กท79-9088", type: CarType.SemiTrailer, weight: CarWeight.Trailer, status: DriverCarStatus.NotReady, reason: "รอใบอนุญาตขนส่งสินค้าอันตราย", isDelete: false },
  { id: "PTL.419", licensePlate: "กท79-2234", type: CarType.TenWheel, weight: CarWeight.EightTon, status: DriverCarStatus.Ready, isDelete: false },
  { id: "PTL.420", licensePlate: "กท79-9911", type: CarType.TenWheel, weight: CarWeight.TenTon, status: DriverCarStatus.InProgress, isDelete: false },
];
