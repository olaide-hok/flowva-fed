import {z} from 'zod';

// Schema for signing users in
export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Schema for signing up a user
export const signUpFormSchema = z
    .object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(8, 'Confirm password must be at least 8 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

// Schema for forgot password
export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

// Onboarding form schemas

// Schema for About You Info
// Define the possible role values
export const roleOptions = [
    'Freelancer',
    'Solo entrepreneur',
    'Small team',
    'Creator',
] as const;

// Define the possible work values
export const workOptions = [
    'Design',
    'Development',
    'Writing',
    'Marketing',
    'Other',
] as const;

export const aboutYouSchema = z.object({
    role: z
        .enum(roleOptions, {
            required_error: 'Please select an option.',
        })
        .optional(),
    work: z
        .array(z.enum(workOptions))
        .min(1, 'Please select at least one option'),

    // Optional field that appears when "Other" is selected
    work_other: z.string().optional().or(z.literal('')),
});

export const aboutYouFinalSchema = aboutYouSchema.refine(
    (data) => {
        return !(data.work.includes('Other') && !data.work_other?.trim());
    },
    {
        message: "Please specify your 'Other' work.",
        path: ['work_other'], // Attach error to the correct field
    }
);
// aboutYouFinalSchema type
export type AboutYou = z.infer<typeof aboutYouFinalSchema>;

// Country Selection
// Define the countries
export const countryList = [
    'US', // United States
    'GB', // United Kingdom
    'CA', // Canada
    'AU', // Australia
    'IN', // India
    'DE', // Germany
    'FR', // France
    'JP', // Japan
    'BR', // Brazil
    'NG', // Nigeria
] as const;
export const countrySchema = z.object({
    country: z
        .enum(countryList)
        .optional()
        .or(z.literal(''))
        .refine((val) => val !== '', {
            message: 'Please select your country.',
        }),
});

// Location type
export type Location = z.infer<typeof countrySchema>;

// Define available tool options
export const tools = [
    'Notion',
    'Trello',
    'Slack',
    'ClickUp',
    'Canva',
    'Zapier',
    'Stripe',
    'Figma',
    'Calendly',
] as const;

export const toolStackSchema = z.object({
    tools: z.array(z.enum(tools)).optional(), // field can be undefined (e.g., skipped)
});

// Location type
export type ToolStack = z.infer<typeof toolStackSchema>;

// Goals
export const goalsList = [
    'Subscription costs',
    'Tool usage & engagement',
    'Unused/duplicate tools',
    'Personalized tool suggestions',
] as const;

export const goalsSchema = z.object({
    goals: z
        .array(z.enum(goalsList))
        .min(1, 'Please select at least one goal.'),
});
// Goals type
export type Goals = z.infer<typeof goalsSchema>;

// combine onboarding schema
export const onboradingFormDataSchema = z.object({
    aboutYou: aboutYouFinalSchema,
    location: countrySchema,
    toolStack: toolStackSchema,
    goals: goalsSchema,
});

export type OnboardingFormData = z.infer<typeof onboradingFormDataSchema>;
