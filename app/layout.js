import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import Nav from "./component/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RacineFi",
  description: "RacineFi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="w-full fixed top-0 z-10"><Nav /></div>
          
          {children}
        </Providers>
      </body>
    </html>
  );
}
