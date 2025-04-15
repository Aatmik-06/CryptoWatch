import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ResultType } from "./calculator-form";

interface ResultsDisplayProps {
  results: ResultType | null;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-blue-400">Your Investment Growth</CardTitle>
        <CardDescription>See how your investment will grow over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {results ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Future Value</p>
                <p className="text-blue-400 text-2xl font-bold">${results.futureValue.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Interest</p>
                <p className="text-green-400 text-2xl font-bold">${results.totalInterest.toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Yearly Breakdown</h3>
              <div className="overflow-auto max-h-[300px] rounded-lg border border-gray-800">
                <table className="min-w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Year</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Interest Earned</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {results.breakdown.map((item) => (
                      <tr key={item.year} className="bg-gray-900">
                        <td className="py-2 px-4 text-sm text-gray-300">{item.year}</td>
                        <td className="py-2 px-4 text-sm text-green-400">${item.interest.toLocaleString()}</td>
                        <td className="py-2 px-4 text-sm text-blue-400">${item.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-80 text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>Enter your investment details on the left to see your projected returns.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        <p>This is a simplified calculator for educational purposes only. Actual returns may vary.</p>
      </CardFooter>
    </Card>
  );
}