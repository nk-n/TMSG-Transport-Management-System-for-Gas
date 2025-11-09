import clsx from "clsx"
import { JSX } from "react"

interface TabBarProps {
  currentTab: number,
  setCurrentTab: (newTab: number) => void
  elementTab: JSX.Element[]
}
export default function TabBar({ currentTab, setCurrentTab, elementTab }: TabBarProps) {
  return <>
    <div className="flex gap-3 bg-neutral-second py-3 px-2 rounded-xl">
      {elementTab.map((element, index) => {
        return <button key={index} className={clsx("flex-1 flex justify-center cursor-pointer p-3 rounded-xl transition-all outline-none", {
          "bg-white": currentTab == index
        })} onClick={() => {
          setCurrentTab(index)
        }}>
          <div className="transition-all hover:scale-95">
            {element}
          </div>
        </button>
      })}

    </div>
  </>
}