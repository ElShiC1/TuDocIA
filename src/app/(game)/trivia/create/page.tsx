import { Form } from "@/components/organism/Create/Form"
import { Main } from "@/components/template/layout/Main"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Crear Trivia - TuDocAI",
    description: "Crea trivias personalizadas en TuDocAI y administra tus preguntas de forma rápida y sencilla.",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/create`
    },
};

const Create = () => {
    return (
        <Main id="create" className="h-full w-full flex items-center justify-center">
            <Form />
        </Main>
    )
}


export default Create