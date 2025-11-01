import { Icon } from "@/components/atoms/Icon/Icons"
import Image from "next/image"
import Link from "next/link"

export const Login = () => {
    return (
        <div className="w-[24rem] max-w-md h-auto rounded-xl bg-white border-1 border-gray-300 p-10 flex flex-col gap-6 shadow-2xl" style={{ viewTransitionName: 'div-auth' }}>
            <div id="title" className="gap-2 flex items-center h-10 w-full justify-between">
                <h1 className="text-xl font-semibold text-blue-600">Login</h1>
                <Image className="w-auto h-full" src="https://herrmans.eu/wp-content/uploads/2019/01/Hartje-Logo-500x500px.png" width={100} height={100} alt={""}></Image>
            </div>
            <form method="post" className="flex flex-col gap-5 w-full h-full">
                <div className="h-10 flex flex-col relative">
                    <input type="text" id="user" className="peer text-1xl w-full h-full rounded-xl border-1 border-gray-300  px-3 py-2 outline-none" required />
                    <label htmlFor="user" className="cursor-text text-1xl absolute group items-center  text-gray-400 transition-all px-3 py-2 peer-focus:leading-1 peer-focus:px-1  peer-focus:translate-y-[-0.7rem] peer-focus:translate-x-2 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:bg-white peer-valid:leading-1 peer-valid:px-1  peer-valid:translate-y-[-0.7rem] peer-valid:translate-x-2 peer-valid:text-xs peer-valid:text-slate-400 peer-valid:bg-white">Usuario</label>
                </div>
                <div className="h-10 flex flex-col relative">
                    <input type="text" id="Token" className="peer text-1xl w-full h-full rounded-xl border-1 border-gray-300 px-3 py-2 outline-none" required />
                    <label htmlFor="Token" className=" cursor-text text-1xl absolute group items-center  text-gray-400 transition-all px-3 py-2 peer-focus:leading-1 peer-focus:px-1  peer-focus:translate-y-[-0.7rem] peer-focus:translate-x-2 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:bg-white peer-valid:leading-1 peer-valid:px-1  peer-valid:translate-y-[-0.7rem] peer-valid:translate-x-2 peer-valid:text-xs peer-valid:text-slate-400 peer-valid:bg-white">Token</label>
                </div>
                <div id="json-file" className="h-20 bg-gray-200 rounded-xl py-5 px-8 flex gap-4 items-center cursor-pointer">
                    <Icon.FileJson className="text-gray-400 h-full" />
                    <div className="text-file-json text-xs flex flex-col text-gray-400">
                        <span>Subir archivo .json</span>
                        <span>Drop a file here</span>
                    </div>
                </div>
                <button type="submit" className="p-2 cursor-pointer bg-blue-500 text-white font-semibold rounded-xl" style={{ viewTransitionName: 'button-auth' }}>Iniciar Sesíon</button>
                <span className="text-xs text-center" style={{ viewTransitionName: "auth-text" }}>¿Primera vez en TutDocAI?  <Link href={"/register"} className="text-blue-500 font-semibold">Regístrate</Link></span>
            </form>
        </div>
    )
}