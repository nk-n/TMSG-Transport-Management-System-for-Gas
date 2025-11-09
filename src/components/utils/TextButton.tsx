interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  backgroundColor?: string,
  foregroundColor?: string
  border: boolean
  disable: boolean
}

export default function TextButton({ onClick, children, backgroundColor, border, foregroundColor, disable }: ButtonProps) {
  return <>
    {disable ?
      <button
        className={`bg-neutral border-1 border-neutral rounded-xl px-5 py-3 text-white flex-1 w-full`}>{children}</button>
      :
      <button
        onClick={onClick}
        className={`${backgroundColor ?? "bg-background"} ${border ? "border-1 border-neutral" : ""} rounded-xl px-5 py-3 ${foregroundColor ?? ""} flex-1 button-effect w-full`}>{children}</button>
    }
  </>
}
