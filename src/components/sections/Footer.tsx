import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    telephone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      telephone: "",
      subject: "",
      message: "",
    };

    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+94|0)[0-9]{9}$/;
    const subjectRegex = /^.{3,100}$/;
    const messageRegex = /^.{10,500}$/;

    let isValid = true;

    if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters and be 3-50 characters";
      isValid = false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!phoneRegex.test(formData.telephone.trim())) {
      newErrors.telephone = "Please enter a valid Sri Lankan phone number";
      isValid = false;
    }

    if (!subjectRegex.test(formData.subject.trim())) {
      newErrors.subject = "Subject must be between 3 and 100 characters";
      isValid = false;
    }

    if (!messageRegex.test(formData.message.trim())) {
      newErrors.message = "Message must be between 10 and 500 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {


     e.preventDefault();

     setSuccessMessage("");

     if (!validateForm()) return;

    try {
      setLoading(true);
      setSuccessMessage(" ");
         if (!db) {
      throw new Error("Firebase is not initialized");
    }

      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        telephone: "",
        subject: "",
        message: "",
      });

      setErrors({
        name: "",
        email: "",
        telephone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setSuccessMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="relative z-20 py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Get in Touch Card */}
          <div className="bg-[#0f172a] rounded-[32px] p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-10 text-white">
              Get in Touch
            </h2>

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
                  <p className="text-sm text-white/60">
                    hello@beautyofcloud.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Location</p>
                  <p className="text-sm text-white/60">
                    University of Sri Jayewardenepura, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Send Us a Message Card */}
          <div className="bg-[#0f172a] rounded-[32px] md:p-12 p-8">
            <h2 className="text-3xl font-bold mb-10 text-white">
              Send Us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors text-white"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs ml-2">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors text-white"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs ml-2">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">
                    Telephone
                  </label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+94 XX XXX XXXX"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors text-white"
                  />
                  {errors.telephone && (
                    <p className="text-red-400 text-xs ml-2">
                      {errors.telephone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/60 ml-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-blue-500/50 transition-colors text-white"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs ml-2">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/60 ml-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-6 outline-none focus:border-blue-500/50 resize-none transition-colors text-white"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs ml-2">{errors.message}</p>
                )}
              </div>

              {successMessage && (
                <p
                  className={`text-sm ${
                    successMessage.includes("successfully")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {successMessage}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3b82f6] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:brightness-110 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
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
