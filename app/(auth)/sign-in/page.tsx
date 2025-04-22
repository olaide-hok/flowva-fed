import {Metadata} from 'next';
import {APP_NAME} from '@/lib/constants';
import CredentialsSignInForm from './credentials-signin-form';
import CustomSvgs from '@/components/shared/custom-svgs';

export const metadata: Metadata = {
    title: 'Sign In',
};

const SignInPage = async () => {
    return (
        <div className="container animate__animated animate__fadeInUp">
            <div className="flex flex-center mb-[30px] font-bold text-2xl text-(--primary-fb)">
                <CustomSvgs type="logo" className="mr-2.5 w-7 h-7" />
                {APP_NAME}
            </div>
            <CredentialsSignInForm />
        </div>
    );
};

export default SignInPage;
