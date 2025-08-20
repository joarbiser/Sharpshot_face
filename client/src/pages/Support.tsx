import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Tag, Paperclip, BookOpen, HelpCircle, Layers, DollarSign, CreditCard, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const supportFormSchema = z.object({
  memberStatus: z.string().min(1, 'Please select your status'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120, 'Subject must be less than 120 characters'),
  category: z.string().min(1, 'Please select a category'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(3000, 'Message must be less than 3000 characters'),
  attachment: z.any().optional(),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted about this request'),
  honeypot: z.string().max(0, 'Invalid submission')
});

type SupportFormData = z.infer<typeof supportFormSchema>;

const memberStatusOptions = [
  { value: 'current-member', label: 'a Current Member' },
  { value: 'evaluating', label: 'Evaluating Sharp Shot' }
];

const categories = [
  'Pre-sales / Memberships',
  'General Question',
  'Billing',
  'Technical Issue', 
  'Bug Report',
  'Feature Request',
  'Account / Access',
  'Affiliate / Rep Program',
  'Other'
];

export default function Support() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      memberStatus: '',
      email: '',
      subject: '',
      category: '',
      message: '',
      consent: false,
      honeypot: ''
    }
  });

  const watchedMemberStatus = form.watch('memberStatus');

  // Auto-set category to Pre-sales if evaluating
  useEffect(() => {
    if (watchedMemberStatus === 'evaluating' && !form.getValues('category')) {
      form.setValue('category', 'Pre-sales / Memberships');
    }
  }, [watchedMemberStatus, form]);

  const onSubmit = async (data: SupportFormData) => {
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      setSubmitStatus('error');
      setSubmitMessage('Please wait a moment before sending another request.');
      return;
    }

    // Honeypot check
    if (data.honeypot) {
      return; // Silent rejection for spam
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const formData = new FormData();
      formData.append('email', data.email);
      
      // Add subject prefix based on member status
      const subjectPrefix = data.memberStatus === 'current-member' ? '[Support]' : '[Pre-sales]';
      formData.append('subject', `${subjectPrefix} ${data.subject}`);
      
      formData.append('category', data.category);
      formData.append('message', data.message);
      formData.append('consent', data.consent.toString());
      
      // Handle file attachment
      const fileInput = fileInputRef.current;
      if (fileInput?.files?.[0]) {
        const file = fileInput.files[0];
        
        // Validate file
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!allowedTypes.includes(file.type)) {
          setSubmitStatus('error');
          setSubmitMessage('Please upload only images (JPEG, PNG, GIF, WebP) or PDF files.');
          setIsSubmitting(false);
          return;
        }
        
        if (file.size > maxSize) {
          setSubmitStatus('error');
          setSubmitMessage('File size must be less than 10MB.');
          setIsSubmitting(false);
          return;
        }
        
        formData.append('attachment', file);
      }
      
      // Add client info for debugging
      formData.append('clientInfo', JSON.stringify({
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localTime: new Date().toLocaleString()
      }));
      
      // Add honeypot field
      formData.append('honeypot', data.honeypot);

      const response = await fetch('/api/support', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Thanks — your request is in. We'll follow up at ${data.email}. In the meantime, you can check Tutorials or FAQ.`);
        setLastSubmitTime(now);
        form.reset();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage("We couldn't send that. Please try again, or email support@sharpshotcalc.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            SUPPORT.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Get answers or contact us, whether you're exploring Sharp Shot or are already using it.
          </p>
        </div>

        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8AC35]/10 border border-[#D8AC35]/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
            <span className="text-sm font-semibold text-[#D8AC35] uppercase tracking-[0.2em]">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "'Saira Condensed', sans-serif", fontStyle: 'italic', transform: 'skew(-5deg)' }}>
            Get Help When You Need It
          </h2>
          <p className="text-xs text-muted-foreground">
            Typical response time: within one business day.
          </p>
        </div>

        {/* Contact Options Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-[1280px] mx-auto">
          {/* Contact Form Card */}
          <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Direct Support</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Contact Form</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Get personalized help with your questions</p>
            </div>
            
            <div className="space-y-3 mt-4 mb-6 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Detailed response to your specific issue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Attach screenshots or files</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Best for technical issues</span>
              </div>
            </div>
          </div>

          {/* Direct Email Card */}
          <div className="group bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 px-10 py-8 h-full flex flex-col transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:border-gray-300/60 dark:hover:border-gray-600/60">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-[0.2em]">Direct Email</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Reach out directly via email</p>
            </div>
            
            <div className="space-y-3 mt-4 mb-6 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">support@sharpshotcalc.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Same response time guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-[#D8AC35]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#D8AC35]"></div>
                </div>
                <span className="text-gray-900 dark:text-white text-sm leading-relaxed">Use your preferred email client</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
            <div className="relative bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-10 md:p-14">
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                  Send Us a Message
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">We'll get back to you within one business day</p>
              </div>

            {/* Status Messages */}
            {submitStatus && (
              <Alert className={`mb-6 ${submitStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}`}>
                <AlertDescription 
                  className={submitStatus === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}
                  role="alert"
                  aria-live="polite"
                >
                  {submitStatus === 'success' && (
                    <>
                      {submitMessage.split('. In the meantime, you can check ')[0]}. In the meantime, you can check{' '}
                      <Link href="/tutorials" className="underline hover:no-underline">Tutorials</Link>{' '}
                      or{' '}
                      <Link href="/faq" className="underline hover:no-underline">FAQ</Link>.
                    </>
                  )}
                  {submitStatus === 'error' && submitMessage}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot Field */}
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <div className="hidden">
                      <Input {...field} tabIndex={-1} autoComplete="off" />
                    </div>
                  )}
                />

                {/* Block 1: Member Status, Email, Subject */}
                <div className="space-y-4 pb-6 border-b border-border/20">
                  {/* Member Status Field */}
                  <FormField
                    control={form.control}
                    name="memberStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          I'm… *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground">
                              <SelectValue placeholder="Select your status" className="text-muted-foreground" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {memberStatusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="you@example.com"
                            className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject Field */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Subject *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="One line that sums it up"
                            className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Block 2: Category, Message, Attachment */}
                <div className="space-y-4">
                  {/* Category Field */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          Category *
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground">
                              <SelectValue placeholder="Select a category" className="text-muted-foreground" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Tell us what's going on. If it's a bug, include what you were trying to do, what happened, and steps to reproduce. If it's a question (about memberships, billing, or features), just ask here. Screenshots help."
                            rows={6}
                            className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Attachment Field */}
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      Attachment (optional)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Images or PDF, up to 10 MB. Do not include account numbers or personal IDs.</p>
                  </FormItem>
                </div>

                {/* Consent Checkbox */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          I agree to be contacted about this request. *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-6 py-3 text-sm border border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 font-medium uppercase tracking-wide">
                      {isSubmitting ? 'Sending…' : 'Submit Request'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"></div>
                  </button>
                </div>
              </form>
            </Form>

            {/* Footer CTA */}
            <div className="text-center mt-8 pt-6 border-t border-border/20">
              <p className="text-sm text-muted-foreground mb-6">
                Looking for plan details?{' '}
                <Link href="/pricing" className="text-primary hover:underline transition-colors">
                  Compare memberships
                </Link>
              </p>

              {/* Quick Links - Centered under footer CTA */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Quick Links</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="/tutorials#top" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <BookOpen className="h-4 w-4" />
                    <span className="relative">
                      Tutorials
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                  <a href="/faq#top" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <HelpCircle className="h-4 w-4" />
                    <span className="relative">
                      FAQ
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                  <a href="/glossary#top" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <Layers className="h-4 w-4" />
                    <span className="relative">
                      Glossary
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                  <a href="mailto:support@sharpshotcalc.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <ExternalLink className="h-4 w-4" />
                    <span className="relative">
                      Email Support
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Philosophy Statement */}
        <div className="relative mt-20 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D8AC35]/10 via-[#D8AC35]/5 to-[#D8AC35]/10 rounded-2xl"></div>
          <div className="relative p-8 md:p-12 rounded-2xl border border-[#D8AC35]/20">
            <div className="text-center mb-6">
              <div className="w-4 h-4 rounded-full bg-[#D8AC35] mx-auto mb-4 animate-pulse"></div>
              <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                "Good support isn't just about solving problems — it's about 
                <span className="text-[#D8AC35]"> empowering you to win</span>."
              </blockquote>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D8AC35]"></div>
              <span className="text-xs text-[#D8AC35] font-semibold uppercase tracking-[0.2em]">Sharp Shot Promise</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D8AC35]"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}