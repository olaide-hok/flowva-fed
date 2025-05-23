/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {registerUserRoute, signInUserRoute} from './lib/utils';

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: {type: 'email'},
                password: {type: 'password'},
            },
            async authorize(credentials) {
                if (credentials == null) return null;

                // Find user in database
                const res = await fetch(
                    `${process.env.NEXT_FLOWVA_API_LOGIN_ROUTE}`,
                    {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {'Content-Type': 'application/json'},
                    }
                );
                const response = await res.json();
                if (res.ok && response) {
                    return response;
                }

                // If user does not exist or password does not match return null
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({account, profile}: any) {
            if (account.provider === 'google') {
                if (!profile) return false;

                const googleUser = {
                    email: profile.email,
                    password:
                        process.env
                            .NEXT_FLOWVA_GOOGLE_PROVIDER_PLACEHOLDER_PASSWORD!,
                };

                // Check if google user already exists
                const {ok, status, data} = await signInUserRoute(googleUser);

                // If not, register Google user
                if (!ok && status === 401) {
                    const registerCredentials = {
                        name: profile.name,
                        email: profile.email,
                        password:
                            process.env
                                .NEXT_FLOWVA_GOOGLE_PROVIDER_PLACEHOLDER_PASSWORD!,
                    };
                    const {ok, status, data} = await registerUserRoute(
                        registerCredentials
                    );

                    if (ok) {
                        return {
                            success: true,
                            message:
                                'Account created successfully! Welcome to Flowva.',
                            redirectTo: '/',
                        };
                    }

                    if (!ok && status === 404) {
                        return {
                            success: data.success,
                            message: data.error,
                        };
                    }
                }

                // Sign-in google user if they already exists
                if (ok && data) {
                    return data;
                }
            }
            if (account.provider === 'credentials') {
                return true;
            }
        },
        async session({session, token}: any) {
            if (token?.user) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({token, user}: any) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);
