export interface Title {
    details: string,
    unit: string,
    bold: boolean
  }
  export const titleDeliverVolume: Title[] = [
    {
      details: "ยอดขนรวม",
      unit: "ตัน",
      bold: true
    },
    {
      details: "ยอดขน สิบล้อ 8 ตัน",
      unit: "ตัน",
      bold: false
    },
    {
      details: "ยอดขน สิบล้อ 10 ตัน",
      unit: "ตัน",
      bold: false
    },
    {
      details: "ยอดขน เทรลเลอร์",
      unit: "ตัน",
      bold: false
    },
    {
      details: "ยอดขน สิบล้อ 8 ตัน",
      unit: "ตัน / คัน",
      bold: false
    },
    {
      details: "ยอดขน สิบล้อ 10 ตัน",
      unit: "ตัน / คัน",
      bold: false
    },
    {
      details: "ยอดขน เทรลเลอร์",
      unit: "ตัน / คัน",
      bold: false
    },
  ];
  export const months: string[] = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ]