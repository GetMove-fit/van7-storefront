import { HttpTypes } from "@medusajs/types";
import { Container } from "@medusajs/ui";
import Checkbox from "@modules/common/components/checkbox";
import Input from "@modules/common/components/input";
import { mapKeys } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import AddressSelect from "../address-select";
import CountrySelect from "../country-select";
import { useTranslations } from "use-intl";

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null;
  cart: HttpTypes.StoreCart | null;
  checked: boolean;
  onChange: () => void;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
    vat_id: cart?.metadata?.vat_id || "",
  });

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  );

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  );

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string,
    vat_id?: string
  ) => {
    address &&
      setFormData((prevState) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }));

    email &&
      setFormData((prevState) => ({
        ...prevState,
        email,
      }));

    vat_id &&
      setFormData((prevState) => ({
        ...prevState,
        vat_id,
      }));
  };

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(
        cart?.shipping_address,
        cart?.email,
        cart?.metadata?.vat_id as string | undefined
      );
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email, undefined);
    }
  }, [cart]); // Add cart as a dependency

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const t = useTranslations("checkout.shipping_address");

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {t("use_saved_address", { name: customer.first_name })}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t("first_name")}
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
        />

        <Input
          label={t("last_name")}
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
        />

        <Input
          label={t("address")}
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData["shipping_address.address_1"]}
          onChange={handleChange}
          required
          data-testid="shipping-address-input"
        />

        <Input
          label={t("company")}
          name="shipping_address.company"
          value={formData["shipping_address.company"]}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
        />

        <Input
          label={t("postal_code")}
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          value={formData["shipping_address.postal_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-postal-code-input"
        />

        <Input
          label={t("city")}
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"]}
          onChange={handleChange}
          required
          data-testid="shipping-city-input"
        />

        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />

        <Input
          label={t("province")}
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData["shipping_address.province"]}
          onChange={handleChange}
          data-testid="shipping-province-input"
        />
      </div>
      <div className="my-8">
        <Checkbox
          label={t("same_as_billing")}
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <Input
          label={t("email")}
          name="email"
          type="email"
          title={t("valid_email")}
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />

        <Input
          label={t("phone")}
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          required
          data-testid="shipping-phone-input"
        />

        <Input
          label={t("vat_id")}
          name="vat_id"
          value={formData["vat_id"]}
          onChange={handleChange}
          pattern="^[A-Z]{2}[A-Z0-9]{2,12}$"
        />
      </div>
    </>
  );
};

export default ShippingAddress;
