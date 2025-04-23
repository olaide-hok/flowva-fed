'use client';

import CustomSvgs from '@/components/shared/custom-svgs';
import {APP_NAME} from '@/lib/constants';
import {useOnboardingAppState} from '@/store';
// import {Metadata} from 'next';

// export const metadata: Metadata = {
//     title: 'Dashboard',
// };

export default function Dashboard() {
    const {onboardingData} = useOnboardingAppState();
    console.log('onboarding data', onboardingData);

    return (
        <div className="container-fob animate__animated animate__fadeInUp">
            <div className="flex flex-center mb-[30px] font-bold text-2xl text-(--primary-fb)">
                <CustomSvgs type="logo" className="mr-2.5 w-7 h-7" />
                {APP_NAME}
            </div>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                {APP_NAME} Dashboard
            </div>
        </div>
    );
}
