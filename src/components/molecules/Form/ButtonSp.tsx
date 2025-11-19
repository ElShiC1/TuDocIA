

export const ButtonSp = ({ value, onClick, icon, className, isSubmitting, id }: { id?: string, value?: string, onClick: () => void, icon?: React.JSX.Element, className?: string, isSubmitting?: boolean }) => {
    return (
        <button
            title={id}
            id={id}
            onClick={onClick}
            disabled={isSubmitting}
            className={`${className} p-2 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2  `}>
            {icon ?? value}
        </button>
    )
}