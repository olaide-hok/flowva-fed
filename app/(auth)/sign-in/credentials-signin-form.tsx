'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {signInDefaultValues} from '@/lib/constants';
import Link from 'next/link';
import {useActionState, useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';
import {signInWithCredentials} from '@/lib/actions/user.actions';
import CustomSvgs from '@/components/shared/custom-svgs';
// import GoogleSignInButton from './googleSignIn';
import {usePasswordToggle} from '@/hooks/usePwdToggle';
import {redirect} from 'next/navigation';

const CredentialsSignInForm = () => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: '',
    });

    const [, setPassword] = useState('');
    const {inputType, toggleLabel, toggle} = usePasswordToggle();
    useEffect(() => {
        if (data?.success && data?.redirectTo) {
            setTimeout(() => {
                redirect(data.redirectTo);
            }, 5000);
        }
    }, [data]);

    const SignInButton = () => {
        const {pending} = useFormStatus();
        return (
            <Button
                type="submit"
                disabled={pending}
                className="btn"
                variant="default">
                <CustomSvgs type="sign-in" />
                {pending ? 'Signing In...' : 'Sign In'}
            </Button>
        );
    };

    return (
        <form action={action}>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                Welcome back
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
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue={signInDefaultValues.email}
                    placeholder="you@example.com"
                />
            </div>
            <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <Input
                    name="password"
                    type={inputType}
                    required
                    autoComplete="password"
                    defaultValue={signInDefaultValues.password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <span className="password-toggle" onClick={toggle}>
                    {toggleLabel}
                </span>
            </div>

            <div className="forgot-password">
                <Link
                    href="/forgot-password"
                    target="_self"
                    id="forgot-password">
                    Forgot password?
                </Link>
            </div>
            <>
                <SignInButton />
            </>

            <div className="divider">or continue with</div>

            {/* <GoogleSignInButton /> */}

            <div className="form-footer">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" target="_self" className="link">
                    Sign Up
                </Link>
            </div>
        </form>
    );
};

export default CredentialsSignInForm;
