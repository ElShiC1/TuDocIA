import { Icon } from "@/components/atoms/Icon/Icons";
import { formatSize } from "@/lib/helper/formatSize";
import { RefObject, useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export const InputJson = ({ register, error, fileMarc }: {
    register: UseFormRegister<{ file: FileList }>, error: FieldErrors<{
        file: FileList;
    }>, fileMarc: FileList
}) => {

    const fileInput = useRef<HTMLInputElement>(null)
    const fileExist = fileMarc && fileMarc.length > 0

    return (<>

        <input type="file" hidden accept="application/json" {...register("file")} ref={(e) => {
            register("file").ref(e);
            fileInput.current = e;
        }} />

        <div id="json-file" className={`h-27  rounded-xl py-5 px-6 flex gap-3 items-center cursor-pointer  transition-colors ${fileExist ? error.file ? "bg-white border-2 border-red-500 text-red-400" : "bg-white border-2 border-blue-500 text-blue-400 " : "bg-gray-200 hover:bg-gray-100 text-gray-400"}`} onClick={() => fileInput.current?.click()}>
            <Icon.FileJson className=" h-15 w-15 shrink-0" />

            <div className="text-file-json text-xs flex flex-col  overflow-hidden">

                {fileExist ? <div className="flex flex-col ">
                    <span className="truncate">{fileMarc[0].name}</span>
                    <span>{formatSize(fileMarc[0].size)}</span>
                    <span className="truncate">{error.file?.message}</span>
                </div> : <>
                    <span>Subir archivo .json</span>
                    <span>Suelta aqui el archivo</span>
                </>}
            </div>
        </div>


    </>

    )
}