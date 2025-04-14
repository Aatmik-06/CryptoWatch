import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactMap() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-[0_0_15px_rgba(0,149,255,0.1)]">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-6">Our Location</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <p className="text-white">123 Blockchain Avenue</p>
              <p className="text-gray-400">San Francisco, CA 94103</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-blue-500 mr-3" />
            <p className="text-white">+1 (555) 123-4567</p>
          </div>
          
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-500 mr-3" />
            <p className="text-white">info@cryptowatch.com</p>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <p className="text-white">Monday - Friday: 9AM - 6PM</p>
              <p className="text-gray-400">Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="h-[300px] bg-gray-800 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-2">Interactive Map</p>
            <MapPin className="h-10 w-10 text-blue-500 mx-auto animate-bounce" />
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,149,255,0.1)_0%,transparent_70%)]"></div>
      </div>
    </div>
  );
}
