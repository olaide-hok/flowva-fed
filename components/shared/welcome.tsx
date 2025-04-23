import {useOnboardingAppState} from '@/store';

const Welcome = () => {
    const {nextStep} = useOnboardingAppState();
    return (
        <div className="step active">
            <div className="welcome-content">
                <h1 className="font-bold">Welcome to Flowva</h1>
                <p>
                    Your smart library for organizing tools, tracking usage, and
                    turning productivity into rewards. Let&apos;s set up your
                    digital library in 2 minutes.
                </p>
            </div>
            <div className="btn-fob-group">
                <button
                    type="button"
                    className="btn-fob cursor-pointer"
                    onClick={nextStep}>
                    Let&apos;s Go
                </button>
            </div>
        </div>
    );
};

export default Welcome;
