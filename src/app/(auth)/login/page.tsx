import { Login as LoginOrg } from '@/components/organism/auth/login'
import { Main } from '@/components/template/layout/Main'

const Login = () => {
    return (
        <Main transition='auth' id="register" className="h-full flex items-center justify-center">
            <LoginOrg />
        </Main>
    )
}


export default Login