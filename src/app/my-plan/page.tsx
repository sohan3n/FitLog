"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/planContext";
import toast from "react-hot-toast";
import { FiClock, FiActivity, FiStar, FiX } from "react-icons/fi";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration",
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = plan.reduce(
    (acc, curr) => acc + (curr.caloriesBurned || 0),
    0,
  );

  const currentList = activeTab === "plan" ? plan : saved;

  const displayedWorkouts = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") {
        const calA = a.caloriesBurned || 0;
        const calB = b.caloriesBurned || 0;
        return calB - calA;
      }
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [currentList, sortBy]);

  const handleMarkAsDone = (id: string | number) => {
    toast.success("workout logged-nice work", {
      style: { background: "#333", color: "#fff" },
    });
    removeFromPlan(id, true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#ccff00] font-bold">
        Loading workouts...
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-10 w-full max-w-5xl mx-auto text-white">
      {/* Header */}
      <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
        My Plan
      </h1>
      <p className="text-gray-400 mb-8">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Live Metrics Row */}
      <div className="grid grid-cols-3 gap-4 bg-[#15171D] py-6 rounded-2xl mb-10 divide-x divide-gray-800 shadow-lg">
        <div className="flex flex-col px-6 md:px-10">
          <span className="text-gray-500 text-xs font-bold uppercase mb-1">
            Exercises
          </span>
          <span className="text-3xl md:text-4xl font-black text-[#ccff00]">
            {totalExercises}
          </span>
        </div>
        <div className="flex flex-col px-6 md:px-10">
          <span className="text-gray-500 text-xs font-bold uppercase mb-1">
            Minutes
          </span>
          <span className="text-3xl md:text-4xl font-black text-white">
            {totalMinutes}
          </span>
        </div>
        <div className="flex flex-col px-6 md:px-10">
          <span className="text-gray-500 text-xs font-bold uppercase mb-1">
            Calories
          </span>
          <span className="text-3xl md:text-4xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Controls: Tabs and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        {/* Toggle Tabs */}
        <div className="flex bg-[#1a1c23] p-1.5 rounded-xl">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#15171D] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#15171D] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Container */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <span className="text-sm text-white font-medium">Sort By</span>
          <select
            className="cursor-pointer bg-transparent border border-gray-700 text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-gray-500 min-w-[200px]"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "duration" | "calories" | "rating")
            }
          >
            <option className="bg-[#15171D]" value="duration">
              Duration
            </option>
            <option className="bg-[#15171D]" value="calories">
              Calories
            </option>
            <option className="bg-[#15171D]" value="rating">
              Rating
            </option>
          </select>
        </div>
      </div>

      {/* List Rendering & Empty State */}
      {displayedWorkouts.length === 0 ? (
        <div className="bg-[#15171D] rounded-2xl p-16 flex flex-col items-center justify-center text-center mt-4">
          <h3 className="text-2xl font-black uppercase mb-3">
            Nothing Here Yet
          </h3>
          <p className="text-gray-400 mb-8">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/">
            <button className="bg-[#ccff00] text-black font-bold text-sm px-8 py-3 rounded-md hover:bg-[#b3e600] transition-colors cursor-pointer">
              Go to workouts
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {displayedWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-[#15171D] rounded-xl p-4 pr-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-transparent hover:border-gray-800 transition-colors"
            >
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-[#1a1c23] shrink-0">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase leading-tight tracking-wide">
                    {workout.name}
                  </h4>
                  <p className="text-gray-400 text-xs mb-3">
                    {workout.equipment}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-medium text-[#ccff00]">
                    <span className="flex items-center gap-1.5">
                      <FiClock /> {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiActivity /> {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiStar /> {workout.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                <Link href={`/exercise/${workout.id}`}>
                  <button className="border border-gray-600 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                    View Details
                  </button>
                </Link>

                {activeTab === "plan" && (
                  <button
                    onClick={() => handleMarkAsDone(workout.id)}
                    className="bg-[#ccff00] text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#b3e600] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    ✓ Mark as Done
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="text-gray-500 hover:text-white transition-colors ml-2 p-1 cursor-pointer"
                  title="Remove"
                >
                  <FiX size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
