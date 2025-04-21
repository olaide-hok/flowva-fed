/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: 'jwt' as const,
        maxAge: 10 * 24 * 60 * 60, // 10 days
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
                    'https://flowva-bed-auth.onrender.com/api/v1/auth/login',
                    {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {'Content-Type': 'application/json'},
                    }
                );
                const user = await res.json();

                console.log('user from credentials providers  ', user);

                return null;
            },
        }),
    ],
    callbacks: {
        async session({session, user, trigger, token}: any) {
            // Set the user ID from the token
            session.user.id = token.sub;
            session.user.name = token.name;

            // If there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name;
            }

            return session;
        },
        async jwt({token, user, trigger, session}: any) {
            // Assign user fields to token
            if (user) {
                token.id = user.id;
            }

            // Handle session updates
            if (session?.user.name && trigger === 'update') {
                token.name = session.user.name;
            }

            return token;
        },
        async signIn({account, profile}: any) {
            if (account.provider === 'google') {
                return (
                    profile.email_verified &&
                    profile.email.endsWith('@example.com')
                );
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);
