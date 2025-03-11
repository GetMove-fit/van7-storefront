import { HttpTypes } from "@medusajs/types";
import { Heading, Text } from "@medusajs/ui";
import { useLocale, useTranslations } from "next-intl";

type ProductInfoProps = {
  product: HttpTypes.StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const locale = useLocale();
  const t = locale === "de" ? undefined : useTranslations("products");

  return (
    <div id="product-info">
      <div className="mx-auto flex flex-col gap-y-4 lg:max-w-[500px]">
        {/* {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )} */}
        <Heading
          level="h2"
          className="font-title text-3xl leading-10"
          data-testid="product-title"
        >
          {t ? t(`${product.handle}.title`) : product.title}
        </Heading>

        <Text
          className="text-medium whitespace-pre-line text-ui-fg-subtle"
          data-testid="product-description"
        >
          {t ? t(`${product.handle}.description`) : product.description}
        </Text>
      </div>
    </div>
  );
};

export default ProductInfo;
