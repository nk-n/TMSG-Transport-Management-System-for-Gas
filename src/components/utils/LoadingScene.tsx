import clsx from "clsx"

interface LoadingSceneProps {
  loading: boolean
}

export default function LoadingScene({ loading }: LoadingSceneProps) {
  return <div className={clsx("fixed inset-0 bg-black/70 flex justify-center items-center flex-col gap-3 z-50", {
    "opacity-0 pointer-events-none": !loading
  })}>
    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    <p className="text-background text-2xl">กำลังนำเข้าข้อมูล...</p>
  </div>
}