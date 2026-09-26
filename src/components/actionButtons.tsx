"use client";

import { FiCalendar, FiBookmark } from "react-icons/fi";
import toast from "react-hot-toast";
import { usePlan } from "@/context/planContext";
import { Workout } from "@/components/library";

export default function ActionButtons({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  const isAtCap = plan.length >= 5;

  const handleAddToPlan = () => {
    if (isAtCap) {
      toast.error("today's plan is full-finish them first", {
        style: { background: "#333", color: "#fff" }
      });
      return;
    }

    // 2. Check if already added to prevent multiple adding
    const alreadyInPlan = plan.some((w) => w.id === workout.id);
    addToPlan(workout);
    
    if (!alreadyInPlan) {
      toast.success("Added to today's plan", {
        style: { background: "#333", color: "#fff" }
      });
    }
  };

  const handleSaveForLater = () => {
    const alreadyInSaved = saved.some((w) => w.id === workout.id);
    saveForLater(workout); 
    
    if (!alreadyInSaved) {
      toast.success("Saved for later", {
        style: { background: "#333", color: "#fff" }
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-8">
      <button 
        onClick={handleAddToPlan}
        className={`flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-md transition-colors cursor-pointer ${
          isAtCap 
            ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
            : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
        }`}
      >
        <FiCalendar className="text-lg" />
        {isAtCap ? "Plan Full" : "Add to today's plan"}
      </button>
      
      <button 
        onClick={handleSaveForLater}
        className="flex items-center gap-2 bg-transparent border border-gray-600 text-white font-bold text-sm px-6 py-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <FiBookmark className="text-lg" />
        Save for later
      </button>
    </div>
  );
}