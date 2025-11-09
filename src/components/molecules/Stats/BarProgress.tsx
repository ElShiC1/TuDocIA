import { getPercentajeTotal } from "@/lib/utils/Percentaje"


export const BarProgress = (data: { correct?: number, questions?: number, percentajeReal?: number}) => {

    const percentaje =  getPercentajeTotal(data.correct || 0, data.questions || 0)
    return (
        <div id="percentaje" className="h-6 flex gap-3 items-center flex-auto grow max-h-6.5">
            <span className="font-bold text-blue-500 text-sm">{Math.round(data.percentajeReal ?? percentaje)}%</span>
            <div className=" bar flex-auto h-full border-1 border-gray-300 rounded-xl bg-gray-100 overflow-hidden transition-all duration-300">
                <div className={`bar-progress bg-blue-500 h-full`} style={{width: `${data.percentajeReal ?? percentaje}%`}}></div>
            </div>
        </div>
    )
}
