"use client";
import { Dialog, Transition } from "@headlessui/react";
import KontaktFormular from "@modules/home/components/kontakt/form";
import React, { Fragment } from "react";
import useToggleState from "@lib/hooks/use-toggle-state";
import { Button } from "@medusajs/ui";
import { useTranslations } from "next-intl";

interface KontaktFormularDialogProps {
  typ?: "Anfrage" | "Sondermass";
}

const KontaktFormularDialog: React.FC<KontaktFormularDialogProps> = ({
  typ = "Sondermass",
}) => {
  const { state, open, close } = useToggleState();
  const t = useTranslations("product.button");

  return (
    <>
      <Button
        onClick={open}
        variant={typ === "Anfrage" ? "primary" : "secondary"}
        className="h-10 w-full"
      >
        {typ === "Anfrage" ? t("requestOrder") : t("customSize")}
      </Button>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          {/* Responsive container: centered on desktop, full width on mobile */}
          <div className="fixed inset-0 flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:mx-4 sm:w-auto">
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={close}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    X
                  </button>
                </div>
                {/* KontaktFormular Content */}
                <div className="mt-4">
                  <KontaktFormular />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default KontaktFormularDialog;
