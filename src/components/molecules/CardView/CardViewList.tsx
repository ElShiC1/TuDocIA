import { TriviaView, TriviaViewEx } from "@/lib/types/ts/Quest"
import { CardView } from "./CardView"

export const CardViewList = ({ data }: { data: TriviaViewEx[] }) => {



    return (
        <div className="grow flex flex-col gap-y-4 flex-auto">
            {data.map((val) => (<CardView key={val.id} {...val} />))}
        </div>
    )
}

