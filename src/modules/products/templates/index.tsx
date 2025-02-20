import React from "react";

import ImageGallery from "@modules/products/components/image-gallery";
import ProductActions from "@modules/products/components/product-actions";
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta";
import ProductTabs from "@modules/products/components/product-tabs";
import ProductInfo from "@modules/products/templates/product-info";
import { notFound } from "next/navigation";
import { HttpTypes } from "@medusajs/types";
import VorteileListe from "@modules/home/components/hero/vorteile";
import CountrySelect from "@modules/layout/components/country-select";

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

  return (
    <>
      <div
        className="content-container relative flex flex-col py-6 small:flex-row small:items-start"
        data-testid="product-container"
      >
        <div className="flex w-full flex-col gap-y-6 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          <div className="max-sm:hidden">
            <VorteileListe />
          </div>
        </div>
        <div className="relative block w-full">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex w-full flex-col gap-y-12 py-8 small:sticky small:top-48 small:max-w-[300px] small:py-0">
          <CountrySelect regions={regions} up={false} />
          Die mögliche Größe des VAN7 Hubbettes für Ihr Fahrzeug hängt von der
          Deckenbreite ab. Gerne beraten wir Sie auch gerne telefonisch oder per
          Whatsapp.
          <ProductOnboardingCta />
          <ProductActions product={product} accessoryProducts={accessoires} />
        </div>
      </div>
      {/* <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div> */}
    </>
  );
};

export default ProductTemplate;
