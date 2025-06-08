// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  contacts;
  currentId;
  constructor() {
    this.contacts = /* @__PURE__ */ new Map();
    this.currentId = 1;
  }
  async createContact(insertContact) {
    const id = this.currentId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// server/routes.ts
import { z as z2 } from "zod";

// server/email.ts
import { MailService } from "@sendgrid/mail";
var apiKey = process.env.SENDGRID_API_KEY || "SG.mySendgridKey";
if (!apiKey) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}
var mailService = new MailService();
mailService.setApiKey(apiKey);
async function sendEmail(params) {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || "",
      html: params.html || ""
    });
    return true;
  } catch (error) {
    console.error("SendGrid email error:", error);
    return false;
  }
}
function createContactEmailTemplate(name, email, subject, message) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; color: #555;">${message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
        <p>This message was sent from your portfolio website contact form.</p>
        <p>Reply directly to this email to respond to ${name}.</p>
      </div>
    </div>
  `;
  const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio website contact form.
Reply directly to this email to respond to ${name}.
  `;
  return {
    html: htmlContent,
    text: textContent
  };
}

// server/routes.ts
import { fileURLToPath } from "url";
import { dirname, join } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      const emailTemplate = createContactEmailTemplate(
        validatedData.name,
        validatedData.email,
        validatedData.subject,
        validatedData.message
      );
      const emailSent = await sendEmail({
        to: "prabhatgupta428@gmail.com",
        // Replace with your actual email
        from: "noreply@yourportfolio.com",
        // Use a verified sender email
        subject: `Portfolio Contact: ${validatedData.subject}`,
        text: emailTemplate.text,
        html: emailTemplate.html
      });
      if (emailSent) {
        console.log("Email sent successfully for contact:", contact.id);
        res.json({
          success: true,
          message: "Message sent successfully! I'll get back to you soon."
        });
      } else {
        console.log("Email failed, using mailto fallback for contact:", contact.id);
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
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json(contacts2);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.get("/api/resume", (req, res) => {
    const filePath = join(__dirname, "../server/public/resume.pdf");
    res.setHeader("Cache-Control", "no-cache");
    res.download(filePath, "PrabhatGuptaResume.pdf", (err) => {
      if (err) {
        console.error("Error sending resume:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  base: "/DevPortfolio/",
  // Replace with your actual repo name
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.static("public"));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port
  }, () => {
    log(`serving on port ${port}`);
  });
})();
