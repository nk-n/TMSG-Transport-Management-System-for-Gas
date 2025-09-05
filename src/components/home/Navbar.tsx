import clsx from "clsx"
import { MenuListType } from "../../types/ContentSectoin"

export default function Navbar({ menuList, currentTab, onTabChange }: { menuList: MenuListType[], currentTab: number, onTabChange: (index: number) => void }) {
  return <>
    <div className="bg-[var(--neutral-second-color)] p-3 flex gap-2 justify-between">
      {menuList.map((element: MenuListType, index: number) => {
        return <button
          onClick={() => {
            onTabChange(index)
          }}
          key={index} className={clsx("transition-all cursor-pointer flex-1 p-3 rounded-xl", {
            "bg-white": currentTab == index,
            "bg-white/0": currentTab != index,
          })}>
          <p className="text-center hover:scale-95 transition-transform">{element.title}</p>
        </button>
      })}
    </div>
  </>
}