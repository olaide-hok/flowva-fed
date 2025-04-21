import {useState, useEffect} from 'react';

export type StrengthLevel = '' | 'weak' | 'medium' | 'strong';

export function usePasswordStrength(password: string) {
    const [strengthLevel, setStrengthLevel] = useState<StrengthLevel>('');
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        // Show hint as soon as user starts typing
        setShowHint(password.length > 0);
        if (!password) {
            setStrengthLevel('');
            return;
        }

        let strength = 0;

        if (password.length > 7) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (password.length < 6) {
            setStrengthLevel('weak');
        } else if (strength <= 2) {
            setStrengthLevel('medium');
        } else {
            setStrengthLevel('strong');
        }
    }, [password]);

    return {strengthLevel, showHint};
}
