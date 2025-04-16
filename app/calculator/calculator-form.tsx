import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema validation
const formSchema = z.object({
  principal: z.coerce.number().positive("Investment must be positive").min(1, "Minimum investment is 1"),
  interestRate: z.coerce.number().positive("Interest rate must be positive").max(100, "Maximum interest rate is 100%"),
  time: z.coerce.number().positive("Time period must be positive").min(1, "Minimum time period is 1 year"),
  compoundingFrequency: z.enum(["annually", "semiannually", "quarterly", "monthly", "daily"]),
});

export type FormValues = z.infer<typeof formSchema>;
export type ResultType = {
  futureValue: number;
  totalInterest: number;
  breakdown: { year: number; interest: number; balance: number }[];
};

type CalculatorFormProps = {
  onCalculate: (results: ResultType) => void;
};

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const compoundingMap = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      principal: 1000,
      interestRate: 5,
      time: 5,
      compoundingFrequency: "annually",
    },
  });
  const scrollbtn = ()=>{
   
    const position = window.scrollY + 600;
    window.scrollTo({ top: position, behavior: 'smooth' });
  }

  const calculateReturn = (data: FormValues) => {
    const { principal, interestRate, time, compoundingFrequency } = data;
    const rate = interestRate / 100;
    const n = compoundingMap[compoundingFrequency];
    
    // Calculate using compound interest formula: A = P(1 + r/n)^(nt)
    const futureValue = principal * Math.pow(1 + rate / n, n * time);
    const totalInterest = futureValue - principal;
    
    // Generate yearly breakdown
    const breakdown = [];
    let currentValue = principal;
    
    for (let year = 1; year <= time; year++) {
      const yearValue = principal * Math.pow(1 + rate / n, n * year);
      const yearInterest = yearValue - currentValue;
      
      breakdown.push({
        year,
        interest: parseFloat(yearInterest.toFixed(2)),
        balance: parseFloat(yearValue.toFixed(2)),
      });
      
      currentValue = yearValue;
    }
    
    onCalculate({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      breakdown,
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-blue-400">Calculate Your Returns</CardTitle>
        <CardDescription>Enter your investment details below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(calculateReturn)} className="space-y-6">
            <FormField
              control={form.control}
              name="principal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Investment</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <Input
                        type="number"
                        placeholder="1000"
                        className="pl-8 bg-gray-800"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The amount you plan to invest initially.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Interest Rate (%)</FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Slider
                          min={0}
                          max={20}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          className="w-20 bg-gray-800"
                          step={0.1}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormDescription>
                    The annual interest rate your investment will earn.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Period (Years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="5"
                      className="bg-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of years you plan to invest.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compoundingFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compounding Frequency</FormLabel>
                  <FormControl>
                    <Tabs
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-5 bg-gray-800">
                        <TabsTrigger value="annually">Annually</TabsTrigger>
                        <TabsTrigger value="semiannually">Semi</TabsTrigger>
                        <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                  <FormDescription>
                    How often the interest is compounded.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" onClick={scrollbtn} className="w-full bg-blue-600 hover:bg-blue-700">
              Calculate Return
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}