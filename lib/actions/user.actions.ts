'use server';

import {
    signInFormSchema,
    signUpFormSchema,
    forgotPasswordSchema,
} from '../validators';

import {isRedirectError} from 'next/dist/client/components/redirect-error';
import {formatError} from '../utils';
import {signIn} from '@/auth';

// Sign in the user with credentials
export async function signInWithCredentials(
    prevState: unknown,
    formData: FormData
) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });

        await signIn('credentials', {
            redirect: false,
            ...user,
        });

        return {
            success: true,
            message: 'Welcome back! Redirecting...',
            redirectTo: '/',
        };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {success: false, message: 'Invalid email or password'};
    }
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const registerCredentials = {
            name: user.name,
            email: user.email,
            password: user.password,
        };

        // Register user
        const res = await fetch(
            `${process.env.NEXT_FLOWVA_API_REGISTER_ROUTE}`,
            {
                method: 'POST',
                body: JSON.stringify(registerCredentials),
                headers: {'Content-Type': 'application/json'},
            }
        );

        if (res.ok) {
            return {
                success: true,
                message: 'Account created successfully! Welcome to Flowva.',
                redirectTo: '/',
            };
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: formatError(error),
        };
    }
}

// User Forgot Password
export async function forgotPwd(prevState: unknown, formData: FormData) {
    try {
        const userEmail = forgotPasswordSchema.parse({
            email: formData.get('email'),
        });

        console.log('Reset link sent to your email', userEmail);

        return {success: true, message: 'Reset link sent to your email'};
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: formatError(error),
        };
    }
}
