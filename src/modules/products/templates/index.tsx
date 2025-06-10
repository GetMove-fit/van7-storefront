import React, { use } from "react";

import ImageGallery from "@modules/products/components/image-gallery";
import ProductActions from "@modules/products/components/product-actions";
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta";
import ProductTabs from "@modules/products/components/product-tabs";
import ProductInfo from "@modules/products/templates/product-info";
import { notFound } from "next/navigation";
import { HttpTypes } from "@medusajs/types";
import CountrySelect from "@modules/layout/components/country-select";
import VideoBackground from "/public/video-background.png";
import { useTranslations } from "next-intl";

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  accessoires: HttpTypes.StoreProduct[];
  regions: HttpTypes.StoreRegion[];
  // countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  accessoires,
  regions,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  const t = useTranslations("product");

  return (
    <>
      <div
        className="content-container relative flex flex-col py-6 small:flex-row small:items-start"
        data-testid="product-container"
      >
        <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-32 small:max-w-[300px] small:py-0">
          <ProductInfo product={product} />
          {product.handle !== "fahrradhalter" && (
            <div className="max-sm:hidden">
              <ProductTabs product={product} />
            </div>
          )}
          {product.handle === "fahrradhalter" && (
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/LIOAmrM33EM"
              className="z-10 mb-20 mt-4 aspect-video h-fit max-w-full sm:mb-64"
            ></iframe>
          )}
          {/* <div className="max-sm:hidden">
            <VorteileListe small={true} />
          </div> */}
        </div>
        <div className="relative block w-full">
          <ImageGallery images={product?.images || []} />
        </div>

        {product.handle !== "fahrradhalter" && (
          <div className="sm:hidden">
            <ProductTabs product={product} />
          </div>
        )}

        <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-32 small:max-w-[300px] small:py-0">
          <div>
            <CountrySelect regions={regions} up={false} />
            <span>Lieferzeit: 10-12 Wochen</span>
          </div>
          <ProductOnboardingCta />
          <ProductActions product={product} accessoryProducts={accessoires} />
        </div>
      </div>
      {product.handle !== "fahrradhalter" && (
        <div className="relative flex h-fit place-content-center">
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/ou391qcj56U"
            className="z-10 mb-20 mt-4 aspect-video h-fit max-w-full sm:mb-64"
          ></iframe>
          <img
            src={VideoBackground.src}
            width={VideoBackground.width}
            height={VideoBackground.height}
            className="absolute h-full w-full object-cover"
          />
        </div>
      )}
    </>
  );
};

export default ProductTemplate;
