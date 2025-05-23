import CustomSvgs from '@/components/shared/custom-svgs';
import {APP_NAME} from '@/lib/constants';
import {Metadata} from 'next';
import UserProfileDetails from './user-profile';
import Link from 'next/link';
import SignOutButton from './sign-out-button';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Dashboard() {
    return (
        <div className="container-fob animate__animated animate__fadeInUp">
            <Link
                href="/"
                target="_self"
                className="flex flex-center mb-[30px] font-bold text-2xl text-(--primary-fb)">
                <CustomSvgs type="logo" className="mr-2.5 w-7 h-7" />
                {APP_NAME}
            </Link>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                {APP_NAME} Dashboard
            </div>
            <UserProfileDetails />
            {/* Sign Out */}
            <SignOutButton />
        </div>
    );
}
