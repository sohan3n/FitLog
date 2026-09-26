import Image from "next/image";
import Link from "next/link";
import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

export type Workout = {
  id: string | number;
  name: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  image: string;
  muscleGroups: string[];
};

export default async function Library() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store", 
  });
  const workouts: Workout[] = await res.json();

  return (
    <section id="library" className="px-4 md:px-8 py-16 w-full max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white uppercase tracking-wide mb-2">
          The Library
        </h2>
        <p className="text-[#9ca3af] text-sm md:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <Link
            href={`/exercise/${workout.id}`}
            key={workout.id}
            className="bg-[#1A1D23] rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="relative h-56 w-full bg-[#1a1c23]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {workout.muscleGroups?.map((group, index) => (
                  <span
                    key={index}
                    className="bg-[#ccff00] text-black text-[11px] font-bold px-3 py-1 rounded-full tracking-wide"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-black text-white uppercase mb-1">
                {workout.name}
              </h3>
              <p className="text-[#9ca3af] text-sm mb-6 flex-1">
                {workout.equipment}
              </p>

              <div className="flex items-center gap-5 text-[#ccff00] text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <FiClock className="text-base" />
                  <span className="text-gray-300">{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaFire className="text-base" />
                  <span className="text-gray-300">{workout.caloriesBurned} kcal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiStar className="text-base" />
                  <span className="text-gray-300">{workout.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};