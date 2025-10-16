import { months, Title } from "@/src/constants/Report"
import TableReportData from "./TableReportData"
import TableReportTitle from "./TableReportTitle"
import { Shipping, ShippingEntry } from "@/src/types/Report"
import clsx from "clsx"
import { JSX } from "react"

interface MainTableProps {
  data: Shipping | null
  title: Title[]
  label: string
}
export default function MainTable({ data, title, label }: MainTableProps) {

  const generateDataEntry = (data: ShippingEntry[]): JSX.Element[] => {
    return data.map((element, index) => {
      return <td className="px-4 py-4 text-left" key={index}>{element.total}</td>
    })
  }

  const getTotalOfThree = (data: Shipping): ShippingEntry[] => {
    const newShipping: ShippingEntry[] = data.shipping8Ton.map((element, index) => {
      return {
        month: element.month,
        total: data.shipping8Ton[index].total + data.shipping10Ton[index].total + data.shippingTrailer[index].total
      }
    })
    return newShipping
  }
  return <div className="flex flex-col gap-5">
    <p className="text-xl font-bold">{label}</p>
    <div className="flex">
      <TableReportTitle>
        {title.map((element, index) => {
          return <tr key={index} className={clsx("hover:bg-gray-50 border-t border-gray-300", {
            "font-bold": element.bold
          })}>
            <td className="px-4 py-4 text-left">{element.details}</td>
            <td className="px-4 py-4 text-left">{element.unit}</td>
          </tr >
        })}
      </TableReportTitle>
      <TableReportData columnName={months}>
        {
          data !== null ?
            <>
              <tr className="hover:bg-gray-50 border-t border-gray-300 font-bold">{generateDataEntry(getTotalOfThree(data))}</tr>
              <tr className="hover:bg-gray-50 border-t border-gray-300">{generateDataEntry(data.shipping8Ton)}</tr>
              <tr className="hover:bg-gray-50 border-t border-gray-300">{generateDataEntry(data.shipping10Ton)}</tr>
              <tr className="hover:bg-gray-50 border-t border-gray-300">{generateDataEntry(data.shippingTrailer)}</tr>
            </>
            :
            <></>
        }
      </TableReportData>
    </div >
  </div>

}