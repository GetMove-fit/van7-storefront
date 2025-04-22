import { Label } from "@medusajs/ui";
import React, { useEffect, useImperativeHandle, useState } from "react";

import Eye from "@modules/common/icons/eye";
import EyeOff from "@modules/common/icons/eye-off";

type InputProps = Omit<
  Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    "size"
  >,
  "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
  multiline?: boolean; // new prop for textarea mode
};

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    { type, name, label, touched, required, topLabel, multiline, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (!multiline && type === "password") {
        // only update if not textarea
        setInputType(showPassword ? "text" : "password");
      }
    }, [type, showPassword, multiline]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label className="txt-compact-medium-plus mb-2 font-sans">
            {topLabel}
          </Label>
        )}
        <div className="txt-compact-medium relative z-0 flex w-full font-sans">
          {multiline ? (
            <>
              <textarea
                name={name}
                id={name}
                placeholder=" "
                required={required}
                className="mt-0 block h-40 w-full rounded-md border border-ui-border-base bg-ui-bg-field px-4 pb-1 pt-4 ring-brand-highlight/20 focus:border-brand-light focus:outline-none focus:ring-[3px]"
                {...props}
                ref={inputRef}
              />
              <label
                htmlFor={name}
                onClick={() => inputRef.current?.focus()}
                className="-z-1 origin-0 absolute top-3 mx-3 flex items-center justify-center px-1 text-ui-fg-subtle transition-all duration-300"
              >
                {label}
                {required && <span className="text-rose-500">*</span>}
              </label>
            </>
          ) : (
            <>
              <input
                type={inputType}
                name={name}
                id={name}
                placeholder=" "
                required={required}
                className="mt-0 block h-11 w-full appearance-none rounded-md border border-ui-border-base bg-ui-bg-field px-4 pb-1 pt-4 ring-brand-highlight/20 hover:bg-ui-bg-field-hover focus:border-brand-light focus:outline-none focus:ring-[3px]"
                {...props}
                ref={inputRef}
              />
              <label
                htmlFor={name}
                onClick={() => inputRef.current?.focus()}
                className="-z-1 origin-0 absolute top-3 mx-3 flex items-center justify-center px-1 text-ui-fg-subtle transition-all duration-300"
              >
                {label}
                {required && <span className="text-rose-500">*</span>}
              </label>
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 px-4 text-ui-fg-subtle outline-none transition-all duration-150 focus:text-ui-fg-base focus:outline-none"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
