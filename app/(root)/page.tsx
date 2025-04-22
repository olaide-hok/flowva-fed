'use client';
import AboutYou from '@/components/shared/about-you';
import Location from '@/components/shared/location';
import ProgressBar from '@/components/shared/progress-bar';
import ToolStack from '@/components/shared/tool-stack';
import Goals from '@/components/shared/goal';
import Welcome from '@/components/shared/welcome';
import {useOnboardingAppState} from '@/store';
import Completion from '@/components/shared/completion';

export default function Homepage() {
    const {step} = useOnboardingAppState();

    const renderStep = () => {
        switch (step) {
            case 0:
                return <Welcome />;
            case 1:
                return <AboutYou />;
            case 2:
                return <Location />;
            case 3:
                return <ToolStack />;
            case 4:
                return <Goals />;
            case 5:
                return <Completion />;
            default:
                return null;
        }
    };

    return (
        <div className="container-fob">
            <ProgressBar />

            <>{renderStep()}</>
        </div>
    );
}
