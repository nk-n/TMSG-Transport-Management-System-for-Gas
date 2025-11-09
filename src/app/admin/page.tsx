import AdminHeader from "@/src/components/admin/AdminHeader";
import AdminSection from "@/src/components/admin/AdminSection";

export default function AdminPage() {
  return <>
    <div>
      <div className="h-screen overflow-y-scroll scrollbar-hide" >
        <div className="p-5 bg-[#F9FBFA] flex flex-col gap-5">
          <AdminHeader />
          <AdminSection />
        </div>
      </div>
    </div>
  </>
}