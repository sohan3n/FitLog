import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-10 text-center">
      {/* Image Container */}
      <div className="bg-[#1a1c23] rounded-3xl p-8 mb-8 inline-block shadow-lg">
        <Image
          src="/404-img.png"
          alt="Broken Barbell 404"
          width={350}
          height={300}
          className="object-contain rounded-2xl"
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-black tracking-wide text-white uppercase mb-4">
        404-Missed that lift
      </h1>

      <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm md:text-base">
        The page you wanted is not in the library. Head back to the floor and
        pick a workout that exists.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        Back to workouts
      </Link>
    </div>
  );
}
