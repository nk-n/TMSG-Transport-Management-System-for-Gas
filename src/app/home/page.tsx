import HomeHeader from "@/src/components/home/HomeHeader";
import Navbar from "@/src/components/home/Navbar";
import StatusBar from "@/src/components/home/StatusBar";

export default function HomePage() {
  return <>
    <div className="p-5 bg-[#F9FBFA] flex flex-col gap-5">
      <HomeHeader />
      <StatusBar />
      <Navbar />
    </div>
  </>
}