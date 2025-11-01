import { JSX } from "react"

export const Button = ({ isSubmitting, isValid, isSuccess, value }: { isSubmitting: boolean, isValid: boolean, isSuccess: boolean, value: string | JSX.Element }) => {
    return (
        <button type="submit" disabled={!isValid || isSubmitting || isSuccess}
            className={`p-2 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${!isValid || isSubmitting || isSuccess
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                }`} style={{ viewTransitionName: 'button-auth' }}>{value}</button>
    )
}