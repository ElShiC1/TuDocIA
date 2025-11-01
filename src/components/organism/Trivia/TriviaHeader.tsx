import { Icon } from "@/components/atoms/Icon/Icons"
import Link from "next/link"

export const TriviaHeader = () => {


    return (
        <div className="flex-0 flex flex-col gap-5">
            <div id="search-filter" className="flex gap-2 h-10">
                <div className="flex-auto h-10 flex flex-col relative">
                    <input type="text" id="search" className="peer text-1xl w-full h-full rounded-xl border-1 border-gray-300  px-3 py-2 outline-none" required />
                    <label htmlFor="search" className="cursor-text text-1xl absolute group items-center  text-gray-400 transition-all px-3 py-2 peer-focus:leading-1 peer-focus:px-1  peer-focus:translate-y-[-0.7rem] peer-focus:translate-x-2 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:bg-white peer-valid:leading-1 peer-valid:px-1  peer-valid:translate-y-[-0.7rem] peer-valid:translate-x-2 peer-valid:text-xs peer-valid:text-slate-400 peer-valid:bg-white">Buscar</label>
                </div>
                <button
                    type="submit"
                    className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white font-semibold rounded-full"
                    style={{ viewTransitionName: 'button-auth' }}
                >
                    <Icon.Filter className="w-7 h-full" />
                </button>
                <Link href="/create"
                    className="w-10 h-10 flex items-center justify-center p-1 bg-gray-500 text-white font-semibold rounded-full"
                    style={{ viewTransitionName: 'button-auth' }}
                >
                    <Icon.Add className="w-auto h-full" />
                </Link>
            </div>
        </div>
    )


}