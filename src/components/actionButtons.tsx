"use client";

import { FiCalendar, FiBookmark } from "react-icons/fi";
import toast from "react-hot-toast";
import { usePlan } from "@/context/planContext";
import { Workout } from "@/components/library";

export default function ActionButtons({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater } = usePlan();

  const handleAddToPlan = () => {
    addToPlan(workout);
    toast.success("Added to today's plan", {
      style: { background: "#333", color: "#fff" }
    });
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    toast.success("Saved for later", {
      style: { background: "#333", color: "#fff" }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-8">
      <button 
        onClick={handleAddToPlan}
        className="flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm px-6 py-3 rounded-md hover:bg-[#b3e600] transition-colors"
      >
        <FiCalendar className="text-lg" />
        Add to today's plan
      </button>
      
      <button 
        onClick={handleSaveForLater}
        className="flex items-center gap-2 bg-transparent border border-gray-600 text-white font-bold text-sm px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
      >
        <FiBookmark className="text-lg" />
        Save for later
      </button>
    </div>
  );
}