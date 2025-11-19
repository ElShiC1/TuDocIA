import { Icon } from "@/components/atoms/Icon/Icons"

export const Stats = ({questions, correct, incorrect}: {questions: number, correct: number, incorrect: number}) => {
    return (
        <>
            <div className=" py-1 px-2 h-full  flex items-center  gap-1 text-white bg-gray-500 dark:bg-gray-700 rounded-xl  ">
                <Icon.Neutral className="w-5 h-5" />
                <span className="text-base">{questions}</span>
            </div>
            {/* Stats Correct */}
            <div className=" py-1 px-2  h-full flex items-center  gap-1 text-white bg-blue-500 dark:bg-blue-800/70  rounded-xl  ">
                <Icon.Check className="w-5 h-5" />
                <span className="text-base">{correct}</span>
            </div>
            {/* Stats Incorrect */}
            <div className=" py-1 px-2  h-full flex items-center  gap-1 text-white bg-red-500 dark:bg-red-700/70 rounded-xl  ">
                <Icon.Incorrect className="w-5 h-5" />
                <span className="text-base">{incorrect}</span>
            </div>



        </>

    )
}