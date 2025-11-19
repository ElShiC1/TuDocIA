import { CardModal } from '@/components/atoms/CardModal'
import { Header } from '@/components/atoms/Header'
import { Form } from '@/components/organism/auth/Login/Form'
import { Main } from '@/components/template/layout/Main'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Iniciar Sesión - TuDocAI",
    description: "Accede a tu cuenta de TuDocAI para generar trivias personalizadas y gestionar tu base de datos indexada.",
    
}


const Login = () => {
    return (
        <Main transition='auth' id="login" className="h-full flex items-center justify-center">
            <CardModal className="w-[24rem] max-w-md m-auto rounded-4xl bg-white dark:bg-neutral-900 border-1 border-gray-300 dark:border-neutral-800 p-10 flex flex-col gap-6 shadow-2xl" style={{ viewTransitionName: 'div-auth' }}>
                <Header title="Iniciar Sesión" />
                <Form />
            </CardModal>
        </Main>
    )
}


export default Login