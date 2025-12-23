// I am using React + Tailwind + Lucid React for icons

"use client";
import React, { useState } from "react";
import { BookOpen, Calculator, Microscope, CheckCircle } from "lucide-react";

type Subject = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  lightColor: string;
};

export default function StudyProgressTracker() {
  const [progress, setProgress] = useState<Record<string, number>>({
    Math: 0,
    English: 0,
    Science: 0,
  });

  const totalModules = 10;

  const subjects: Subject[] = [
    {
      name: "Math",
      icon: Calculator,
      color: "bg-blue-500",
      lightColor: "bg-blue-100",
    },

    {
      name: "English",
      icon: BookOpen,
      color: "bg-green-500",
      lightColor: "bg-green-100",
    },
    {
      name: "Science",
      icon: Microscope,
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
    },
  ];

  const markModuleComplete = (subject: Subject) => {
    setProgress((prev) => ({
      ...prev,
      [subject.name]: Math.min(prev[subject.name] + 1, totalModules),
    }));
  };

  const resetProgress = (subject: Subject) => {
    setProgress((prev) => ({
      ...prev,
      [subject.name]: 0,
    }));
  };

  const getPercentage = (completed: number) => {
    return Math.round((completed / totalModules) * 100);
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-50 p-6">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Study Progress Tracker
          </h1>
          <p className="text-gray-600">
            Track your learning journey across different subjects
          </p>
        </div>

        <div className="space-y-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            const completed = progress[subject.name]; // this is used to get the index position of subject within the progress state above
            const percentage = getPercentage(completed);
            const isComplete = completed === totalModules;

            return (
              <div
                key={subject.name}
                className="rounded-lg border border-gray-200 bg-gray-50 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`rounded-lg p-2 ${subject.lightColor}`}>
                      <Icon className={`h-6 w-6 text-gray-700`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {completed} of {totalModules} modules completed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isComplete && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                    <span className="text-2xl font-bold text-gray-700">
                      {percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${subject.color} flex items-center justify-end pr-2 transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 15 && (
                        <span className="text-xs font-medium text-white">
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Module Indicators, This is used to rep each module that was completed */}
                <div className="mb-4 flex space-x-1">
                  {Array.from({ length: totalModules }, (_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded ${
                        i < completed ? subject.color : "bg-gray-200"
                      } transition-colors duration-300`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => markModuleComplete(subject)}
                    disabled={isComplete}
                    className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                      isComplete
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : `${subject.color} text-white hover:opacity-90`
                    }`}
                  >
                    {isComplete ? "Completed!" : "Mark Module Complete"}
                  </button>

                  <button
                    onClick={() => resetProgress(subject)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    Reset
                  </button>
                </div>

                {isComplete && (
                  <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                    <p className="flex items-center text-sm font-medium text-green-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Congratulations! You have completed all {
                        subject.name
                      }{" "}
                      modules!
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
