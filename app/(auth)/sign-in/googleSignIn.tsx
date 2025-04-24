'use client';

import CustomSvgs from '@/components/shared/custom-svgs';
import {googleSignIn} from '@/lib/actions/user.actions';

const GoogleSignInButton = () => {
    const handleSignIn = () => {
        googleSignIn();
    };

    return (
        <button
            type="button"
            onClick={handleSignIn}
            className="btn btn-secondary cursor-pointer">
            <CustomSvgs type="google" />
            Google
        </button>
    );
};

export default GoogleSignInButton;
