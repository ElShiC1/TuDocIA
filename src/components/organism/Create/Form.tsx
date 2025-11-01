import { Button } from "@/components/molecules/Form/Button"
import { InputSelect } from "@/components/molecules/Form/InputSelect"
import { InputText } from "@/components/molecules/Form/InputText"
import { useFormZod } from "@/lib/hook/useFormZod"
import { message } from "@/lib/hook/useMessage"
import { TriviaGame } from "@/lib/store/Trivia/TriviaId"
import { generateQuestSchema } from "@/lib/types/validate/QuestVD"
import { TudotIA } from "@/service/global/TudotIA"
import { useRouter } from "next/navigation"
import z from "zod"

export const Form = () => {

    const { register, success, setSuccess, handleSubmit, setValue, formState: { errors, isSubmitting, isValid } } = useFormZod(generateQuestSchema)
    const triviaAdd = TriviaGame((state) => state.addTrivia)
    const router = useRouter()

    const onsubmit = async (e: z.infer<typeof generateQuestSchema>) => {
        const response = await TudotIA.trivia.postTrivia(e)
        console.log("response form", response)
        if (!response.success) {
            setSuccess(false)
            return;
        }
        triviaAdd(response.data.array)
        setSuccess(true)
        router.push(`/quiz/1`)
    }

    return (
        <div className="h-auto w-full bg-white border border-gray-300 shadow-sm rounded-4xl p-10 flex flex-col gap-5">
            <div className="flex justify-center">
                <span className="text-xl text-blue-500 font-semibold">Escribe un tema de Trivia</span>
            </div>
            <div id="form">
                <form method="POST" onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-5">
                    <InputText className="flex-auto" label="Tema" name="quest" register={register} errors={errors} />
                    <div className="group-select flex flex-wrap gap-5">
                        <InputSelect readOnly setValue={setValue} className="grow basis-[clamp(8rem,8vw,10rem)]" label="Dificultad" name="difficulty" register={register} errors={errors}>
                            <h1 id="easy" data-name="Facil">Facil</h1>
                            <h2 id="medium" data-name="Medio">Medio</h2>
                            <h2 id="hard" data-name="Dificil">Dificil</h2>
                        </InputSelect>
                        <InputSelect setValue={setValue} className="grow basis-[clamp(8rem,8vw,10rem)]" label="Idioma" name="language" register={register} errors={errors}>
                            <h1 id="es" data-name="Español">Español</h1>
                            <h2 id="en" data-name="Ingles">Ingles</h2>
                        </InputSelect>
                        <InputText className="grow basis-[clamp(8rem,8vw,10rem)]" label="Preguntas" name="questions" register={register} errors={errors} />
                        <InputSelect inputValue setValue={setValue} className="grow basis-[clamp(8rem,8vw,10rem)]" label="Categoria" name="category" register={register} errors={errors}>
                            <span data-group className="px-1 py-0.5">Escribe una categoria</span>
                        </InputSelect>
                    </div>
                    <Button value={message([isSubmitting, "Generando...."], [success, "Generado Trivia"], "Generar Trivia")} isSubmitting={isSubmitting} isSuccess={success} isValid={isValid} />
                </form>
            </div>
        </div>
    )
}