import {create} from 'zustand';
import {
    AboutYou,
    Goals,
    Location,
    OnboardingFormData,
    ToolStack,
} from './lib/validators';

type FlowvaOnboardingAppState = OnboardingFormData & {
    step: number;
    nextStep: () => void;
    getTotalSteps: () => number;
    setAboutYou: (aboutYou: AboutYou) => void;
    setLocation: (location: Location) => void;
    setToolStack: (tool: ToolStack) => void;
    setGoals: (goals: Goals) => void;
    submitForm: () => void;
    resetForm: () => void;
    onboardingData: OnboardingFormData | null;
};

// --- Zustand Store ---
export const useOnboardingAppState = create<FlowvaOnboardingAppState>(
    (set, get) => ({
        // Initial form state
        step: 0,
        aboutYou: {
            role: undefined,
            work: [],
            work_other: '',
        },
        location: {
            country: undefined,
        },
        toolStack: {
            tools: [],
        },
        goals: {
            goals: [],
        },
        onboardingData: null,

        // Step logic
        nextStep: () => {
            const {step} = get();
            const total = get().getTotalSteps();
            if (step < total) {
                set({step: step + 1});
            }
        },

        getTotalSteps: () => 5, // step 5 is the welcome screen

        // Setters
        setAboutYou: (aboutYou) => set({aboutYou}),
        setLocation: (location) => set({location}),
        setToolStack: (toolStack) => set({toolStack}),
        setGoals: (goals) => set({goals}),

        // Final Submission
        submitForm: () => {
            const data: OnboardingFormData = {
                aboutYou: get().aboutYou,
                location: get().location,
                toolStack: get().toolStack,
                goals: get().goals,
            };
            // Save to store and localStorage
            set({onboardingData: data});
            localStorage.setItem('flowva_onboarding', JSON.stringify(data));

            // console.log('submitted data', data);
        },
        // Reset form
        resetForm: () =>
            set({
                step: 0,
                aboutYou: {
                    role: undefined,
                    work: [],
                    work_other: '',
                },
                location: {
                    country: undefined,
                },
                toolStack: {
                    tools: [],
                },
                goals: {
                    goals: [],
                },
                onboardingData: null,
            }),
    })
);
