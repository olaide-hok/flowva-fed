import {useOnboardingAppState} from '@/store';
import {useEffect, useRef} from 'react';

const ProgressBar = () => {
    const {step} = useOnboardingAppState();
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const progressPercentage = (step / 5) * 100;
        if (progressRef.current) {
            progressRef.current.style.width = `${progressPercentage}%`;
        }
    }, [step]);
    return (
        <div className="progress-bar">
            <div className="progress" ref={progressRef}></div>
        </div>
    );
};

export default ProgressBar;
