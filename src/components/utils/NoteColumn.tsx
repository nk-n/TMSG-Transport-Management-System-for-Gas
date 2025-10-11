"use client"
import { apiClient } from "@/src/services/apiClient"
import { Car, Driver } from "@/src/types/CarDriver"
import { useEffect, useState } from "react"

interface NoteColumn {
  id: string,
  note: string
  type: string
}

export default function NoteColumn({ id, note, type }: NoteColumn) {
  const [isEdit, setIsEdit] = useState(false)
  const [noteDisplay, setNoteDisplay] = useState("")
  const [noteInput, setNoteInput] = useState("")

  useEffect(() => {
    setNoteDisplay(note)
  }, [])

  const handleAccept = () => {
    updateCarNote()
    setIsEdit(false)
    setNoteDisplay(noteInput)
    setNoteInput("")
  }

  const handleReject = () => {
    setIsEdit(false)
    setNoteInput("")
  }

  const updateCarNote = async () => {
    if (type === "car") {
      const res = await apiClient.put("/metadata/car/note", {
        id: id,
        note: noteInput
      })
      console.log(res.data)
    } else {
      const res = await apiClient.put("/metadata/driver/note", {
        id: id,
        note: noteInput
      })
      console.log(res.data)
    }
  }

  return (
    <>
      <td className="px-4 py-4 text-left  text-wrap">{noteDisplay === "" ? "-" : noteDisplay}</td>
      <td className="px-4 py-4 text-left text-wrap">
        {isEdit && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="หมายเหตุ"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full border border-neutral rounded-xl p-3 bg-white outline-none text-sm"
            />
            <button onClick={() => {
              handleAccept()
            }} className="border-neutral border rounded-xl px-3 cursor-pointer text-sm button-effect ">ตกลง</button>
            <button onClick={() => {
              handleReject()
            }} className="border-neutral border rounded-xl px-3 cursor-pointer text-sm button-effect ">ยกเลิก</button>
          </div>
        )}
        {isEdit ? <></> : <button className="w-fit border border-neutral rounded-xl hover:scale-95 transition-all active:scale-100 px-4 py-2 cursor-pointer text-sm" onClick={() => { setIsEdit(true) }}>ระบุหมายเหตุ</button>}
      </td >
    </>
  )
}
