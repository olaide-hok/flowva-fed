import {useState} from 'react';
import CompletionPopup from './completion-popup';

const Completion = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleFinish = () => {
        setShowPopup(true);
    };

    return (
        <div className="step active">
            <h2>Setup Complete!</h2>
            <p>
                Your Flowva library is ready to use. We&apos;ll take you to your
                dashboard now where you can start organizing your tools and
                tracking your productivity.
            </p>

            <div className="btn-fob-group">
                <button className="btn-fob" onClick={handleFinish}>
                    Go to Dashboard
                </button>
            </div>
            {showPopup && (
                <CompletionPopup onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default Completion;
