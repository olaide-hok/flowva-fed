import {Metadata} from 'next';
import {APP_NAME} from '@/lib/constants';
import CustomSvgs from '@/components/shared/custom-svgs';
import ForgotPasswordForm from './forgot-password-form';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';

export const metadata: Metadata = {
    title: 'Forgot Password',
};

const ForgotPassword = async () => {
    const session = await auth();

    if (session) {
        return redirect('/');
    }
    return (
        <div className="container animate__animated animate__fadeInUp">
            <div className="flex flex-center mb-[30px] font-bold text-2xl text-(--primary-fb)">
                <CustomSvgs type="logo" className="mr-2.5 w-7 h-7" />
                {APP_NAME}
            </div>
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPassword;
