'use client';
import CustomSvgs from '@/components/shared/custom-svgs';
import {usePasswordStrength} from '@/hooks/usePwdStrength';
import {usePasswordToggle} from '@/hooks/usePwdToggle';
import {resetPwd} from '@/lib/actions/user.actions';
import {useActionState, useState} from 'react';
import {useFormStatus} from 'react-dom';

const ResetPasswordForm = () => {
    const [data, action] = useActionState(resetPwd, {
        success: false,
        message: '',
    });
    const {pending} = useFormStatus();

    const passwordToggle = usePasswordToggle();
    const confirmToggle = usePasswordToggle();
    const [password, setPassword] = useState('');
    const [, setConfirmPassword] = useState('');
    const {strengthLevel, showHint} = usePasswordStrength(password);

    return (
        <form action={action}>
            <div className="text-[22px] font-semibold mb-[30px] text-center text-(--gray-700-fb)">
                Reset your password
            </div>

            {data && !data.success && data.message !== '' ? (
                <div className="form-message error-message">{data.message}</div>
            ) : (
                ''
            )}

            {data && data.success && (
                <div className="form-message success-message">
                    {data.message}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type={passwordToggle.inputType}
                    required
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span
                    className="password-toggle"
                    onClick={passwordToggle.toggle}>
                    {passwordToggle.toggleLabel}
                </span>
                <div className="password-strength">
                    <div className={`strength-meter ${strengthLevel}`}></div>
                </div>
                {showHint && (
                    <div className="password-hint">
                        Use at least 8 characters with a mix of letters, numbers
                        & symbols
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={confirmToggle.inputType}
                    required
                    autoComplete="confirmPassword"
                    placeholder="••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                    className="password-toggle"
                    onClick={confirmToggle.toggle}>
                    {confirmToggle.toggleLabel}
                </span>
            </div>

            <button
                type="submit"
                disabled={pending}
                className={`btn ${
                    pending ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}>
                <CustomSvgs type="reset" />
                {pending ? 'Resetting...' : 'Reset Password'}
            </button>
        </form>
    );
};

export default ResetPasswordForm;
