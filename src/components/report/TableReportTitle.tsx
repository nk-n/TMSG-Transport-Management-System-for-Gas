import React, { useState } from "react"
import { Driver } from "@/src/types/CarDriver"

type User = {
  id: number
  name: string
  email: string
  role: string
}

interface TableProps {
  children: React.ReactNode
}

export default function TableReportTitle({ children }: TableProps) {
  return (
    <div className="rounded-tl-xl rounded-bl-xl border-1 border-r-0 border-gray-300 max-h-[500px] overflow-auto">
      <table className="bg-background min-w-max w-full">
        <thead className="bg-neutral-second text-neutral sticky top-0">
          <tr>
            <th className="px-4 py-4 text-left bg-success text-white ">รายละเอียด</th>
            <th className="px-4 py-4 text-left bg-inprogress text-white">หน่วย</th>
          </tr>
        </thead>
        <tbody className="">
          {children}
        </tbody>
      </table>
    </div>

  )
}
