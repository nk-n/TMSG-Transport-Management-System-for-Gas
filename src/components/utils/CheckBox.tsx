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
        "bg-primary border-1 border-primary cursor-pointer ": check && !disable,
        "border-1 border-neutral cursor-pointer": !check && !disable,
        "bg-neutral border-1 border-neutral": disable
      })}>
      <CheckIcon size={iconSize} />
    </button>
  </>
}