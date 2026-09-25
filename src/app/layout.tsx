import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
