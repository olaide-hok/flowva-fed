'use server';

import {
    signInFormSchema,
    signUpFormSchema,
    forgotPasswordSchema,
} from '../validators';

import {isRedirectError} from 'next/dist/client/components/redirect-error';
import {formatError} from '../utils';

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

        console.log('user', user);

        return {success: true, message: 'Signed in successfully'};
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

        console.log('registered user details  ', user);

        return {success: true, message: 'User registered successfully'};
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
