import { CardModal } from "@/components/atoms/CardModal";
import { Form } from "@/components/organism/auth/Register/Form";
import { Header } from "@/components/organism/auth/Register/Header";
import { Main } from "@/components/template/layout/Main";

const Register = () => {
    return (
        <Main transition='auth' id="login" className="h-full flex items-center justify-center">
            <CardModal className="w-[24rem] max-w-md m-auto rounded-xl bg-white border-1 border-gray-300 p-10 flex flex-col gap-6 shadow-2xl" style={{viewTransitionName: 'div-auth'}}>
                <Header />
                <Form />
            </CardModal>
        </Main>
    )
}


export default Register;