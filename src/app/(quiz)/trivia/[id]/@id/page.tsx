import { TriviaTemplate } from "@/components/template/TriviaTemplate"


const id = async ({ params }: { params: Promise<{ id: string }> }) => {

    const getId = (await params).id
    const idNumber = Number(getId) ?? 0

    return <TriviaTemplate id={idNumber} />
}

export default id