import vazirFont from "@/constants/localFonts";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "../Providers";
import Header from "../Header";

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js shop test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans`}
      >
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
