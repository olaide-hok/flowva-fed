import {tools} from '@/lib/validators';
import {useOnboardingAppState} from '@/store';

const ToolStack = () => {
    const {nextStep, toolStack, setToolStack} = useOnboardingAppState();

    const handleToolClick = (tool: (typeof tools)[number]) => {
        const currentTools = toolStack.tools || [];
        const newTools = currentTools.includes(tool)
            ? currentTools.filter((t) => t !== tool)
            : [...currentTools, tool];
        setToolStack({tools: newTools});
    };

    const handleContinue = () => {
        nextStep();
    };

    const handleSkip = () => {
        setToolStack({tools: []}); // Clear selections when skipping
        nextStep();
    };

    return (
        <div className="step active">
            <h2 className="font-bold">Your Tool Stack</h2>
            <p>
                Which tools are part of your workflow? We &apos;ll pre-load and
                organize them in your library.
            </p>

            <div className="tool-grid">
                {tools.map((tool) => (
                    <div
                        key={tool}
                        className={`tool-item ${
                            toolStack.tools?.includes(tool) ? 'selected' : ''
                        }`}
                        data-tool={tool}
                        onClick={() => handleToolClick(tool)}>
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
                        <span>{tool}</span>
                    </div>
                ))}
            </div>

            <p>You can always add more tools later in your library settings.</p>

            <div className="btn-fob-group">
                <button
                    type="button"
                    className="btn-fob  cursor-pointer"
                    onClick={handleContinue}>
                    Continue
                </button>
                <button
                    type="button"
                    className="btn-fob-skip"
                    onClick={handleSkip}>
                    Skip – I &apos;ll add them later
                </button>
            </div>
        </div>
    );
};

export default ToolStack;
