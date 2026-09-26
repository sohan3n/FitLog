import Image from "next/image";
import { notFound } from "next/navigation";
import ActionButtons from "@/components/actionButtons";

export default async function ExerciseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store"
  });
  
  if (!res.ok) return notFound();
  const workout = await res.json();

  return (
    <div className="px-4 md:px-8 py-10 w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left-Side image */}
        <div className="w-full lg:w-1/2">
          <div className="relative h-100 lg:h-175 w-full rounded-2xl overflow-hidden bg-[#1a1c23]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right-Side*/}
        <div className="w-full lg:w-1/2 flex flex-col">
          
          {/* Title & Subtitle */}
          <h1 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-3">
            {workout.name}
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            {workout.description}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups?.map((group: string, index: number) => (
              <span
                key={index}
                className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full tracking-wide"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Panel */}
          <div className="bg-[#15171D] rounded-xl p-6 mb-8">
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Equipment</span>
                <span className="text-white font-medium">{workout.equipment}</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Difficulty</span>
                <span className="text-white font-medium">{workout.difficulty}</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Sets</span>
                <span className="text-white font-medium">{workout.sets}</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Reps</span>
                <span className="text-white font-medium">{workout.reps}</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Duration</span>
                <span className="text-white font-medium">{workout.duration} min</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-800 pb-4">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Calories</span>
                <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 uppercase font-bold tracking-wider">Rating</span>
                <span className="text-white font-medium">{workout.rating}</span>
              </li>
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-wide">
              Instructions
            </h3>
            <ol className="list-decimal list-outside ml-4 text-gray-300 text-sm md:text-base space-y-3 leading-relaxed">
              {workout.instructions?.map((step: string, index: number) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>

          {/* Call to action Buttons Component */}
          <ActionButtons workout={workout} />

        </div>
      </div>
    </div>
  );
}