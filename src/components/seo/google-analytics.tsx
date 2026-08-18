import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 (gtag.js). Solo emite en producción y si
 * NEXT_PUBLIC_GA_ID existe en el build — así ni el dev local ni el preview
 * de GitHub Pages (que compila sin la variable) envían analítica.
 */
export function GoogleAnalytics() {
  if (!GA_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
