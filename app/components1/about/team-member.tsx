import { motion } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";
import { Avatar, AvatarFallback } from "../../components1/ui/avatar";

interface TeamMemberProps {
  name: string;
  position: string;
  bio: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  index: number;
}

export function TeamMember({ name, position, bio, socials, index }: TeamMemberProps) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
    
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-[0_0_15px_rgba(0,149,255,0.05)] hover:shadow-[0_0_20px_rgba(0,149,255,0.15)] transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 border-2 border-blue-500 shadow-[0_0_15px_rgba(0,149,255,0.3)]">
          <AvatarFallback className="bg-blue-900 text-blue-300 text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="mt-4 text-xl font-bold text-white">{name}</h3>
        <p className="text-blue-500 mb-2">{position}</p>
        <p className="text-gray-400 text-sm mb-4">{bio}</p>
        
        {socials && (
          <div className="flex space-x-3 text-gray-400">
            {socials.twitter && (
              <a href={socials.twitter} className="hover:text-blue-500 transition-colors">
                <Twitter size={18} />
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} className="hover:text-blue-500 transition-colors">
                <Linkedin size={18} />
              </a>
            )}
            {socials.github && (
              <a href={socials.github} className="hover:text-blue-500 transition-colors">
                <Github size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
