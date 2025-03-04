import { Text, clx } from "@medusajs/ui";
import { Pricing } from "types/global";

export default async function PreviewPrice({ price }: { price: Pricing }) {
  if (!price) {
    return null;
  }

  return (
    <>
      {price.discount_percent > 0 && (
        <Text
          className="text-ui-fg-muted line-through"
          data-testid="original-price"
        >
          {price.original_netto_format}
        </Text>
      )}
      <Text
        className={clx("text-base text-ui-fg-muted sm:text-xl", {
          "text-brand-content": price.discount_percent > 0,
        })}
        data-testid="price"
      >
        {price.netto_format}
      </Text>
    </>
  );
}
