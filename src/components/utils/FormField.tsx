import { EyeIcon } from "../icon/Icon"
import InputBox from "./InputBox"

interface FormFieldProps {
  value: string
  onChange: (data: string) => void
  placeholder: string
  password: boolean
  label: string

}
export default function FormField({ value, onChange, placeholder, password, label}: FormFieldProps) {
  return <>
    <div>
      <p className="mb-2">
        {label}
      </p>
      <InputBox
        placeholder={placeholder}
        controller={{
          value: value, handdleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
          }
        }}
        password={password}
        trailing={password ?
          <EyeIcon size={20} />
          :
          <></>
        }
      />
    </div>
  </>
}