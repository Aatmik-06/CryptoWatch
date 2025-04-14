import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components1/ui/accordion";
import { faqItems } from "@/lib/constants";

export function FAQ() {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-[0_0_15px_rgba(0,149,255,0.1)]">
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800">
            <AccordionTrigger className="text-left text-white hover:text-blue-500 py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
