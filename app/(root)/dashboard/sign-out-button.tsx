'use client';

import {signOutUser} from '@/lib/actions/user.actions';

const SignOutButton = () => {
    return (
        <button
            type="button"
            className="btn cursor-pointer mt-4"
            onClick={signOutUser}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
