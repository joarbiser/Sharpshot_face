import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", type: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            SUPPORT.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Have a question, request, or idea? Hit us up.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-20">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.05em]" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
                SUPPORT & CONTACT
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get In Touch
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-7 max-w-[1280px] mx-auto">
              {/* Contact Form */}
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Affiliate / Creator?</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select one..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">No, general inquiry</SelectItem>
                        <SelectItem value="affiliate">Yes, I'm an affiliate</SelectItem>
                        <SelectItem value="creator">Yes, I'm a content creator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#D8AC35] hover:bg-[#D8AC35]/90 text-black font-semibold">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50/80 dark:bg-gray-900/80 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 px-8 py-7 transition-shadow duration-200 hover:shadow-md hover:border-gray-300/60 dark:hover:border-gray-600/60">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Other ways to reach us</h3>
                
                <div className="space-y-6">
                  {/* Email Support */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#D8AC35]/10 flex items-center justify-center">
                        <i className="fas fa-envelope text-[#D8AC35]"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Email Support</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">For general inquiries and support requests.</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">General Support:</span><br />
                        <a href="mailto:support@sharpshotcalc.com" className="text-[#D8AC35] font-semibold hover:text-[#D8AC35]/80">
                          support@sharpshotcalc.com
                        </a>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Business & Partnerships:</span><br />
                        <a href="mailto:partnerships@sharpshotcalc.com" className="text-[#D8AC35] font-semibold hover:text-[#D8AC35]/80">
                          partnerships@sharpshotcalc.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Community */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#D8AC35]/10 flex items-center justify-center">
                        <i className="fas fa-users text-[#D8AC35]"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Join Our Community</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Get instant support and connect with our community of sharp bettors.</p>
                    <Button className="w-full bg-[#D8AC35] hover:bg-[#D8AC35]/90 text-black font-semibold">
                      Join Community
                    </Button>
                  </div>

                  {/* Social */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#D8AC35]/10 flex items-center justify-center">
                        <i className="fas fa-share-alt text-[#D8AC35]"></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Follow Us</h4>
                    </div>
                    <div className="flex gap-3">
                      <a href="https://x.com/sharpshotcalc" className="w-10 h-10 bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-[#D8AC35]/20 hover:text-[#D8AC35] transition-colors">
                        <i className="fab fa-x-twitter"></i>
                      </a>
                      <a href="https://instagram.com/sharpshotcalc" className="w-10 h-10 bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-[#D8AC35]/20 hover:text-[#D8AC35] transition-colors">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}