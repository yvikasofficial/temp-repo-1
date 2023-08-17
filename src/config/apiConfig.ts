import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const BASE_URL = "https://alliancecarstg.wpengine.com";

const api = new WooCommerceRestApi({
  url: BASE_URL,
  consumerKey: "ck_75d6b004b432bc8f922680dc51d3111aacea3825",
  consumerSecret: "cs_648450fe2f6f5d56243e42b8e1c13682f69be387",
  version: "wc/v3",
});

export default api;

export const apiRoutes = {
  BLOGS: `${BASE_URL}/wp-json/wp/v2/posts?_embed`,
  BLOG_CATEGORIES: `${BASE_URL}/wp-json/wp/v2/categories`,
  ABOUT_PAGE: `${BASE_URL}/wp-json/wp/v2/pages?slug=about-page-2&acf_format=standard`,
  COURSES_PAGE: `${BASE_URL}/wp-json/wp/v2/pages?slug=courses&_embed`,
  HOME_PAGE: `${BASE_URL}/wp-json/wp/v2/pages?slug=home-page&_embed&acf_format=standard`,
  FAQ_PAGE: `${BASE_URL}/wp-json/wp/v2/pages?slug=faq-page&_embed`,
  CLASSROOM: `${BASE_URL}/wp-json/wp/v2/pages?slug=classrooms&_embed&acf_format=standard`,
  VOUCHERS: `${BASE_URL}/wp-json/wp/v2/pages?slug=vouchers&_embed&acf_format=standard`,
  BLOG_PAGE: `${BASE_URL}/wp-json/wp/v2/pages?slug=blogs-page`,
  CALENDER: `${BASE_URL}/wp-json/wl/v1/products`,
  SINGLE_COURSE: `${BASE_URL}/wp-json/wl/v1/product`,
  CHECKOUT: "/checkout",
};
