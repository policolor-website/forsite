import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forsite Romania — Creare Magazin Online, Site & Aplicații Mobile",
  description: "Creare magazin online, site de prezentare și aplicații iOS/Android. Fără plată în avans. Livrare 3-4 săptămâni.",
  verification: {
    google: "forsite-ro-verification",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GT-P8ZR2GD4');
          `}
        </Script>

        {/* Google Ads (AW-16698623368) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16698623368"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16698623368');
            // Phone conversion tracking — same as forsite.ro
            gtag('config', 'AW-16698623368/SCaRCPmPlZcbEIiLw5o-', {
              'phone_conversion_number': '0785598779'
            });
            // gtag_report_conversion — official Google Ads conversion function
            window.gtag_report_conversion = function(url) {
              var callback = function() {
                if (typeof(url) !== 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-16698623368/SCaRCPmPlZcbEIiLw5o-',
                'value': 1,
                'currency': 'RON',
                'event_callback': callback
              });
              return false;
            };
          `}
        </Script>

        {/* Google Analytics 4 — G-1K8BVZQGC5 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1K8BVZQGC5"
          strategy="afterInteractive"
        />
        <Script id="ga4-primary" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1K8BVZQGC5');
          `}
        </Script>

        {/* Google Analytics 4 — G-KWL0RCJCP4 */}
        <Script id="ga4-secondary" strategy="afterInteractive">
          {`
            gtag('config', 'G-KWL0RCJCP4');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GT-P8ZR2GD4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
