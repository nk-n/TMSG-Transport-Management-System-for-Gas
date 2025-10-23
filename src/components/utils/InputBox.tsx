import { JSX, useState } from "react";

interface InputBoxProps {
  leading?: JSX.Element,
  trailing?: JSX.Element,
  placeholder: string,
  controller: {
    value: string,
    handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  },
  password?: boolean
}

export default function InputBox({ leading, trailing, placeholder, controller, password }: InputBoxProps) {
  const [hide, setHide] = useState(true)
  return <>
    <div className="bg-background flex items-center focus-within:border-gray-500 border border-gray-200 rounded-xl px-3 flex-1 text-sm w-full">
      {leading}
      <input type={hide && password ? "password" : "text"} placeholder={placeholder} value={controller.value} onChange={controller.handdleChange} className="pl-3 py-3 outline-none flex-1" />
      <button className="button-effect" onClick={() => {
        if (password) {
          setHide(!hide)
        }
      }}>
        {trailing}
      </button>
    </div>
  </>
}