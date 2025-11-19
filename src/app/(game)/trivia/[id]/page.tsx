import { Main } from "@/components/template/layout/Main"
import { TriviaTemplate } from "@/components/template/TriviaTemplate"
import { Metadata } from "next";

export async function generateMetadata({ params }: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const idTrivia = await params;

    return {
        title: `Trivia #${idTrivia.id} - TuDocAI`,
        description: `Responde la trivia número ${idTrivia.id} generada por TuDocAI y prueba tus conocimientos.`,
        robots: {
            index: false,
            follow: false
        }
    }
}

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