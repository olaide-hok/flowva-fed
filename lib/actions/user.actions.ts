'use server';

import {
    signInFormSchema,
    signUpFormSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from '../validators';

import {isRedirectError} from 'next/dist/client/components/redirect-error';
import {formatError} from '../utils';
import {signIn, signOut} from '@/auth';

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

// Sign user out
export async function signOutUser() {
    await signOut({
        redirect: true,
        redirectTo: '/sign-in', // navigate to sign-in page
    });
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

        const data = await res.json();

        if (res.ok) {
            return {
                success: true,
                message: 'Account created successfully! Welcome to Flowva.',
                redirectTo: '/',
            };
        }

        if (!res.ok && res.status === 404) {
            return {
                success: data.success,
                message: data.error,
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

        // Forgot user password
        const res = await fetch(
            `${process.env.NEXT_FLOWVA_API_FORGOT_PASSWORD_ROUTE}`,
            {
                method: 'POST',
                body: JSON.stringify(userEmail),
                headers: {'Content-Type': 'application/json'},
            }
        );

        const data = await res.json();

        if (res.ok && res.status === 200) {
            return {success: data.success, message: data.data};
        }

        if (!res.ok && res.status === 404) {
            return {success: data.success, message: data.error};
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

// Reset password
export async function resetPwd(prevState: unknown, formData: FormData) {
    try {
        const userPwd = resetPasswordSchema.parse({
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const newPassword = {password: userPwd.password};

        const resettoken = formData.get('resettoken');

        // Reset user password
        const res = await fetch(
            `${process.env.NEXT_FLOWVA_API_RESET_PASSWORD_ROUTE}${resettoken}`,
            {
                method: 'PUT',
                body: JSON.stringify(newPassword),
                headers: {'Content-Type': 'application/json'},
            }
        );

        const data = await res.json();

        if (res.ok && res.status === 200) {
            return {
                success: data.success,
                message:
                    'Your password has been changed. Redirecting to Sign In page...',
                redirectTo: '/sign-in',
            };
        }

        if (!res.ok) {
            return {success: data.success, message: data.error};
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
