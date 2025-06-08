import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendEmail, createContactEmailTemplate } from "./email";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification
      const emailTemplate = createContactEmailTemplate(
        validatedData.name,
        validatedData.email,
        validatedData.subject,
        validatedData.message
      );
      
      const emailSent = await sendEmail({
        to: "prabhatgupta428@gmail.com", // Replace with your actual email
        from: "noreply@yourportfolio.com", // Use a verified sender email
        subject: `Portfolio Contact: ${validatedData.subject}`,
        text: emailTemplate.text,
        html: emailTemplate.html,
      });
      
      if (emailSent) {
        console.log("Email sent successfully for contact:", contact.id);
        res.json({ 
          success: true, 
          message: "Message sent successfully! I'll get back to you soon." 
        });
      } else {
        console.log("Email failed, using mailto fallback for contact:", contact.id);
        // Return mailto fallback if email fails
        const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${validatedData.subject}`);
        const mailtoBody = encodeURIComponent(`From: ${validatedData.name} (${validatedData.email})

Subject: ${validatedData.subject}

Message:
${validatedData.message}

---
This message was submitted through your portfolio contact form.`);
        
        res.json({ 
          success: true, 
          fallbackMode: true,
          mailto: `mailto:prabhatgupta428@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`,
          message: "Please click the link below to send your message via email." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    const filePath = join(__dirname, "../server/public/resume.pdf");

    // Prevent caching
    res.setHeader("Cache-Control", "no-cache");

    // Trigger file download
    res.download(filePath, "PrabhatGuptaResume.pdf", (err) => {
      if (err) {
        console.error("Error sending resume:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
