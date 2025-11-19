export const BtnChange = ({ status, option, register, name, label, className }: { status?: boolean, option: [string, string], register: (val: any) => Record<any, any>, name: string, label: string, className?: string }) => {
    return (
        <div id={label} className={`flex flex-col gap-1 ${className} relative`}>
            <span className="absolute text-xs text-neutral-400 leading-1 px-1  translate-y-[-0.7rem] translate-x-2 bg-gray-100 dark:bg-neutral-600 rounded-xl py-2">{label}</span>
            <div className="flex gap-1 text-sm  px-2 py-2 rounded-xl items-center justify-between bg-gray-100 dark:bg-neutral-600">
                <span className="transition-all dark:text-white">{status ? option[0] : option[1]}</span>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" {...register(name)} />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    )
}