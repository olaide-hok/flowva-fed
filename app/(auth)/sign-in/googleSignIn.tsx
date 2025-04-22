'use client';

import {signIn} from '@/auth';
import CustomSvgs from '@/components/shared/custom-svgs';
import {Button} from '@/components/ui/button';
import {getProviders, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

// Infer the type from getProviders()
type Providers = Awaited<ReturnType<typeof getProviders>>;

const GoogleSignInButton = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState<Providers | null>(null);
    console.log(session);

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
                                type="button"
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
