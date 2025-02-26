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
      label: "Einzigartiger Campingkomfort",
      component: (
        <p>
          Was unsere Kunden am meisten lieben ist die einzigartige
          Nivellierfunktion, womit man bei jedem noch so schrägen Campingplatz
          mit einem Zug das Bett in eine waagrechte Position bringt und somit so
          Komfortabel wie Zuhause ruht.
        </p>
      ),
    },
    {
      label: "Patentierte Fixierfunktion",
      component: (
        <p>
          Nur mit dieser Funktion ist es möglich, ein freischwebendes Hubbett
          auf deine Wunschhöhe und Neigung stabil an der Seite zu Fixieren- so
          dass das Bett NICHT schaukelt!
        </p>
      ),
    },
    {
      label: "Ohne Strom und Führungsschienen",
      component: (
        <p>
          Vielen Campern ist das Gewicht und die Funktionalität auf kleinen Raum
          sehr wichtig. Der Kurbelmechanismus ist schneller und um 17kg leichter
          als ein Elektromotor. Das VAN7 Hubbett funktioniert immer, und noch
          dazu dank unserer Fixierfunktion ohne Ablagekonstruktionen und
          Schienen die den Raum stark beeinflussen und bei der Fahrt Geräusche
          erzeugen.
        </p>
      ),
    },
    {
      label: "Maximale Liegefläche",
      component: (
        <p>
          Im 140cm breiten Bett steckt eine 190cm breite Liegefläche. Das erste
          Hubbett weltweit mit Lattenrostauszug. Dieser ermöglicht es nach dem
          Absenken die Liegefläche auf die maximale Breite deines Fahrzeuges
          auszuziehen.
        </p>
      ),
    },
    {
      label: "Offroad Fahren ohne Klappergeräusche",
      component: (
        <p>
          Wir haben bei der Konstruktion darauf geachtet, dass das Bett keine
          Geräusche während der Fahrt erzeugt, damit man die Fahrt genießen
          kann.
        </p>
      ),
    },
    {
      label: "Einfache Installation",
      component: (
        <p>
          Wenn du mit Akkuschrauber und Maßband umgehen kannst oder jemanden
          dazu kennst, ist die Installation der neuen Serie mit der
          mitgelieferten Videoanleitung kinderleicht. Natürlich haben wir auch
          Einbaupartner, die die Installation des Hubbettes übernehmen können.
          Je nach Fahrzeug gibt es die passenden Montagekonsolen. Manche
          Fahrzeuge wie der H2 Sprinter brauchen keine Montagekonsolen.
        </p>
      ),
    },
    {
      label: "Praktisch und Romantisch",
      component: (
        <p>
          Die indirekte, je nach Lust und Laune dimmbare Beleuchtung sorgt für
          eine angenehme Ambiente über und unter dem Bett. Der LED Streifen ist
          dabei in die Aluprofile sauber integriert.
        </p>
      ),
    },
    {
      label: "Sichere Gurtbefestigung",
      component: (
        <p>
          Das VAN7 Hubbett hängt an 4x 25mm Sicherheitsgurten und Schnallen, die
          jeweils für 400daN ausgelegt sind. Das bedeutet 1600kg – die Belastung
          des Bettes ist mit 270kg dynamisch zulässig. Jede Gurtaufhängung wird
          mit 2x M6 Einziehmutter befestigt. Eine Einziehmutter M6 hält bei
          einem Fahrzeugblech unter Abscherung 4-5kN – das sind 400-500kg pro
          Nietmutter. Für die VAN7 Hubbett Gurtaufhängungen werden 8
          Einziehmuttern am letzten Bereich der Wand deines Fahrzeuges
          installiert.
        </p>
      ),
    },
    {
      label: "Maximaler Platz",
      component: (
        <p>
          Das VAN7 Hubbett bietet dir den Platz und den Komfort, den du beim
          Übernachten auf mobilem kleinen Raum brauchst. Ruck zuck verschwindet
          es an der Decke und du hast mega viel Stauraum für Bikes oder für eine
          zusätzliche Sitzgruppe.
        </p>
      ),
    },
    {
      label: "Versand & Rückgabe",
      component: <ShippingInfoTab />,
    },
    {
      label: "Zusätzliche Informationen",
      component: <ProductInfoTab product={product} />,
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
          <span className="font-semibold">Gewicht</span>
          <p>{product.weight ? `${product.weight} kg` : "-"}</p>
        </div>
        {/* Dynamic dimensions */}
        <div>
          <span className="font-semibold">Abmessungen</span>
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
          <p>170cm</p>
        </div>
        <div>
          <span className="font-semibold">Material</span>
          <p>Aluminium - Stahl - Buche</p>
        </div>
        <div>
          <span className="font-semibold">Kompatibel</span>
          <p>Normmatratze 140cm x 200cm</p>
        </div>
        <div>
          <span className="font-semibold">Gewichtbelastung</span>
          <p>Bis zu 270kg</p>
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
