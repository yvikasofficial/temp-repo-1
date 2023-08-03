import api from "@/config/apiConfig";
import axios from "axios";

const getPageData = async (
  func = null as any,
  func2 = null as any,
  func3 = null as any,
  func4 = null as any
) => {
  const request = [
    await api.get(`products/categories`, {
      per_page: 8,
    }),
    await axios.get(
      `https://alliancecarstg.wpengine.com/wp-json/wp/v2/footer?acf_format=standard`
    ),
  ];
  if (func) {
    request.push(await func);
  }
  if (func2) {
    request.push(await func2);
  }
  if (func3) {
    request.push(await func3);
  }
  if (func4) {
    request.push(await func4);
  }

  const [categories, footer, res1, res2, res3, res4] = await axios.all(request);

  return {
    res: res1?.data ?? {},
    res2: res2?.data ?? {},
    res3: res3?.data ?? {},
    res4: res4?.data ?? {},
    categories: categories?.data,
    footer: footer?.data,
  };
};

export default getPageData;
