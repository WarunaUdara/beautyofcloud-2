import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-20 py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Get in Touch Card */}
          <div className="bg-[#0f172a] rounded-[32px] p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-10 text-white">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Phone</p>
                  <p className="text-sm text-white/60">+94 11 234 5678</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <p className="text-sm text-white/60">hello@beautyofcloud.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Location</p>
                  <p className="text-sm text-white/60">University of Sri Jayewardenepura, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send Us a Message Card */}
          <div className="bg-[#0f172a] rounded-[32px] p-12">
            <h2 className="text-3xl font-bold mb-10 text-white">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">Name</label>
                  <input type="text" placeholder="Your name" className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">Email</label>
                  <input type="email" placeholder="your.email@example.com" className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">Telephone</label>
                  <input type="text" placeholder="+94 XX XXX XXXX" className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">Subject</label>
                  <input type="text" placeholder="What is this regarding?" className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/60 ml-2">Message</label>
                <textarea rows={4} placeholder="Your message here..." className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-12 outline-none focus:border-blue-500/50 resize-none transition-colors" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3b82f6] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:brightness-110 flex items-center gap-3"
              >
                Send Message <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 text-center text-xs text-white/20 uppercase tracking-[0.4em] font-mono">
          &copy; 2026 Beauty of Cloud. Part of the Digital Multiverse.
        </div>
      </div>
    </footer>
  );
};
