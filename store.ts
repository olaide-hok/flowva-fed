import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {
    AboutYou,
    Goals,
    Location,
    OnboardingFormData,
    onboradingFormDataSchema,
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

// Default clean state
const defaultState: OnboardingFormData = {
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
};

// Read from localStorage on init
const loadInitialState = (): OnboardingFormData => {
    try {
        const stored = localStorage.getItem('flowva_onboarding');
        if (stored) {
            const parsed = JSON.parse(stored);
            const result = onboradingFormDataSchema.safeParse(parsed);
            if (result.success) return result.data;
        }
    } catch (err) {
        console.warn('⚠️ Failed to load onboarding state:', err);
    }
    return defaultState;
};

// --- Zustand Store ---
export const useOnboardingAppState = create<FlowvaOnboardingAppState>()(
    persist(
        (set, get) => ({
            // Initial form state
            step: 0,
            ...loadInitialState(),
            get onboardingData() {
                return {
                    aboutYou: get().aboutYou,
                    location: get().location,
                    toolStack: get().toolStack,
                    goals: get().goals,
                };
            },

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
                const parseResult = onboradingFormDataSchema.safeParse(data);
                if (parseResult.success) {
                    localStorage.setItem(
                        'flowva_onboarding',
                        JSON.stringify(data)
                    );
                    set({step: 5});
                } else {
                    console.error(
                        '❌ Validation failed',
                        parseResult.error.format()
                    );
                }
            },
            // Reset form
            resetForm: () => {
                localStorage.removeItem('flowva_onboarding');
                set({step: 0, ...defaultState});
            },
        }),
        {
            name: 'flowva_onboarding', // key in localStorage
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        [
                            'aboutYou',
                            'location',
                            'toolStack',
                            'goals',
                            'step',
                        ].includes(key)
                    )
                ),
        }
    )
);
