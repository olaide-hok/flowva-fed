import {countryList} from '@/lib/validators';
import {useOnboardingAppState} from '@/store';

const Location = () => {
    const {nextStep, setLocation, location} = useOnboardingAppState();

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as (typeof countryList)[number] | '';
        setLocation({
            country: value === '' ? undefined : value,
        });
    };

    const handleContinue = () => {
        if (!location.country) {
            return;
        }
        nextStep();
    };

    const handleSkip = () => {
        setLocation({country: undefined});
        nextStep();
    };

    return (
        <div className="step active">
            <h2 className="font-bold">Where Are You Based?</h2>
            <p>
                This helps us personalize tool suggestions, currencies, and
                rewards for you.
            </p>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    name="country"
                    value={location.country || ''}
                    onChange={handleCountryChange}>
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
                <button
                    type="button"
                    className="btn-fob cursor-pointer"
                    onClick={handleContinue}>
                    Continue
                </button>
                <button
                    type="button"
                    className="btn-fob-skip"
                    onClick={handleSkip}>
                    Skip this step
                </button>
            </div>
        </div>
    );
};

export default Location;
