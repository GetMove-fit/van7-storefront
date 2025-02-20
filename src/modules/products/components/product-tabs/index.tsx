"use client";

import Back from "@modules/common/icons/back";
import FastDelivery from "@modules/common/icons/fast-delivery";

import Accordion from "./accordion";
import { HttpTypes } from "@medusajs/types";

type ProductTabsProps = {
  product: HttpTypes.StoreProduct;
  open?: boolean;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Zusätzliche Informationen",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Versand & Rückgabe",
      component: <ShippingInfoTab />,
    },
  ];

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8 text-base">
      <div className="flex flex-col gap-y-4">
        {/* Dynamic weight */}
        <div>
          <span className="font-semibold">Weight</span>
          <p>{product.weight ? `${product.weight} g` : "-"}</p>
        </div>
        {/* Dynamic dimensions */}
        <div>
          <span className="font-semibold">Dimensions</span>
          <p>
            {product.length && product.width && product.height
              ? `${product.length}L x ${product.width}W x ${product.height}H`
              : "-"}
          </p>
        </div>
        {/* Static specifications */}
        <div>
          <span className="font-semibold">
            Maximale Absenkung von der Decke
          </span>
          <p>130cm</p>
        </div>
        <div>
          <span className="font-semibold">Rahmen</span>
          <p>Robust aus Metall und Mehrschichtholz</p>
        </div>
        <div>
          <span className="font-semibold">Kompatibel</span>
          <p>Normmatratze 140cm x 200cm</p>
        </div>
        <div>
          <span className="font-semibold">Gewichtbelastung</span>
          <p>Bis zu 240kg</p>
        </div>
        <div>
          <span className="font-semibold">Typisierung</span>
          <p>Typisierungsfrei</p>
        </div>
        <div>
          <span className="font-semibold">System</span>
          <p>Rein mechanisch</p>
        </div>
        <div>
          <span className="font-semibold">Sicherheitsgurt</span>
          <p>vorhanden</p>
        </div>
      </div>
    </div>
  );
};

const ShippingInfoTab = () => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">
              Auslieferung startet demnächst
            </span>
            <p className="max-w-sm">
              Die voraussichtliche Lieferzeit beträgt 6-8 Wochen.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">3 Jahre Garantie</span>
            <p className="max-w-sm"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
