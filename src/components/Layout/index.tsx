import { FC } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { CategoryType, FooterType } from "@/interfaces";
import parser from "html-react-parser";
import Head from "next/head";

interface LayoutProps {
  children: any;
  footer?: FooterType[];
  categories?: CategoryType[];
  data?: any;
}

const Layout: FC<LayoutProps> = ({ children, footer, categories, data }) => {
  const fullHead = parser(
    data?.yoast_head ??
      "<title>ACTS - Employee training & development classes</title>"
  );

  return (
    <>
      <Head>{fullHead}</Head>
      <Header categories={categories} />
      {children}
      <Footer data={footer?.[0]} />
    </>
  );
};

export default Layout;
