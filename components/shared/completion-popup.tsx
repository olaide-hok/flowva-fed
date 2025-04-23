type CompletionPopupProps = {
    onClose: () => void;
};
const CompletionPopup = ({onClose}: CompletionPopupProps) => {
    return (
        <>
            <div className="overlay active"></div>
            <div className="completion-popup active">
                <h2 className="font-bold">Onboarding Complete!</h2>
                <p>Taking you to your dashboard now.</p>
                <button
                    type="button"
                    className="btn-fob cursor-pointer"
                    onClick={onClose}>
                    OK
                </button>
            </div>
        </>
    );
};

export default CompletionPopup;
