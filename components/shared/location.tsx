import {useOnboardingAppState} from '@/store';

const Location = () => {
    const {nextStep} = useOnboardingAppState();

    return (
        <div className="step active">
            <h2>Where Are You Based?</h2>
            <p>
                This helps us personalize tool suggestions, currencies, and
                rewards for you.
            </p>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" name="country">
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="BR">Brazil</option>
                    <option value="NG">Nigeria</option>
                </select>
            </div>

            <div className="btn-fob-group">
                <button className="btn-fob" onClick={nextStep}>
                    Continue
                </button>
                <button className="btn-fob-skip">Skip this step</button>
            </div>
        </div>
    );
};

export default Location;
