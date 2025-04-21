/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {APP_NAME, signUpDefaultValues} from '@/lib/constants';
import Link from 'next/link';
import {useActionState, useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';
import {signUpUser} from '@/lib/actions/user.actions';
import {usePasswordToggle} from '@/hooks/usePwdToggle';
import CustomSvgs from '@/components/shared/custom-svgs';
// import GoogleSignInButton from '../sign-in/googleSignIn';
import {usePasswordStrength} from '@/hooks/usePwdStrength';
import {redirect} from 'next/navigation';

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: '',
    });

    const passwordToggle = usePasswordToggle();
    const confirmToggle = usePasswordToggle();
    const [password, setPassword] = useState('');
    const [, setConfirmPassword] = useState('');
    const {strengthLevel, showHint} = usePasswordStrength(password);

    useEffect(() => {
        if (data?.success && data?.redirectTo) {
            setTimeout(() => {
                redirect(data.redirectTo);
            }, 5000);
        }
    }, [data]);

    const SignUpButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button disabled={pending} className="btn" variant="default">
                {pending ? 'Creating your account...' : 'Create account'}
                <CustomSvgs type="create" />
            </Button>
        );
    };

    return (
        <form action={action}>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                Join {APP_NAME} today
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
                <Label htmlFor="email">Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    defaultValue={signUpDefaultValues.name}
                    placeholder="Jessie Flowva"
                />
            </div>
            <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    defaultValue={signUpDefaultValues.email}
                    placeholder="you@example.com"
                />
            </div>
            <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type={passwordToggle.inputType}
                    required
                    autoComplete="password"
                    placeholder="••••••••"
                    defaultValue={signUpDefaultValues.password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span
                    className="password-toggle"
                    onClick={passwordToggle.toggle}>
                    {passwordToggle.toggleLabel}
                </span>
                <div className="password-strength">
                    <div className={`strength-meter ${strengthLevel}`}></div>
                </div>
                {showHint && (
                    <div className="password-hint">
                        Use at least 8 characters with a mix of letters, numbers
                        & symbols
                    </div>
                )}
            </div>

            <div className="form-group">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={confirmToggle.inputType}
                    required
                    autoComplete="confirmPassword"
                    placeholder="••••••••"
                    defaultValue={signUpDefaultValues.confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                    className="password-toggle"
                    onClick={confirmToggle.toggle}>
                    {confirmToggle.toggleLabel}
                </span>
            </div>

            <SignUpButton />

            <div className="divider">or continue with</div>

            {/* <GoogleSignInButton session={session} /> */}

            <div className="form-footer">
                Already have an account?{' '}
                <Link href="/sign-in" target="_self" className="link">
                    Sign In
                </Link>
            </div>
        </form>
    );
};

export default SignUpForm;
