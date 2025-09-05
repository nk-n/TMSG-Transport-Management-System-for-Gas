import { JSX } from "react";
import { BusIcon, ErrorIcon, SendIcon, SuccessIcon } from "../icon/Icon";

const statusItems: { title: string, amount: number, icon: JSX.Element, textColor: string }[] = [
  { title: "รถทั้งหมด", amount: 4, icon: <BusIcon size={42} />, textColor: "text-[var(--foreground)]" },
  { title: "กำลังจัดส่ง", amount: 0, icon: <SendIcon size={42} color="var(--primary-color)" />, textColor: "text-[var(--primary-color)]" },
  { title: "เสร็จสิ้นแล้ว", amount: 1, icon: <SuccessIcon size={42} color="var(--success-color)" />, textColor: "text-[var(--success-color)]" },
  { title: "ล่าช้า", amount: 2, icon: <ErrorIcon size={42} color="var(--error-color)" />, textColor: "text-[var(--error-color)]" }
]

export default function StatusBar() {
  return <>
    <div className="flex gap-3">
      {statusItems.map((element: { title: string, amount: number, icon: JSX.Element, textColor: string }, index: number) => {
        return <div key={index} className="flex items-center flex-1 justify-between p-5 rounded-xl bg-white border-[1px] border-[var(--neutral-color)]">
          <div>
            <p className="text-[var(--neutral-color)]">{element.title}</p>
            <p className={`text-3xl font-bold ${element.textColor}`}>{element.amount}</p>
          </div>
          {element.icon}
        </div>
      })}
    </div>
  </>
}