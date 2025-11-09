import ContentSection from "@/src/components/home/ContentSection";
import HomeHeader from "@/src/components/home/HomeHeader";
import StatusBar from "@/src/components/home/StatusBar";

export default function HomePage() {
  return <>
    <div className="h-screen overflow-y-scroll scrollbar-hide" >
      <div className="p-5 bg-[#F9FBFA] flex flex-col gap-5">
        <HomeHeader />
        <StatusBar />
        <ContentSection />
      </div>
    </div>
  </>
}