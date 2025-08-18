import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiRequest } from '@/lib/queryClient';

const supportFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120, 'Subject must be less than 120 characters'),
  category: z.string().min(1, 'Please select a category'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(3000, 'Message must be less than 3000 characters'),
  attachment: z.any().optional(),
  consent: z.boolean().refine(val => val === true, 'You must agree to be contacted about this request'),
  honeypot: z.string().max(0, 'Invalid submission')
});

type SupportFormData = z.infer<typeof supportFormSchema>;

const categories = [
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
      email: '',
      subject: '',
      category: '',
      message: '',
      consent: false,
      honeypot: ''
    }
  });

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
      formData.append('subject', data.subject);
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

      // Add client info
      const clientInfo = {
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localTime: new Date().toLocaleString()
      };
      formData.append('clientInfo', JSON.stringify(clientInfo));

      const response = await fetch('/api/support', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Request received. We'll email you at ${data.email} shortly.`);
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
      setSubmitMessage("We couldn't send that. Please try again in a moment or email support@sharpshotcalc.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#D8AC35]/20 dark:from-black dark:via-gray-900 dark:to-[#D8AC35]/10">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support</h1>
          <p className="text-lg text-muted-foreground">
            Resources and help, built to keep you sharp.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          {/* Helper Text */}
          <p className="text-sm text-muted-foreground mb-8">
            Describe the issue clearly. Steps to reproduce help us fix things faster.
          </p>

          {/* Status Messages */}
          {submitStatus && (
            <Alert className={`mb-6 ${submitStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}`}>
              <AlertDescription 
                className={submitStatus === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}
                role="alert"
                aria-live="polite"
              >
                {submitMessage}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email"
                        placeholder="you@example.com"
                        className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                        placeholder="Brief summary of your issue"
                        className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all">
                          <SelectValue placeholder="Select a category" />
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
                        placeholder="Tell us what happened, steps to reproduce, and what you expected."
                        rows={6}
                        className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attachment Field */}
              <FormItem>
                <FormLabel className="text-sm font-medium">Attachment (optional)</FormLabel>
                <FormControl>
                  <Input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="border border-border/60 bg-background hover:border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">Images and PDF only, up to 10 MB</p>
              </FormItem>

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
                  </FormItem>
                )}
              />
              <FormMessage>{form.formState.errors.consent?.message}</FormMessage>

              {/* Submit Button */}
              <div className="space-y-4">
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

                {/* Alternative Contact */}
                <p className="text-sm">
                  <a 
                    href="mailto:support@sharpshotcalc.com"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <span className="relative">
                      Email support@sharpshotcalc.com instead
                      <span className="absolute inset-x-0 -bottom-px h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </span>
                  </a>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}