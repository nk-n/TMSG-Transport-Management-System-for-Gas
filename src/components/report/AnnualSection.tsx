import clsx from "clsx";
import TableReportData from "./TableReportData";
import TableReportTitle from "./TableReportTitle";
import { months, titleDeliverVolume } from "@/src/constants/Report";

export default function AnnualSection() {
  return <>
    <div className="flex">
      <TableReportTitle>
        {titleDeliverVolume.map((element, index) => {
          return <tr key={index} className={clsx("hover:bg-gray-50 border-t border-gray-300", {
            "font-bold": element.bold
          })}>
            <td className="px-4 py-4 text-left">{element.details}</td>
            <td className="px-4 py-4 text-left">{element.unit}</td>
          </tr >
        })}
      </TableReportTitle>
      <TableReportData columnName={months}>
        <tr className="hover:bg-gray-50 border-t border-gray-300">
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
          <td className="px-4 py-4 text-left">9,000</td>
        </tr>
      </TableReportData>
    </div >
  </>
}