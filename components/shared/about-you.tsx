import {roleOptions, workOptions} from '@/lib/validators';
import {useOnboardingAppState} from '@/store';
import {useState} from 'react';

const AboutYou = () => {
    const {nextStep, setAboutYou, aboutYou} = useOnboardingAppState();
    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const role = e.target.value as (typeof roleOptions)[number];
        setAboutYou({
            ...aboutYou,
            role,
        });
    };

    const isFormValid =
        aboutYou.role &&
        aboutYou.work.length > 0 &&
        (!aboutYou.work.includes('Other') ||
            aboutYou.work_other!.trim() !== '');

    const handleWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        const workValue = value as (typeof workOptions)[number];

        let newWork = [...aboutYou.work];
        if (checked) {
            newWork.push(workValue);
        } else {
            newWork = newWork.filter((item) => item !== workValue);
        }

        // Toggle other input field visibility
        const otherSelected = newWork.includes('Other');
        setShowOtherInput(otherSelected);

        setAboutYou({
            ...aboutYou,
            work: newWork,
            work_other: otherSelected ? aboutYou.work_other : '',
        });
    };

    const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAboutYou({
            ...aboutYou,
            work_other: e.target.value,
        });
    };

    return (
        <div className="step active">
            <h2 className="font-bold">About You</h2>
            <p className="text-(--dark-fob)">
                Help us tailor your library by telling us a bit about yourself.
            </p>

            <div className="form-group">
                <label className="label-fob">
                    What best describes you?{' '}
                    <span className="warning">
                        {!aboutYou.role && 'Please select an option'}
                    </span>
                </label>
                <div className="radio-group">
                    {roleOptions.map((roleOpt) => (
                        <label
                            key={roleOpt}
                            className="radio-item cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value={roleOpt}
                                checked={aboutYou.role === roleOpt}
                                onChange={handleRoleChange}
                                className="cursor-pointer"
                            />
                            {roleOpt}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="label-fob">
                    What kind of work do you do?{' '}
                    <span className="warning">
                        {aboutYou.work.length === 0 &&
                            'Please select at least one option'}
                    </span>
                </label>
                <div className="checkbox-group">
                    {workOptions.map((workOpt) => (
                        <label
                            key={workOpt}
                            className="checkbox-item cursor-pointer">
                            <input
                                type="checkbox"
                                name="work"
                                value={workOpt}
                                checked={aboutYou.work.includes(workOpt)}
                                onChange={handleWorkChange}
                                className="cursor-pointer"
                            />
                            {workOpt}
                            {workOpt === 'Other' && showOtherInput && (
                                <input
                                    type="text"
                                    name="work_other"
                                    className="cursor-pointer"
                                    placeholder="Please specify"
                                    value={aboutYou.work_other}
                                    onChange={handleOtherInputChange}
                                />
                            )}
                        </label>
                    ))}
                </div>
            </div>

            <div className="btn-fob-group">
                <button
                    type="button"
                    className={`btn-fob ${
                        !isFormValid ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={nextStep}
                    disabled={!isFormValid}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default AboutYou;
