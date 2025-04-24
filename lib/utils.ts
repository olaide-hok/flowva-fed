import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
    if (error.name === 'ZodError') {
        // Handle Zod error
        const fieldErrors = Object.keys(error.errors).map(
            (field) => error.errors[field].message
        );

        return fieldErrors.join('. ');
    } else {
        // Handle other errors
        return typeof error.message === 'string'
            ? error.message
            : JSON.stringify(error.message);
    }
}

interface SignInUserInterface {
    email: string;
    password: string;
}

export const signInUserRoute = async (user: SignInUserInterface) => {
    const res = await fetch(`${process.env.NEXT_FLOWVA_API_LOGIN_ROUTE}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'},
    });

    const data = await res.json();

    return {
        ok: res.ok,
        status: res.status,
        data,
    };
};

interface RegisterUserInterface {
    name: string;
    email: string;
    password: string;
}

export const registerUserRoute = async (
    registerCredentials: RegisterUserInterface
) => {
    const res = await fetch(`${process.env.NEXT_FLOWVA_API_REGISTER_ROUTE}`, {
        method: 'POST',
        body: JSON.stringify(registerCredentials),
        headers: {'Content-Type': 'application/json'},
    });
    const data = await res.json();

    return {
        ok: res.ok,
        status: res.status,
        data,
    };
};
