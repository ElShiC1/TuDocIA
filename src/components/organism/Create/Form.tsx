"use client"
import { Button } from "@/components/molecules/Form/Button"
import { InputSelect } from "@/components/molecules/Form/InputSelect"
import { InputText } from "@/components/molecules/Form/InputText"
import { BarProgress } from "@/components/molecules/Stats/BarProgress"
import { useFormZod } from "@/lib/hook/useFormZod"
import { message } from "@/lib/hook/useMessage"
import { useSmoothProgress } from "@/lib/hook/useSmoothProgress"
import { shared } from "@/lib/store/shared/Shared"
import { generateQuestSchema } from "@/lib/types/validate/QuestVD"
import { TudotIA } from "@/service/global/TudotIA"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import z from "zod"

export const Form = () => {

    const { register, success, setSuccess, handleSubmit, setValue, formState: { errors, isSubmitting, isValid } } = useFormZod(generateQuestSchema)
    const router = useRouter()
    const { progress, setProgress } = useSmoothProgress()
    const getCategory = shared((state) => state.getCategory)
    const category = shared((state) => state.category)


    const onsubmit = async (e: z.infer<typeof generateQuestSchema>) => {

        const response = await TudotIA.trivia.postTrivia(e, setProgress);
        // Simula procesamiento o redirección
        if (!response.success) {
            toast.error(response.message);
            setSuccess(false);
            return;
        }
        setProgress(100)
        setSuccess(true);
        router.push(`/trivia/${response.data.id}`);

    };

    return (
        <div className="h-auto w-full bg-white border border-gray-300 shadow-sm rounded-4xl p-10 flex flex-col gap-5 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex justify-center">
                <span className="text-xl text-blue-500 font-semibold">Escribe un tema de Trivia</span>
            </div>
            <div id="form">
                <form method="POST" onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-5">
                    <InputText className="flex-auto" label="Tema" name="quest" register={register} errors={errors} />
                    <div className="group-select flex flex-wrap gap-5">
                        <InputSelect readOnly setValue={setValue} className="grow basis-[clamp(8rem,8vw,10rem)]" label="Dificultad" name="difficulty" register={register} errors={errors}>
                            <span id="easy" data-name="Facil">Facil</span>
                            <span id="medium" data-name="Medio">Medio</span>
                            <span id="hard" data-name="Dificil">Dificil</span>
                        </InputSelect>
                        <InputSelect setValue={setValue} className="grow basis-[clamp(8rem,8vw,10rem)]" label="Idioma" name="language" register={register} errors={errors}>
                            <span id="es" data-name="Español">Español</span>
                            <span id="en" data-name="Ingles">Ingles</span>
                        </InputSelect>
                        <InputText className="grow basis-[clamp(8rem,8vw,10rem)]" label="Preguntas" name="questions" register={register} errors={errors} />
                        <InputSelect active={() =>  (category.length > 0 ?  undefined : getCategory())} inputValue setValue={setValue} className="grow basis-[clamp(8rem,8vw,10rem)]" label="Categoria" name="category" register={register} errors={errors}>
                            {category.map((val) => <span key={val.id} id={`${val.id}`} data-name={val.name}>{val.name}</span>)}
                        </InputSelect>
                    </div>

                    {isSubmitting ? <BarProgress percentajeReal={progress} /> : <Button value={message([isSubmitting, "Generando...."], [success, "Trivia Generado"], "Generar Trivia")} isSubmitting={isSubmitting} isSuccess={success} isValid={isValid} />}
                </form>
            </div>
        </div>
    )
}