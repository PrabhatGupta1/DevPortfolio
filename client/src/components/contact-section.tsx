import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Github, Linkedin, Instagram, Send, Twitter } from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useScrollAnimation } from "@/lib/animations";

export function ContactSection() {
  const ref = useScrollAnimation();
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      // const response = await apiRequest("POST", "/api/contact", data);
      // return response.json();
        // Return mailto fallback if email fails
        const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${data.subject}`);
        const mailtoBody = encodeURIComponent(`From: ${data.name} (${data.email})

Subject: ${data.subject}

Message:
${data.message}

---
This message was submitted through your portfolio contact form.`);
        
        return ({ 
          success: true, 
          fallbackMode: true,
          mailto: `mailto:prabhatgupta428@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
          message: "Please click the link below to send your message via email." 
        });
    },
    onSuccess: (data) => {
      if (data.fallbackMode && data.mailto) {
        // Open mailto link in fallback mode
        window.open(data.mailto, '_blank');
        toast({
          title: "Email client opened",
          description: "Please send the message from your email application.",
        });
      } else {
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you soon.",
        });
      }
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={ref as any}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or collaboration opportunity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in new opportunities, whether it's a freelance project,
                full-time position, or just a chat about technology and development.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">prabhatgupta428@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">GitHub</h4>
                  <p className="text-muted-foreground">@PrabhatGupta1</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">LinkedIn</h4>
                  <p className="text-muted-foreground">@prabhatgupta012</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Instagram</h4>
                  <p className="text-muted-foreground">@prabhatgupta_101</p>
                </div>
              </div>     

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Twitter</h4>
                  <p className="text-muted-foreground">@Prabhat_Gupta__</p>
                </div>
              </div>     
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Discussion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Tell me about your project..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
