"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

export type Workout = {
  id: string | number;
  name: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  image: string;
};

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number, silent?: boolean) => void;
  addToSaved: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void; 
  removeFromSaved: (id: string | number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fitlog_plan");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [saved, setSaved] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fitlog_saved");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) return; 
    
    if (plan.find((w) => w.id === workout.id)) {
      toast.error("already in today's plan", {
        style: { background: "#333", color: "#fff" },
      });
      return;
    }
    setPlan([...plan, workout]);
  };

  const removeFromPlan = (id: string | number, silent = false) => {
  setPlan(plan.filter((w) => w.id !== id));
  if (!silent) {
    toast.error("removed from the today's plan", {
      style: { background: "#333", color: "#fff" },
    });
  }
};

  const addToSaved = (workout: Workout) => {
    if (saved.find((w) => w.id === workout.id)) {
      toast.error("already in the saved", {
        style: { background: "#333", color: "#fff" },
      });
      return;
    }
    setSaved([...saved, workout]);
  };

  const saveForLater = (workout: Workout) => {
    addToSaved(workout);
  };

  const removeFromSaved = (id: string | number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.error("removed from saved", {
      style: { background: "#333", color: "#fff" },
    });
  };

  return (
    <PlanContext.Provider
      value={{ 
        plan, 
        saved, 
        addToPlan, 
        removeFromPlan, 
        addToSaved, 
        saveForLater, 
        removeFromSaved 
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}