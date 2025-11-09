"use client"

import { filterSearch } from "@/lib/utils/filterSearch";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface InputTextProps {
    label: string;
    name: string; // 🔒 asegura que sea un campo válido
    register: UseFormRegister<any>
    errors: FieldErrors<any>;
    onSearch?: (value: string) => void
}


export const InputSelect = ({ active, label, name, register, errors, className = "", children, setValue, onSearch, readOnly = false, inputValue = false }: InputTextProps & {
    active?: () => void, readOnly?: boolean, className?: string, children?: React.ReactNode, setValue: UseFormSetValue<any>, inputValue?: boolean
}) => {

    const error = errors[name]?.message as string | undefined;
    const childrenArray = React.Children.toArray(children);
    const [marc, setMarc] = useState({ id: "", label: "", search: "", filter: "" })
    const [list, setList] = useState(false)


    return (
        <div className={`h-auto ${className} relative`}>
            <div className="h-10 flex flex-col relative">
                <input id={name} type="text" value={marc.search} onKeyDown={(e) => readOnly && e.preventDefault()} onFocus={() => {
                    setList(true)
                    active?.()
                }}  {...register(name, {
                    onChange: (e) => {
                        setList(true)
                        setMarc({ id: inputValue ? e.target.value : marc.id, label: inputValue ? e.target.value : marc.label, search: e.target.value, filter: e.target.value }); // manejas tu propio estado
                        setValue(name, marc.id, { shouldValidate: true })
                        onSearch?.(marc.search)
                    },
                    onBlur: (e) => {
                        setList(false)
                        setMarc({ id: marc.id, label: marc.label, search: marc.label, filter: "" }); // manejas tu propio estado
                        setValue(name, marc.id, { shouldValidate: true })
                    },
                })} className={`peer text-1xl w-full h-full rounded-xl border-1   ${!error ? 'border-gray-300' : 'border-red-300'} px-3 py-2 outline-none`} required />
                <label htmlFor={name} className={`cursor-text text-1xl absolute group items-center  text-gray-400 transition-all px-3 py-2 peer-focus:leading-1 peer-focus:px-1  peer-focus:translate-y-[-0.7rem] peer-focus:translate-x-2 peer-focus:text-xs peer-focus:bg-white peer-valid:leading-1 peer-valid:px-1  peer-valid:translate-y-[-0.7rem] peer-valid:translate-x-2 peer-valid:text-xs peer-valid:bg-white`}>{label}</label>
            </div>
            {children && list && (
                <div
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute translate-y-1 transition-all text-sm rounded-xl w-full flex flex-col z-2 px-1 py-1 bg-white border border-gray-200"
                    role="listbox"
                >
                    {childrenArray.some((val) => {
                        const label = React.isValidElement(val) ? (val.props as { 'data-name': string })['data-name'] : 'null'
                        return filterSearch(marc.filter, label)
                    }) ? (
                        childrenArray.map((val, index) => {
                            const id = React.isValidElement(val) ? (val.props as { id: string }).id : 'null'
                            const label = React.isValidElement(val) ? (val.props as { 'data-name': string })['data-name'] : 'null'
                            const dataGroup =
                                React.isValidElement(val) && (val.props as any)['data-group'] !== undefined
                                    ? (val.props as any)['data-group']
                                    : false

                            if (dataGroup) return <React.Fragment key={index}>{val}</React.Fragment>

                            if (!filterSearch(marc.filter, label)) return null

                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setMarc({ id, label, search: label, filter: '' })
                                        setValue(name, id, { shouldValidate: true })
                                        setList(false)
                                    }}
                                    data-id={id}
                                    id="option-box"
                                    role="option"
                                    className={`px-2 py-1.5 cursor-pointer ${marc.id === id ? 'bg-blue-50' : ''} hover:bg-gray-100 rounded-md`}
                                >
                                    {val}
                                </div>
                            )
                        })
                    ) : (
                        <div className="px-2 py-1.5 text-gray-400 text-center">No se encontraron resultados</div>
                    )}
                </div>
            )}

            {error && (
                <p className="text-xs  text-red-500 pt-1.5 leading-none">{error}</p>
            )}
        </div>
    )
}