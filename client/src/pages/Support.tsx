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
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl tungsten-style text-gray-900 dark:text-white mb-8">Support</h1>
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Get answers or contact us, whether you're exploring Sharp Shot or are already using it.
          </p>
        </div>

        {/* Helper Band */}
        <div className="mb-6 text-center">
          <p className="text-xs text-muted-foreground">
            Typical response time: within one business day.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main Form - Centered */}
          <div>

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
                        className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
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
    </div>
  );
}