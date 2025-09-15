import { DriverCarStatus, Driver } from "@/src/types/CarDriver"
import CheckBox from "../../utils/CheckBox"
import clsx from "clsx"
import CarDriverCard from "../CarDriverCard"

export default function DriverCardList({ data, checkMap, setCheckMap }: { data: Driver[], checkMap: { [id: string]: boolean }, setCheckMap: (newCheckMap: { [id: string]: boolean }) => void }) {
  return <>
    <div className="grid grid-cols-4 gap-4">
      {data.map((element: Driver, index: number) => {
        return (
          <CarDriverCard<Driver> element={element} checkMap={checkMap} setCheckMap={setCheckMap} key={element.id}>
            <p>{element.name}</p>
            <p className="text-sm text-neutral">{element.tel}</p>
          </CarDriverCard>
        )
      })}
    </div>
  </>
}