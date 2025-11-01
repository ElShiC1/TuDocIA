import { Game } from "@/components/organism/TriviaGame/Game"

const id = ({ params }: { params: Promise<{ id: string }> }) => {

    return (
        <Game></Game>
    )
}

export default id