"use client"
import TabBar from "@/src/components/car-driver-management/TabBar";
import { ArrowHeadDownIcon, LeftArrowIcon } from "@/src/components/icon/Icon";
import AnnualSection from "@/src/components/report/AnnualSection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const router = useRouter()
  const startYear: number = 2025

  // const menuList = [
  //   <AnnualSection />
  // ]


  const [currentSelectYear, setCurrentSelectYear] = useState<string>("")
  const [optionYear, setOptionYear] = useState<number[]>([])
  const [currentTab, setCurrentTab] = useState(0)

  useEffect(() => {
    setCurrentSelectYear((new Date()).getFullYear().toString())
    generateYear()

  }, [])

  const generateYear = () => {
    let yearArray: number[] = []
    for (let i = 0; i < 100; i++) {
      yearArray.push(startYear + i)
    }
    setOptionYear([...yearArray])
  }

  return <>
    <div className="p-5">
      <button onClick={() => {
        router.back()
      }}>
        <LeftArrowIcon size={30} className=" stroke-foreground cursor-pointer" />
      </button>
      <p className="text-3xl font-bold w-full text-center">รายงานข้อมูลจัดส่ง</p>
      <div className="flex w-full justify-center items-center gap-3 mt-4 mb-14">
        <p className="text-neutral">ข้อมูลประจำปี</p>
        <div className="relative">
          <select id="year" value={currentSelectYear} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setCurrentSelectYear(e.target.value) }} className="w-[130px] pl-2  py-2 border-1 border-neutral rounded-xl text-left outline-none cursor-pointer appearance-none">
            {optionYear.map((element, index) => {
              return <option key={index} value={element}>
                {element}
              </option>
            })}
          </select>
          <ArrowHeadDownIcon size={20} className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none" />
        </div>
      </div>
      <div className="max-w-[1500px] mx-auto flex flex-col gap-10">
        {/* <TabBar currentTab={currentTab} setCurrentTab={(value: number) => {
          setCurrentTab(value)
        }} elementTab={[
          <div className="flex gap-3 items-center justify-center">
            <p>รายงานข้อมูลประจำปี</p>
          </div>,
          <div className="flex gap-3 items-center justify-center">
            <p>รายงานข้อมูลประจำเดือน</p>
          </div>
        ]} /> */}
        {/* {menuList[currentTab]} */}
        <AnnualSection />
      </div>
    </div>
  </>
}