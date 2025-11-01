import { getPercentajeTotal } from "@/lib/utils/Percentaje"


export const BarProgress = (data: { correct: number, questions: number }) => {

    const percentaje = getPercentajeTotal(data.correct, data.questions)

    return (
        <div id="percentaje" className="h-auto flex gap-3">
            <span className="font-bold text-blue-500 text-sm">{percentaje}%</span>
            <div className="bar flex-auto border-1 border-gray-300 rounded-xl bg-gray-100 overflow-hidden">
                <div className={`bar-progress bg-blue-500 h-full`} style={{width: `${percentaje}%`}}></div>
            </div>
        </div>
    )
}
