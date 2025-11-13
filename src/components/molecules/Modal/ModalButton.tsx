import { title } from "process"
import { useState } from "react"

export const ModalButton = ({ className, children, icon, id}: { className: string, children: React.ReactNode, icon: React.JSX.Element, id: string }) => {

    const [open, setOpen] = useState(false)

    return (
        <div id={id} className="relative">
            <button
                title={id}
                type="submit"
                className={className}
                onClick={() => setOpen(!open)}
            >
                {icon}
            </button>
            {open && <div
                className={`absolute right-0 mt-2 w-auto bg-white shadow-2xl border border-gray-300 rounded-xl px-3 py-3 flex flex-col gap-4 transition-all duration-200 
  ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
            >
                {children}
            </div>}
        </div>
    )
}