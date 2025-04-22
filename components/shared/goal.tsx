import {useOnboardingAppState} from '@/store';

const Goals = () => {
    const {nextStep} = useOnboardingAppState();

    return (
        <div className="step active">
            <h2>What Do You Want to Track or Improve?</h2>
            <p>This helps us personalize your dashboard and features.</p>

            <div className="form-group">
                <label>
                    Select your goals{' '}
                    <span className="warning" id="goals-warning">
                        Please select at least one option
                    </span>
                </label>
                <div className="checkbox-group">
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value="Subscription costs"
                        />{' '}
                        Subscription costs
                    </label>
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value="Tool usage & engagement"
                        />{' '}
                        Tool usage & engagement
                    </label>
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value="Unused/duplicate tools"
                        />{' '}
                        Unused/duplicate tools
                    </label>
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            name="goals"
                            value="Personalized tool suggestions"
                        />{' '}
                        Personalized tool suggestions
                    </label>
                </div>
            </div>

            <div className="btn-fob-group">
                <button className="btn-fob" onClick={nextStep}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Goals;
