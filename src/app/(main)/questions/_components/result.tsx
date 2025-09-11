"use client";
import { Card, CardContent } from "@/components/ui/card";
import { QuizResultResponse } from "@/lib/types/result";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// PROPS
/**
 * Props interface for the ResultView component
 * @param result - Complete quiz result data including scores and question details
 */
type Props = {
  result: QuizResultResponse;
};
export default function ResultView({ result }: Props) {
  // ==== VARIABLES ====
  const COLORS = ["#00BC7D", "#EF4444"];
  const data = [
    { name: "Correct", value: result.correct },
    { name: "Wrong", value: result.wrong },
  ];

  return (
    <>
      {/* ===== MAIN CONTAINER =====*/}
      <div className="w-full space-y-4">
        <div className="flex flex-col lg:flex-row  items-stretch min-h-[514px]  ">
          {/* ===== LEFT SECTION: PIE CHART VISUALIZATION ===== */}
          <div className="w-full   h-full flex items-center justify-center lg:w-1/3 min-w-[203px] ">
            <Card className="border-none shadow-none  ">
              <CardContent className="flex flex-col items-center justify-start  ">
                {/* ===== PIE CHART CONTAINER ===== */}
                <div className=" w-[240px]  h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        innerRadius={65}
                        outerRadius={105}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {/* Map data to colored segments */}
                        {data.map((entry, i) => (
                          <Cell
                            key={`cell-${i}`}
                            fill={COLORS[i % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className=" text-sm font-mono font-medium  ">
                  {/* Correct answers indicator */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 inline-block bg-emerald-500 rounded-sm" />
                    <span className="text-sm">Correct: {result.correct}</span>
                  </div>

                  {/* Incorrect answers indicator */}
                  <div className="flex items-center gap-2 ">
                    <span className="w-3 h-3 inline-block bg-red-500 rounded-sm" />
                    <span className="text-sm">Incorrect: {result.wrong}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ===== RIGHT SECTION: DETAILED QUESTION BREAKDOWN ===== */}
          <div className="overflow-auto flex-1 pt-4  bg-white border border-1">
            {/* Wrong Questions */}
            {result.WrongQuestions.map((question, index) => (
              <Card key={question.QID} className="border-none shadow-none">
                <CardContent className="">
                  {/* Questions */}
                  <h3 className="text-blue-600 font-mono font-semibold  mb-4 text-xl">
                    {question.Question}
                  </h3>

                  <div className="space-y-3">
                    {/* User's Wrong Answer */}
                    <div className="flex items-center space-x-3 p-3  bg-red-50 border-none">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 border-red-500 bg-red-500">
                          <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                      </div>
                      <span className="text-gray-700">
                        {question.answers[
                          question.inCorrectAnswer as keyof typeof question.answers
                        ] || question.inCorrectAnswer}
                      </span>
                    </div>

                    {/* Correct Answer */}
                    <div className="flex items-center space-x-3 p-3  bg-green-50 border-none">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500  ">
                          <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                      </div>
                      <span className="text-gray-700">
                        {question.answers[
                          question.correctAnswer as keyof typeof question.answers
                        ] || question.correctAnswer}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Correct Questions */}
            {result.correctQuestions.map((question, index) => (
              <Card key={question.QID} className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-blue-600  font-medium mb-4 text-lg">
                    {question.Question}
                  </h3>

                  <div className="space-y-3">
                    {/* Correct Answer Only */}
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500">
                          <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                      </div>
                      <span className="text-gray-700">
                        {question.answers[
                          question.correctAnswer as keyof typeof question.answers
                        ] || question.correctAnswer}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
