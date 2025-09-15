import { Car, DriverCarStatus } from "@/src/types/CarDriver"
import CheckBox from "../../utils/CheckBox"
import clsx from "clsx"
import CarDriverCard from "../CarDriverCard"

export default function CarCardList({ data, checkMap, setCheckMap }: { data: Car[], checkMap: { [id: string]: boolean }, setCheckMap: (newCheckMap: { [id: string]: boolean }) => void }) {
  return <>
    <div className="grid grid-cols-4 gap-4">
      {data.map((element: Car) => {
        return (
          <CarDriverCard<Car> element={element} checkMap={checkMap} setCheckMap={setCheckMap} key={element.id}>
            <p>{element.id}</p>
            <p className="text-sm text-neutral">{element.licensePlate}</p>
            <p className="text-sm text-neutral">{element.type}</p>
          </CarDriverCard>
        )
      })}
    </div>
  </>
}