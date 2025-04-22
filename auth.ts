/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';

import CredentialsProvider from 'next-auth/providers/credentials';

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    providers: [
        // Google({
        //     clientId: process.env.AUTH_GOOGLE_ID,
        //     clientSecret: process.env.AUTH_GOOGLE_SECRET,
        //     authorization: {
        //         params: {
        //             prompt: 'consent',
        //             access_type: 'offline',
        //             response_type: 'code',
        //         },
        //     },
        // }),
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
        async session({session, token}: any) {
            session.user = token.user;
            return session;
        },
    },
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);
