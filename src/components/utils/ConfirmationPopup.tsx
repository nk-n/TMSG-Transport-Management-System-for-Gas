import clsx from "clsx";
import { CloseIcon } from "../icon/Icon";

interface ConfirmmationPopupProps {
  isPopupOpen: boolean
  closePopup: () => void
  deleteData: () => void
}
export default function ConfirmmationPopup({ isPopupOpen, closePopup, deleteData }: ConfirmmationPopupProps) {
  return (
    <div className={clsx("fixed bg-foreground/25 inset-0 flex justify-center items-center z-10 transition-all", {
      "opacity-0 pointer-events-none": !isPopupOpen
    })}>
      <div className={clsx("transition-all bg-background rounded-xl px-10 py-8 flex flex-col items-center max-h-[700px] overflow-y-scroll overflow-hidden scrollbar-hide gap-4 relative", {
        "scale-90": !isPopupOpen
      })}>
        <button onClick={() => {
          closePopup()
        }}>
          <CloseIcon size={15} className="stroke-foreground absolute right-5 top-5 stroke-2 cursor-pointer hover:scale-95 transition-all" />
        </button>
        <p className="text-3xl font-bold">ยืนยันการลบข้อมูล</p>
        <p>ยืนการลบข้อมูลออกจากระบบ (ข้อมูลนี้จะหายไปตลอดการ)</p>
        <div className="flex gap-3 w-full mt-7">
          <button className="flex-1 bg-error rounded-xl text-white py-3 button-effect" onClick={() => {
            deleteData()
            closePopup()
          }}>ยืนยัน</button>
          <button className="flex-1 border border-neutral rounded-xl py-3 button-effect" onClick={() => {
            closePopup()
          }}>ยกเลิก</button>
        </div>
      </div>
    </div >
  )
}