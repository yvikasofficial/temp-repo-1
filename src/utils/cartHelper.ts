export const getTotalPrice = (items: any) => {
  let total = 0;

  items?.forEach((item: any) => {
    total += parseInt(item?.product?.price, 10) * item?.selectedSeats;
  });

  return total;
};

export const getUSDFormat = (price: any) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(price);
};
