import { HttpTypes } from "@medusajs/types";
import { clx } from "@medusajs/ui";
import React from "react";

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value);

  return (
    <div className="flex flex-col gap-y-3">
      <span>{title} auswählen</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "text-medium-regular h-10 flex-1 rounded-rounded border border-ui-border-base bg-ui-bg-subtle p-2",
                {
                  "border-brand-highlight": v === current,
                  "transition-shadow duration-150 ease-in-out hover:shadow-elevation-card-rest":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
