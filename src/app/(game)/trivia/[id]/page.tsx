import { Main } from "@/components/template/layout/Main"
import { TriviaTemplate } from "@/components/template/TriviaTemplate"

const IdTrivia = async ({ params }: { params: Promise<{ id: string }> }) => {

    const getId = (await params).id
    const idNumber = Number(getId) ?? 0

    return (
        <Main id="idTrivia" className="h-full w-full flex items-center justify-center">
            <TriviaTemplate id={idNumber} />
        </Main>
    )
}


export default IdTrivia