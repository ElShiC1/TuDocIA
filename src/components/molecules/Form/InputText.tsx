import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputTextProps {
    label: string;
    name: string; // 🔒 asegura que sea un campo válido
    register: (val: any) => Record<any, any>
    errors: FieldErrors<any>;
}


export const InputText = ({ label, name, register, errors, className = "" }: InputTextProps & { className?: string }) => {

    const error = errors[name]?.message as string | undefined;

    return (
        <div className={`h-auto ${className}`}>
            <div className="h-10 flex flex-col relative">
                <input id={name} type="text" {...register(name)} className={`peer text-1xl w-full h-full rounded-xl border-1   ${!error ? 'border-gray-300' : 'border-red-300'} px-3 py-2 outline-none`} required />
                <label htmlFor={name} className={`cursor-text text-1xl absolute group items-center  text-gray-400 transition-all px-3 py-2 peer-focus:leading-1 peer-focus:px-1  peer-focus:translate-y-[-0.7rem] peer-focus:translate-x-2 peer-focus:text-xs peer-focus:bg-white peer-valid:leading-1 peer-valid:px-1  peer-valid:translate-y-[-0.7rem] peer-valid:translate-x-2 peer-valid:text-xs peer-valid:bg-white`}>{label}</label>
            </div>
            {error && (
                <p className="text-xs px-3 text-red-500 pt-1.5 leading-none">{error}</p>
            )}
        </div>
    )
}