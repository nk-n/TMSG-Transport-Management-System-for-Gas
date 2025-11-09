import React, { useState } from "react"
import { Driver } from "@/src/types/CarDriver"

type User = {
  id: number
  name: string
  email: string
  role: string
}

interface TableProps {
  columnName: string[]
  children: React.ReactNode
}

export default function TableReportData({ columnName, children }: TableProps) {
  const [allCheck, setAllCheck] = useState(false)
  return (
    <div className="rounded-tr-xl rounded-br-xl border border-gray-300 max-h-[500px] overflow-auto flex-1">
      <table className="bg-background min-w-max w-full">
        <thead className="bg-neutral-second text-neutral sticky top-0">
          <tr>
            {columnName.map((element, index) => {
              return (
                <th key={index} className="px-4 py-4 text-left bg-foreground text-white">{element}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className="">
          {children}
        </tbody>
      </table>
    </div>

  )
}
