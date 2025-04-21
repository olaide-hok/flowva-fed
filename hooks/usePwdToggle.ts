import {useState, useCallback} from 'react';

type UsePasswordToggleReturn = {
    inputType: 'text' | 'password';
    toggleLabel: string;
    toggle: () => void;
};
export function usePasswordToggle(
    defaultVisible = false
): UsePasswordToggleReturn {
    const [isVisible, setIsVisible] = useState(defaultVisible);

    const toggle = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    const inputType = isVisible ? 'text' : 'password';
    const toggleLabel = isVisible ? 'Hide' : 'Show';

    return {inputType, toggleLabel, toggle};
}
