import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-4 bg-base-100 px-4 md:px-8 py-6 border-t border-white/10">
      <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-wider text-white uppercase">
        <Image src="/nav-logo.png" alt="FitLog Logo" width={100} height={80} className="object-contain" />
      </Link>
      
      <p className="text-gray-400 text-sm text-center md:text-right">
        &copy; 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}