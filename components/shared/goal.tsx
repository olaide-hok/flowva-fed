import {goalsList} from '@/lib/validators';
import {useOnboardingAppState} from '@/store';
import {useState} from 'react';

const Goals = () => {
    const {nextStep, setGoals} = useOnboardingAppState();
    const [selectedGoals, setSelectedGoals] = useState<
        (typeof goalsList)[number][]
    >([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        const goalValue = value as (typeof goalsList)[number];

        setSelectedGoals((prev) => {
            if (checked) {
                return [...prev, goalValue];
            } else {
                return prev.filter((goal) => goal !== goalValue);
            }
        });
    };

    const handleContinue = () => {
        // Update the store with selected goals
        setGoals({goals: selectedGoals!});
        nextStep();
    };

    return (
        <div className="step active">
            <h2 className="font-bold">What Do You Want to Track or Improve?</h2>
            <p>This helps us personalize your dashboard and features.</p>

            <div className="form-group">
                <label>
                    Select your goals{' '}
                    {selectedGoals.length === 0 && (
                        <span className="warning">
                            Please select at least one option
                        </span>
                    )}
                </label>
                <div className="checkbox-group">
                    {goalsList.map((goal) => (
                        <label key={goal} className="checkbox-item">
                            <input
                                type="checkbox"
                                name="goals"
                                value={goal}
                                checked={selectedGoals.includes(goal)}
                                onChange={handleChange}
                            />
                            {goal}
                        </label>
                    ))}
                </div>
            </div>

            <div className="btn-fob-group">
                <button
                    type="button"
                    className={`btn-fob ${
                        selectedGoals.length === 0
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                    }`}
                    onClick={handleContinue}
                    disabled={selectedGoals.length === 0}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Goals;
