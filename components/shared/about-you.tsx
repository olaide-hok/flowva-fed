import {useOnboardingAppState} from '@/store';

const AboutYou = () => {
    const {nextStep} = useOnboardingAppState();

    return (
        <div className="step active">
            <h2>About You</h2>
            <p>
                Help us tailor your library by telling us a bit about yourself.
            </p>

            <div className="form-group">
                <label>
                    What best describes you?{' '}
                    <span className="warning" id="role-warning">
                        Please select an option
                    </span>
                </label>
                <div className="radio-group">
                    <label className="radio-item">
                        <input
                            type="radio"
                            name="role"
                            value="Freelancer"
                            required
                        />{' '}
                        Freelancer
                    </label>
                    <label className="radio-item">
                        <input
                            type="radio"
                            name="role"
                            value="Solo entrepreneur"
                        />{' '}
                        Solo entrepreneur
                    </label>
                    <label className="radio-item">
                        <input type="radio" name="role" value="Small team" />{' '}
                        Small team
                    </label>
                    <label className="radio-item">
                        <input type="radio" name="role" value="Creator" />{' '}
                        Creator
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>
                    What kind of work do you do?{' '}
                    <span className="warning" id="work-warning">
                        Please select at least one option
                    </span>
                </label>
                <div className="checkbox-group">
                    <label className="checkbox-item">
                        <input type="checkbox" name="work" value="Design" />{' '}
                        Design
                    </label>
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            name="work"
                            value="Development"
                        />{' '}
                        Development
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" name="work" value="Writing" />{' '}
                        Writing
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" name="work" value="Marketing" />{' '}
                        Marketing
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" name="work" value="Other" />{' '}
                        Other
                        <input
                            type="text"
                            name="work_other"
                            className="hidden"
                            placeholder="Please specify"
                        />
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

export default AboutYou;
