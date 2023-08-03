import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import NextNProgress from "nextjs-progressbar";
import "react-loading-skeleton/dist/skeleton.css";
import "tippy.js/dist/tippy.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "react-calendar/dist/Calendar.css";
import { Provider } from "react-redux";
import store from "@/store";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";

SwiperCore.use([Autoplay]);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress
        height={5}
        color="#264AE6"
        options={{ easing: "ease", speed: 500 }}
      />
      <Component {...pageProps} />
    </Provider>
  );
}
