import { Icon } from "@/components/atoms/Icon/Icons"
import { BarProgress } from "@/components/molecules/Stats/BarProgress"
import { TriviaView, TriviaViewEx } from "@/lib/types/ts/Quest"
import { formatDate } from "@/lib/utils/DateFormat"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export const CardView = (data: TriviaViewEx) => {

    const router = useRouter()

    return (
        <div id="card" onClick={() => router.push(`/trivia/${data.id}`)} data-id={data.id} key={data.id} className="cursor-pointer p-5 shadow-md hover:bg-gray-50 bg-white border-1 basis-[calc((100%-3rem)/4)] flex gap-3 border-gray-300 rounded-xl ">
            <div className="flex-5 min-w-0 flex flex-col justify-between">
                <BarProgress correct={data.answer.correct} questions={data.questions} />
                {/* Title */}
                <div id="title" className="grow flex items-center box-border justify-center">
                    <span className="font-semibold text-center text-gray-600  text-sm line-clamp-4">{data.title}</span>
                </div>
                {/* Data Information */}
                <div id="data-inf" className="scroll-x flex items-center gap-3 overflow-x-auto">
                    <div className="h-full  text-center text-gray-600 flex items-center rounded-xl gap-3">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {data.id}
                        </span>
                    </div>
                    <div className="h-full  text-center text-gray-600 flex items-center rounded-xl gap-3">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full truncate">
                            {formatDate(new Date(data.createAt))}
                        </span>
                    </div>
                    <div className="h-full text-center text-gray-600 flex items-center  rounded-xl gap-3">
                        <span className="text-sm text-gray-500">Categoria:</span>
                        <span className="bg-blue-100 truncate text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {data.category}
                        </span>
                    </div>
                    <div className="h-full  text-center text-gray-600 flex items-center rounded-xl gap-3">
                        <span className="text-sm text-gray-500">Difcultad:</span>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {data.difficulty}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col answer gap-3 h-full">
                {/* Stats Total */}
                <div className=" py-1 px-2 h-full  flex items-center  gap-1 text-white bg-gray-500 rounded-xl  ">
                    <Icon.Neutral className="w-5 h-5" />
                    <span className="text-base">{data.questions}</span>
                </div>
                {/* Stats Correct */}
                <div className=" py-1 px-2  h-full flex items-center  gap-1 text-white bg-blue-500  rounded-xl  ">
                    <Icon.Check className="w-5 h-5" />
                    <span className="text-base">{data.answer.correct}</span>
                </div>
                {/* Stats Incorrect */}
                <div className=" py-1 px-2  h-full flex items-center  gap-1 text-white bg-red-500 rounded-xl  ">
                    <Icon.Incorrect className="w-5 h-5" />
                    <span className="text-base">{data.answer.incorrect}</span>
                </div>
            </div>
        </div>
    )
}
