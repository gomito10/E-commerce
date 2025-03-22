import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {useRouter} from "next/navigation"
import Appbar from "./Appbar"
import Footer from "./Footer"
import "./globals.css";
import "./global.css"
import {CountCart} from './crearContexto'
import {IconButton,Typography} from '@mui/material'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:{
    default:"diseño principal",
    absolute:"",
    template:"%s-coneccion"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CountCart>
          <Appbar />
        <main>{children}</main>
          <Footer/>
      </CountCart>
      </body>
    </html>
  );
}
