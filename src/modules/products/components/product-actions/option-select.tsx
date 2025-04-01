import { HttpTypes } from "@medusajs/types";
import { clx, Tooltip, TooltipProvider } from "@medusajs/ui";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
  const t = useTranslations("product");

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        {t("selectOption", {
          option: locale === "de" ? title : t(`options.${title}`),
        })}

        {option.title === "Größe" && (
          <TooltipProvider>
            <Tooltip content={t("sizeGuide")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                data-state="closed"
              >
                <g clipPath="url(#a)">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M14.61 7.5a7.11 7.11 0 1 1-14.22 0 7.11 7.11 0 0 1 14.22 0M8.389 3.945a.889.889 0 1 1-1.778 0 .889.889 0 0 1 1.778 0M6.61 6.611a.667.667 0 1 0 0 1.333h.225a.222.222 0 0 1 .217.27l-.408 1.837a1.555 1.555 0 0 0 1.519 1.893h.225a.667.667 0 0 0 0-1.333h-.225a.222.222 0 0 1-.217-.27l.408-1.837a1.555 1.555 0 0 0-1.519-1.893z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h15v15H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
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
