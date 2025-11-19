import { title } from "process"
import { useState } from "react"

export const ModalButton = ({ className, children, icon, id, flex, gap }: { className: string, children: React.ReactNode, icon: React.JSX.Element, id: string, flex?: boolean, gap?: number}) => {

    const [open, setOpen] = useState(false)

    return (
        <div id={id} className="relative h-0">
            <button
                title={id}
                type="submit"
                className={className}
                onClick={() => setOpen(!open)}
            >
                {icon}
            </button>
            {open && <div 
                className={`absolute z-5 right-0 mt-2 w-auto bg-white shadow-2xl border border-gray-300 dark:border-neutral-800 dark:bg-neutral-900 rounded-xl px-3 py-3 pt-5 flex ${flex ? '' : "flex-col"}  gap-${gap ?? 6} transition-all duration-200 
  ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`} 
            >
                {children}
            </div>}
        </div>
    )
}