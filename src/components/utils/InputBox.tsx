import { JSX } from "react";

export default function InputBox({ leading, trailing, placeholder, controller }: { leading?: JSX.Element, trailing?: JSX.Element, placeholder: string, controller: { value: string, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => void } }) {
  return <>
    <div className="bg-background flex items-center focus-within:border-gray-500 border border-gray-200 rounded-xl px-3 flex-1 text-sm w-full">
      {leading}
      <input type="text" placeholder={placeholder} value={controller.value} onChange={controller.handdleChange} className="pl-3 py-3 outline-none flex-1" />
      {trailing}
    </div>
  </>
}