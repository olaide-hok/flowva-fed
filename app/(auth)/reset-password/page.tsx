import CustomSvgs from '@/components/shared/custom-svgs';
import {APP_NAME} from '@/lib/constants';
import ResetPasswordForm from './reset-password-form';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Reset Password',
};

const ResetPassword = async () => {
    return (
        <div className="container animate__animated animate__fadeInUp">
            <div className="flex flex-center mb-[30px] font-bold text-2xl text-(--primary-fb)">
                <CustomSvgs type="logo" className="mr-2.5 w-7 h-7" />
                {APP_NAME}
            </div>
            <ResetPasswordForm />
        </div>
    );
};

export default ResetPassword;
