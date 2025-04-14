import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative py-12">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-blue-500/10 via-blue-500 to-blue-500/10" />
      
      {items.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "relative mb-12 md:flex items-center justify-between",
            index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
          )}
        >
          {/* Content */}
          <div className="md:w-5/12 mb-8 md:mb-0">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-[0_0_15px_rgba(0,149,255,0.1)] hover:shadow-[0_0_25px_rgba(0,149,255,0.2)] transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
          
          {/* Year Marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,149,255,0.5)]">
              <div className="w-6 h-6 rounded-full bg-black"></div>
            </div>
            <div className="mt-2 bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-blue-400">
              {item.year}
            </div>
          </div>
          
          {/* Empty space for the other side */}
          <div className="md:w-5/12"></div>
        </motion.div>
      ))}
    </div>
  );
}
