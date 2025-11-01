import { Main } from "@/components/template/layout/Main";

export default function QuizLayout({ id, view }: { id: React.ReactNode, view: React.ReactNode }) {

    const completeQuiz = true

    return (
        <Main className="h-full w-full flex items-center justify-center">
            {completeQuiz ? id : view}
        </Main>
    )
}