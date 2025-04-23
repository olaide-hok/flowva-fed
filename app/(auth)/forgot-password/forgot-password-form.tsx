'use client';
import CustomSvgs from '@/components/shared/custom-svgs';
import {forgotPwd} from '@/lib/actions/user.actions';
import Link from 'next/link';
import {useActionState} from 'react';
import {useFormStatus} from 'react-dom';

const ForgotPasswordForm = () => {
    const [data, action] = useActionState(forgotPwd, {
        success: false,
        message: '',
    });

    const ResetPwdButton = () => {
        const {pending} = useFormStatus();
        return (
            <button
                type="submit"
                disabled={pending}
                className={`btn ${
                    pending ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}>
                <CustomSvgs type="reset" />
                {pending ? 'Sending reset link...' : 'Send reset link'}
            </button>
        );
    };

    return (
        <form action={action}>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                Reset your password
            </div>

            {data && !data.success && data.message !== '' ? (
                <div className="form-message error-message">{data.message}</div>
            ) : (
                ''
            )}
            {data && data.success && (
                <div className="form-message success-message">
                    {data.message}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                />
            </div>

            <ResetPwdButton />

            <div className="form-footer">
                Remember your password?{' '}
                <Link href="/sign-in" target="_self" className="link">
                    Sign In
                </Link>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
