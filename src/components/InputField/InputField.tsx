import { useState, forwardRef, useId, useEffect, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

/**
 * Production-ready InputField
 * - Controlled or uncontrolled
 * - variants: filled | outlined | ghost
 * - sizes: sm | md | lg
 * - optional clear button, password toggle, loading state
 * - accessibility: labels, aria-describedby, aria-invalid
 */

export type Variant = "filled" | "outlined" | "ghost";
export type Size = "sm" | "md" | "lg";

export interface InputFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    variant?: Variant;
    size?: Size;
    showClear?: boolean; // shows clear (x) button when input has value
    showPasswordToggle?: boolean; // for type="password"
    loading?: boolean;
    invalid?: boolean;
}

/**
 * useControlled: fallback to internal state if value not provided
 */
function useControlledValue(
    controlledValue: string | undefined,
    defaultValue: string | undefined
) {
    const [value, setValue] = useState<string>(controlledValue ?? defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    useEffect(() => {
        if (isControlled) setValue(controlledValue as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlledValue]);
    return { value, setValue, isControlled };
}

const sizeClasses: Record<Size, string> = {
    sm: "text-sm px-2 py-1 h-9",
    md: "text-base px-3 py-2 h-11",
    lg: "text-lg px-3 py-3 h-12",
};

const variantBase: Record<Variant, string> = {
    filled: "bg-gray-50 border border-transparent focus:bg-white",
    outlined: "bg-white border border-gray-300",
    ghost: "bg-transparent border border-transparent",
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            label,
            helperText,
            errorMessage,
            variant = "outlined",
            size = "md",
            showClear = false,
            showPasswordToggle = false,
            loading = false,
            invalid,
            id,
            className,
            type = "text",
            value: controlledValue,
            defaultValue,
            onChange,
            disabled,
            placeholder,
            ...rest
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id ?? `input-${generatedId}`;
        const helperId = helperText ? `${inputId}-helper` : undefined;
        const errorId = errorMessage ? `${inputId}-error` : undefined;

        const { value, setValue, isControlled } = useControlledValue(
            controlledValue as string | undefined,
            defaultValue as string | undefined
        );

        const [showPassword, setShowPassword] = useState(false);
        const currentType = type === "password" && showPassword ? "text" : type;

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            if (!isControlled) setValue(e.target.value);
            onChange?.(e);
        }

        function handleClear() {
            // call onChange with empty string for controlled components
            const fakeEvent = {
                target: { value: "" },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            if (!isControlled) setValue("");
            onChange?.(fakeEvent);
        }

        const isInvalid = invalid ?? Boolean(errorMessage);
        const hasHelperOrError = helperText || errorMessage;

        // classes
        const rootCls = clsx(
            "w-full",
            "text-left",
            className
        );

        const inputCls = clsx(
            "block border-gray-300 rounded-md outline-none w-full transition-shadow",
            variantBase[variant],
            sizeClasses[size],
            disabled ? "opacity-60 cursor-not-allowed" : "focus:ring-2 focus:ring-offset-0",
            isInvalid
                ? "border-red-500 focus:ring-red-200"
                : "focus:border-blue-500 focus:ring-blue-200",
            // remove native outline
            "placeholder-gray-400",
            "pr-10" // space for buttons (clear/loading/toggle)
        );

        return (
            <div className={rootCls}>
                {label && (
                    <label htmlFor={inputId} className="inline-block mb-1 font-medium text-sm">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        {...rest}
                        id={inputId}
                        ref={ref}
                        value={value}
                        onChange={handleChange}
                        type={currentType}
                        className={inputCls}
                        placeholder={placeholder}
                        aria-invalid={isInvalid}
                        aria-describedby={hasHelperOrError ? `${helperId ?? ""} ${errorId ?? ""}`.trim() : undefined}
                        disabled={disabled || loading}
                        // prevent spellcheck for password fields by default
                        spellCheck={type === "password" ? false : rest.spellCheck}
                    />

                    {/* right-side controls: loading, clear, password toggle */}
                    <div className="right-2 absolute inset-y-0 flex items-center space-x-1">
                        {loading && (
                            <span aria-hidden className="flex items-center">
                                <svg
                                    className="w-4 h-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    aria-label="loading"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                            </span>
                        )}

                        {showClear && !loading && !disabled && value && value.length > 0 && (
                            <button
                                type="button"
                                aria-label="Clear input"
                                onClick={handleClear}
                                className="hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                        {showPasswordToggle && type === "password" && (
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword((s) => !s)}
                                className="hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-0"
                            >
                                {showPassword ? (
                                    // eye-off
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7 1.024-2.09 2.5-3.78 4.263-4.89m3.496-1.46a9.956 9.956 0 014.241 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                    </svg>
                                ) : (
                                    // eye
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.27 2.943 9.542 7-1.272 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {helperText && !isInvalid && (
                    <p id={helperId} className="mt-1 text-gray-500 text-xs">
                        {helperText}
                    </p>
                )}

                {isInvalid && errorMessage && (
                    <p id={errorId} className="mt-1 text-red-600 text-xs">
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;
