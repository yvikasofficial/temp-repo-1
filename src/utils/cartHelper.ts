export const getTotalPrice = (
  items: any,
  order?: any,
  withoutDiscount = false
) => {
  let total = 0;

  const coupon = order?.coupon_lines?.[0];

  items?.forEach((item: any) => {
    total += parseInt(item?.product?.price, 10) * item?.selectedSeats;
  });

  const type = coupon?.meta_data?.[0]?.display_value?.discount_type;
  const amount = coupon?.meta_data?.[0]?.display_value?.amount;

  if (withoutDiscount) {
    return total;
  }

  if (type === "fixed_cart") {
    console.log(amount, total);
    const afterDiscount = total - parseInt(amount, 10);
    return Math.max(afterDiscount, 0);
  }

  return total;
};

export const getUSDFormat = (price: any) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(price);
};
