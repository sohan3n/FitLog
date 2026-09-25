"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Workout = {
  id: string | number;
  name: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
};

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  addToSaved: (workout: Workout) => void;
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

  // Save to localStorage on state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) return; 
    if (!plan.find((w) => w.id === workout.id)) {
      setPlan([...plan, workout]);
    }
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((w) => w.id !== id));
  };

  const addToSaved = (workout: Workout) => {
    if (!saved.find((w) => w.id === workout.id)) {
      setSaved([...saved, workout]);
    }
  };

  const removeFromSaved = (id: string | number) => {
    setSaved(saved.filter((w) => w.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, addToPlan, removeFromPlan, addToSaved, removeFromSaved }}
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