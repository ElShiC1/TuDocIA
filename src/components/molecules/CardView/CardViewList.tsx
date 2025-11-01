import { TriviaView } from "@/lib/types/ts/Quest"
import { CardView } from "./CardView"

export const CardViewList = ({ data }: { data: TriviaView[] }) => {



    return (
        <div className="grow flex flex-col gap-y-4 flex-auto">
            {data.map((val) => (<CardView key={val.id} {...val} />))}
        </div>
    )
}

