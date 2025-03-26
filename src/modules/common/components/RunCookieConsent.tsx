"use client";

import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import PixelInit from "./PixelInit";

export default function RunCookieConsent() {
  const [analyticsAccepted, setAnalyticsAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {
          enabled: true,
        },
      },

      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom center",
          flipButtons: false,
          equalWeightButtons: false,
        },
        preferencesModal: {
          layout: "box",
          // position: 'left right',
          flipButtons: false,
          equalWeightButtons: true,
        },
      },

      language: {
        default: "de",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "We use necessary cookies for the shop to work and analytics cookies to better understand what we can improve. For more information, please see our <a href='/privacy-policy'>Privacy Policy</a>.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage Individual preferences",
            },
            preferencesModal: {
              title: "Manage cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Accept current selection",
              closeIconLabel: "Close modal",
              sections: [
                {
                  title: "Somebody said ... cookies?",
                  description: "I want one!",
                },
                {
                  title: "Strictly Necessary cookies",
                  description:
                    "These cookies are essential for the proper functioning of the website and cannot be disabled.",

                  //this field will generate a toggle linked to the 'necessary' category
                  linkedCategory: "necessary",
                },
                {
                  title: "Performance and Analytics",
                  description:
                    "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
                },
              ],
            },
          },
          de: {
            consentModal: {
              title: "Wir verwenden Cookies",
              description:
                "Wir verwenden unbedingt notwendige Cookies, damit der Shop funktioniert, und Analytics-Cookies, um zu verstehen, wie wir Ihr Erlebnis verbessern können. Weitere Informationen finden Sie in unserer <a href='/datenschutz'>Datenschutzerklärung</a>.",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              showPreferencesBtn: "Einzelne Einstellungen verwalten",
            },
            preferencesModal: {
              title: "Cookie-Einstellungen verwalten",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              savePreferencesBtn: "Aktuelle Auswahl übernehmen",
              closeIconLabel: "Modal schließen",
              sections: [
                {
                  title: "Jemand sagte ... Cookies?",
                  description: "Ich möchte welche!",
                },
                {
                  title: "Unbedingt notwendige Cookies",
                  description:
                    "Diese Cookies sind essenziell für die korrekte Funktion der Website und können nicht deaktiviert werden.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Leistung und Analysen",
                  description:
                    "Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle Daten sind anonymisiert und können nicht zur Identifikation verwendet werden.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Mehr Informationen",
                  description:
                    'Bei Fragen zu meiner Cookie-Richtlinie und Ihren Optionen, bitte <a href="#contact-page">kontaktieren Sie uns</a>',
                },
              ],
            },
          },
        },
      },

      onChange: () => {
        if (CookieConsent.acceptedCategory("analytics")) {
          setAnalyticsAccepted(true);
        } else {
          setAnalyticsAccepted(false);
        }
      },
      onConsent: () => {
        if (CookieConsent.acceptedCategory("analytics")) {
          setAnalyticsAccepted(true);
        }
      },
    }).then(() => {
      if (CookieConsent.acceptedCategory("analytics")) {
        setAnalyticsAccepted(true);
      }
    });
  }, []);

  return <>{analyticsAccepted && <PixelInit />}</>;
}
