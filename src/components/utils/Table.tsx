import React, { useState } from "react"
import CheckBox from "./CheckBox"
import { Driver } from "@/src/types/CarDriver"

type User = {
  id: number
  name: string
  email: string
  role: string
}

interface TableProps<T> {
  haveCheck: boolean
  columnName: string[]
  children: React.ReactNode
  checkMap?: { [id: string]: boolean } | undefined
  setCheckMap?: (newCheckMap: { [id: string]: boolean }) => void
  idData?: string[]
}

export default function Table<T>({ haveCheck, columnName, children, idData, checkMap, setCheckMap }: TableProps<T>) {
  const [allCheck, setAllCheck] = useState(false)
  return (
    <div className="rounded-xl border border-gray-300 max-h-[500px] overflow-auto">
      <table className="bg-background min-w-max w-full">
        <thead className="bg-neutral-second text-neutral sticky top-0">
          <tr>
            {haveCheck && idData != undefined ?
              <th className="px-4 py-4 text-center">
                <CheckBox iconSize={15} disable={false} check={allCheck} setCheck={() => {
                  if (checkMap != undefined) {
                    let checkMapKeys = Object.keys(checkMap)
                    let newCheckMap = checkMap
                    checkMapKeys.forEach((element) => {
                      if (idData.includes(element)) {
                        return newCheckMap[element] = !allCheck
                      }
                    })
                    if (setCheckMap != undefined) {
                      setCheckMap(newCheckMap)
                    }
                    setAllCheck(!allCheck)
                  }

                }} />
              </th>
              : <></>
            }
            {columnName.map((element, index) => {
              return (
                <th key={index} className="px-4 py-4 text-left">{element}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className="">
          {children}
          {/* <tr key={rowIndex} className="hover:bg-gray-50 border-t border-gray-300">
            <td key={String(key)} className="px-4 py-4 text-center">{String(element[key])}</td>
          </tr> */}
        </tbody>
      </table>
    </div>

  )
}
