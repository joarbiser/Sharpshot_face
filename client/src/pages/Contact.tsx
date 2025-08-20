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
    <section className="pt-16 pb-16 bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-hero tungsten-style mb-3 text-foreground">Let's Talk</h1>
          <p className="text-subheading text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">Have a question, request, or idea? Hit us up.</p>
          
          {/* Tag Chip */}
          <div className="tag-chip mb-8">
            <div className="tag-chip-dot"></div>
            Support & Contact
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="surface-glass p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type" className="block text-sm font-semibold text-foreground mb-2">Affiliate / Creator?</Label>
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
                <Label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Community */}
            <div className="surface-glass p-8 text-center">
              <i className="fas fa-users text-4xl mb-4 text-[hsl(var(--sharp-gold))]"></i>
              <h3 className="text-xl font-bold mb-4 text-foreground">Join Our Community</h3>
              <p className="text-muted-foreground mb-6">Get instant support and connect with our community of sharp bettors.</p>
              <Button className="btn-primary">
                Join Community
              </Button>
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <i className="fas fa-envelope text-4xl text-gold mb-4"></i>
              <h3 className="text-xl font-bold mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">For general inquiries and support requests.</p>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">General Support:</span><br />
                  <a href="mailto:support@sharpshot.io" className="text-gold font-semibold hover:text-gold/80">
                    support@sharpshot.io
                  </a>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Business & Partnerships:</span><br />
                  <a href="mailto:partnerships@sharpshot.io" className="text-gold font-semibold hover:text-gold/80">
                    partnerships@sharpshot.io
                  </a>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Bug Reports:</span><br />
                  <a href="mailto:dev@sharpshot.io" className="text-gold font-semibold hover:text-gold/80">
                    dev@sharpshot.io
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex justify-center gap-4">
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
