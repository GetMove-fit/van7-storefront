import { StorePrice } from "@medusajs/types";

export type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
};

export type VariantPrice = {
  calculated_price_number: number;
  calculated_price: string;
  original_price_number: number;
  original_price: string;
  currency_code: string;
  price_type: string;
  percentage_diff: string;
};

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean;
  target_remaining: number;
  remaining_percentage: number;
};

export type Pricing = {
  brutto: number;
  brutto_format: string;
  original_brutto: number;
  original_brutto_format: string;
  netto: number;
  netto_format: string;
  original_netto: number;
  original_netto_format: string;
  tax: number;
  tax_format: string;
  tax_rate: number;
  discount_percent: number;
};
