"use client"
import { Icon } from "@/components/atoms/Icon/Icons"
import { BtnChange } from "@/components/molecules/Form/BtnChange"
import { ButtonSp } from "@/components/molecules/Form/ButtonSp"
import { InputSelect } from "@/components/molecules/Form/InputSelect"
import { InputText } from "@/components/molecules/Form/InputText"
import { ModalButton } from "@/components/molecules/Modal/ModalButton"
import { shared } from "@/lib/store/shared/Shared"
import { Trivia } from "@/lib/store/Trivia/Trivia"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

export const TriviaHeader = () => {

    const getList = Trivia((state) => state.getList)
    const filter = Trivia((state) => state.filter)
    const getCategory = shared((state) => state.getCategory)
    const category = shared((state) => state.category)

    const { register, setValue, formState: { errors }, handleSubmit, control, reset } = useForm({
        defaultValues: filter
    });

    const marc = useWatch({ control }) as NonNullable<typeof filter>;

    const [initial, SetInitial] = useState(true)

    useEffect(() => {


        if (initial) {
            SetInitial(false)
            return
        }

        if (JSON.stringify(filter) === JSON.stringify(marc)) {
            return;
        }



        if (Object.keys(marc).length === 0) return;
        getList({ page: 1, filter: marc });
        window.history.replaceState({}, "", "?page=1");
    }, [marc]);



    return (
        <div className="flex-0 flex flex-col gap-5">
            <div id="search-filter" className="flex gap-2 h-10">
                <InputText className="flex-auto h-10" label="Buscar" name="search" register={register} errors={errors} />
                <ModalButton id="Filtro" icon={<Icon.Filter className="w-7 h-full" />} className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-semibold rounded-full">
                    <BtnChange status={marc.createAt} name="createAt" register={register} label="Order" option={["Antiguo", "Reciente"]} />
                    <InputSelect selectValue={marc.difficulty} readOnly setValue={setValue} className="w-full" label="Dificultad" name="difficulty" register={register} errors={errors}>
                        <span id="easy" data-name="Facil">Facil</span>
                        <span id="medium" data-name="Medio">Medio</span>
                        <span id="hard" data-name="Dificil">Dificil</span>
                    </InputSelect>
                    <InputSelect selectValue={marc.idCategory} active={() => (category.length > 0 ? undefined : getCategory())} setValue={setValue} className="w-35" register={register} label="Categoria" name="idCategory">
                        {category.map((val) => <span key={val.id} id={`${val.id}`} data-name={val.name}>{val.name}</span>)}
                    </InputSelect>
                    <ButtonSp value="Limpiar Filtro" className="text-sm bg-blue-500 hover:bg-blue-600 cursor-pointer" onClick={() => reset({
                        search: "",
                        idCategory: "",
                        createAt: false,
                        difficulty: "",
                    })} />
                </ModalButton>
                <Link title="Crear registro" href="/trivia/create"
                    className="w-10 h-10 flex items-center justify-center p-1  hover:bg-blue-500 bg-blue-600 text-white font-semibold rounded-full"
                    style={{ viewTransitionName: 'button-auth' }}
                >
                    <Icon.Add className="w-auto h-full" />
                </Link>
            </div>
        </div>
    )
}