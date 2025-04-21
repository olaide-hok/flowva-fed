export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Flowva';
export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Flowva';
export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const signInDefaultValues = {
    email: '',
    password: '',
};

export const signUpDefaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};
