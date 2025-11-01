import Image from "next/image"


export const Header = () => {
    return (
        <div id="title" className="gap-2 flex items-center h-10 w-full justify-between">
            <h1 className="text-xl font-semibold text-blue-600">Register</h1>
            <Image className="w-auto h-full" src="https://herrmans.eu/wp-content/uploads/2019/01/Hartje-Logo-500x500px.png" width={100} height={100} alt={""}></Image>
        </div>
    )
}