/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {signIn} from '@/auth';
import CustomSvgs from '@/components/shared/custom-svgs';
import {Button} from '@/components/ui/button';
import {getProviders} from 'next-auth/react';
import {useEffect, useState} from 'react';

// Infer the type from getProviders()
type Providers = Awaited<ReturnType<typeof getProviders>>;

const GoogleSignInButton = ({session}: any) => {
    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        setAuthProviders();
    }, []);
    return (
        <div>
            {!session &&
                providers &&
                Object.values(providers).map((provider, index) => {
                    if (provider.id === 'google') {
                        return (
                            <Button
                                key={index}
                                onClick={() => signIn(provider.id)}
                                className="btn btn-secondary">
                                <CustomSvgs type="google" />
                                Google
                            </Button>
                        );
                    }
                })}
        </div>
    );
};

export default GoogleSignInButton;
