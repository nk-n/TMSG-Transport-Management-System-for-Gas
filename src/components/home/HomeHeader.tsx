import { NotificationIcon, PeopleIcon } from "../icon/Icon";

export default function HomeHeader() {
  return <>
    <div className="flex shadow-md rounded-xl p-8 w-full justify-between bg-white">
      <div>
        <p className="text-3xl font-bold mb-2">TMSG - Transport Management System for Gas</p>
        <p className="text-[var(--neutral-color)]">ระบบจัดการการขนส่งแก๊ส LPG</p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border-1 border-[var(--neutral-color)] rounded-full h-fit p-3 cursor-pointer relative">
          <div className=" text-sm bg-[var(--error-color)] text-white flex justify-center items-center rounded-full absolute px-[9px] py-[3px] -top-[10px] -right-[10px]">2</div>
          <NotificationIcon size={24} />
        </div>
        <div className="border-1 border-[var(--neutral-color)] rounded-full h-fit px-4 py-3 flex gap-2">
          <PeopleIcon size={24} />
          <p>เจ้าหน้าที่จัดส่ง นายรักษิต รุ่งรัตนไชย</p>
        </div>
        <div className="flex flex-col items-end">
          <p>วันที่</p>
          <p>22/7/2568</p>
        </div>
      </div>
    </div>
  </>
}