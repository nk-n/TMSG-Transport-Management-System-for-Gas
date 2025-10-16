export interface Shipping {
  shipping8Ton: ShippingEntry[];
  shipping10Ton: ShippingEntry[];
  shippingTrailer: ShippingEntry[];
}

export interface ShippingResponse {
  shipping_8_ton: ShippingEntry[];
  shipping_10_ton: ShippingEntry[];
  shipping_trailer: ShippingEntry[];
}

export interface ShippingEntry {
  month: number;
  total: number;
}

export const toShipping = (data: ShippingResponse): Shipping => {
  return {
    shipping8Ton: data.shipping_8_ton,
    shipping10Ton: data.shipping_10_ton,
    shippingTrailer: data.shipping_trailer,
  };
};
