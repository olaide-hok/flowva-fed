'use client';

import {OnboardingFormData, onboradingFormDataSchema} from '@/lib/validators';
import {useEffect, useState} from 'react';

const UserProfileDetails = () => {
    const [data, setData] = useState<OnboardingFormData>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Runs only on client
        const stored = localStorage.getItem('flowva_onboarding');

        if (stored) {
            try {
                const parsed = JSON.parse(stored);

                // If zustand persist format, unwrap `state`
                const payload = parsed?.state ?? parsed;

                const result = onboradingFormDataSchema.safeParse(payload);

                if (result.success) {
                    setData(result.data);
                }
            } catch (err) {
                console.error('Failed to parse localStorage data', err);
            }
        }

        setLoading(false);
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!data) return <div>No onboarding data found.</div>;

    const {aboutYou, location, toolStack, goals} = data;

    // Expanded country code to name mapping
    const countryNames: Record<string, string> = {
        GB: 'United Kingdom',
        US: 'United States',
        CA: 'Canada',
        AU: 'Australia',
        DE: 'Germany',
        FR: 'France',
        JP: 'Japan',
        IN: 'India',
        BR: 'Brazil',
        NG: 'Nigeria',
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* About You Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    About You
                </h2>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">Role</h3>
                        <p className="text-gray-600">
                            {aboutYou?.role || 'Not specified'}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">Work</h3>
                        {aboutYou?.work?.length ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {aboutYou.work.map((item, index) => (
                                    <span
                                        key={`work-${index}`}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {item}
                                    </span>
                                ))}
                                {aboutYou.work_other && (
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                        {aboutYou.work_other}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">
                                No work information provided
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Location
                </h2>
                <div className="flex items-center gap-2">
                    {location?.country && (
                        <span
                            className={`fi fi-${location.country.toLowerCase()} rounded-full`}></span>
                    )}
                    <p className="text-gray-600">
                        {location?.country
                            ? countryNames[location.country] ||
                              `Country Code: ${location.country}`
                            : 'Location not specified'}
                    </p>
                </div>
            </section>

            {/* Tool Stack Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Tool Stack
                </h2>
                {toolStack?.tools?.length ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {toolStack.tools.map((tool, index) => (
                            <div
                                key={`tool-${index}`}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center hover:bg-gray-100 transition-colors">
                                <span className="icon">
                                    {tool === 'Notion' && '📝'}
                                    {tool === 'Trello' && '📋'}
                                    {tool === 'Slack' && '💬'}
                                    {tool === 'ClickUp' && '✅'}
                                    {tool === 'Canva' && '🎨'}
                                    {tool === 'Zapier' && '⚡'}
                                    {tool === 'Stripe' && '💳'}
                                    {tool === 'Figma' && '✏️'}
                                    {tool === 'Calendly' && '📅'}
                                </span>
                                <span className="text-gray-700"> {tool}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No tools listed</p>
                )}
            </section>

            {/* Goals Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Goals
                </h2>
                {goals?.goals?.length ? (
                    <ul className="space-y-3">
                        {goals.goals.map((goal, index) => (
                            <li
                                key={`goal-${index}`}
                                className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-gray-700">{goal}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 italic">No goals specified</p>
                )}
            </section>
        </div>
    );
};

export default UserProfileDetails;
