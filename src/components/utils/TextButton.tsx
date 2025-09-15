interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  backgroundColor?: string,
  foregroundColor?: string
  border: boolean
}

export default function TextButton({ onClick, children, backgroundColor, border, foregroundColor }: ButtonProps) {
  return <>
    <button
      onClick={onClick}
      className={`${backgroundColor ?? "bg-background"} ${border ? "border-1 border-neutral" : ""} rounded-xl px-5 py-3 cursor-pointer hover:scale-95 transition-all ${foregroundColor ?? ""} flex-1`}>{children}</button>
  </>
}
