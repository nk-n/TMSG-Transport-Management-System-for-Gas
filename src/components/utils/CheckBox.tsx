'use client'
import { CheckIcon } from "../icon/Icon"
import clsx from "clsx"

export default function CheckBox({ iconSize, disable, check, setCheck }: { iconSize: number, disable: boolean, check: boolean, setCheck: () => void }) {
  return <>
    <button
      disabled={disable}
      onClick={() => {
        setCheck()
      }} className={clsx(`transition-colors rounded  p-1`, {
        "bg-[var(--primary-color)] border-1 border-[var(--primary-color)] cursor-pointer ": check && !disable,
        "border-1 border-[var(--neutral-color)] cursor-pointer": !check && !disable,
        "bg-[var(--neutral-color)] border-1 border-[var(--neutral-color)]": disable
      })}>
      <CheckIcon size={iconSize} />
    </button>
  </>
}