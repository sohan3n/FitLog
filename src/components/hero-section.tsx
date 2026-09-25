import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 md:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="bg-[#1A1D23] rounded-4xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left-side Content */}
        <div className="flex-1 max-w-137.5">
          <p className="text-[#ccff00] text-xs font-bold tracking-[0.15em] uppercase mb-4">
            Workout Library
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white uppercase leading-[0.95] mb-6 tracking-tighter">
            Train with intent.<br />Log every set.
          </h1>
          <p className="text-[#9ca3af] text-sm md:text-base mb-10 leading-relaxed pr-4">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <Link 
            href="#library" 
            className="inline-block bg-[#ccff00] text-black font-bold uppercase text-sm px-8 py-3.5 rounded-md hover:bg-[#b3e600] transition-colors"
          >
            Browse Workouts
          </Link>
        </div>
        
        {/* Right-side Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image 
            src="/hero-banner-img.png" 
            alt="Gym Machine Anatomy" 
            width={450} 
            height={450} 
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}