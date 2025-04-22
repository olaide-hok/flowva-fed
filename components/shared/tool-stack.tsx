import {useOnboardingAppState} from '@/store';

const ToolStack = () => {
    const {nextStep} = useOnboardingAppState();

    return (
        <div className="step active">
            <h2>Your Tool Stack</h2>
            <p>
                Which tools are part of your workflow? We &apos;ll pre-load and
                organize them in your library.
            </p>

            <div className="tool-grid">
                <div className="tool-item" data-tool="Notion">
                    <span className="icon">📝</span>
                    <span>Notion</span>
                </div>
                <div className="tool-item" data-tool="Trello">
                    <span className="icon">📋</span>
                    <span>Trello</span>
                </div>
                <div className="tool-item" data-tool="Slack">
                    <span className="icon">💬</span>
                    <span>Slack</span>
                </div>
                <div className="tool-item" data-tool="ClickUp">
                    <span className="icon">✅</span>
                    <span>ClickUp</span>
                </div>
                <div className="tool-item" data-tool="Canva">
                    <span className="icon">🎨</span>
                    <span>Canva</span>
                </div>
                <div className="tool-item" data-tool="Zapier">
                    <span className="icon">⚡</span>
                    <span>Zapier</span>
                </div>
                <div className="tool-item" data-tool="Stripe">
                    <span className="icon">💳</span>
                    <span>Stripe</span>
                </div>
                <div className="tool-item" data-tool="Figma">
                    <span className="icon">✏️</span>
                    <span>Figma</span>
                </div>
                <div className="tool-item" data-tool="Calendly">
                    <span className="icon">📅</span>
                    <span>Calendly</span>
                </div>
            </div>

            <p>You can always add more tools later in your library settings.</p>

            <div className="btn-fob-group">
                <button className="btn" onClick={nextStep}>
                    Continue
                </button>
                <button className="btn-fob-skip">
                    Skip – I &apos;ll add them later
                </button>
            </div>
        </div>
    );
};

export default ToolStack;
