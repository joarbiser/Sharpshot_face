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
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl tungsten-style mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600">Have questions? We're here to help.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">Affiliate / Creator?</Label>
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
                <Label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-gold text-white hover:bg-gold/90">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Discord */}
            <div className="bg-charcoal text-white rounded-xl p-8 text-center">
              <i className="fab fa-discord text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Join Our Discord</h3>
              <p className="text-gray-300 mb-6">Get instant support and connect with our community of sharp bettors.</p>
              <Button className="bg-gold text-white hover:bg-gold/90">
                Join Server
              </Button>
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <i className="fas fa-envelope text-4xl text-gold mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">For general inquiries and support requests.</p>
              <a href="mailto:hello@sharpshot.io" className="text-gold font-semibold hover:text-gold/80">
                hello@sharpshot.io
              </a>
            </div>

            {/* Social */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-12 h-12 bg-charcoal text-white rounded-lg flex items-center justify-center hover:bg-charcoal/80 transition-colors">
                  <i className="fab fa-discord"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-charcoal text-white rounded-lg flex items-center justify-center hover:bg-charcoal/80 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
