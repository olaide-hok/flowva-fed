'use client';
import CustomSvgs from '@/components/shared/custom-svgs';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {forgotPwd} from '@/lib/actions/user.actions';
import Link from 'next/link';
import {useActionState} from 'react';
import {useFormStatus} from 'react-dom';

const ForgotPasswordForm = () => {
    const [data, action] = useActionState(forgotPwd, {
        success: false,
        message: '',
    });
    const {pending} = useFormStatus();

    return (
        <form action={action}>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                Reset your password
            </div>

            {data && !data.success && (
                <div className="form-message">{data.message}</div>
            )}
            <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                />
            </div>

            <Button disabled={pending} className="btn" variant="default">
                <CustomSvgs type="reset" />
                {pending ? 'Sending In...' : 'Send reset link'}
            </Button>

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
