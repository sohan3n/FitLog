import "./globals.css";
import { PlanProvider } from "@/context/planContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster/>
        </PlanProvider>
      </body>
    </html>
  );
}
