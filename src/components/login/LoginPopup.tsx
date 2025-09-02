import { EnvelopeIcon, EyeIcon, LockIcon } from "../icon/Icon";

export default function LoginPopup() {
  return <>
    <div className="bg-black/35 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white w-full max-w-[500px] rounded-md flex flex-col p-6 gap-3">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-[var(--primary-color)] font-bold text-3xl">เข้าสู่ระบบ</p>
          <p>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div>
            <p className="mb-2">
              รหัสพนักงาน
            </p>
            <div className="flex items-center focus-within:border-gray-500 border border-gray-200 rounded px-3">
              <EnvelopeIcon size={24} />
              <input type="text" placeholder="รหัสพนักงาน" className="pl-3 py-3 outline-none flex-1" />
            </div>
          </div>
          <div>
            <div>
              <p className="mb-2">
                รหัสผ่าน
              </p>
              <div className="flex items-center focus-within:border-gray-500 border border-gray-200 rounded px-3">
                <LockIcon size={24} />
                <input type="text" placeholder="รหัสของคุณ" className="pl-3 py-3 outline-none flex-1" />
                <EyeIcon size={24} className=" cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <input type="checkbox" className="h-5 w-5 rounded-2xl cursor-pointer" />
              <p>จดจำการเข้าสู่ระบบ</p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer bg-[var(--primary-color)] rounded py-3 text-white hover:scale-95 transition-transform mt-8">เข้าสู่ระบบ</button>
      </div>
    </div>
  </>
}