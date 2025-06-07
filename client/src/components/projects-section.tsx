import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/lib/animations";

export function ProjectsSection() {
  const ref = useScrollAnimation();

  const projects = [
    {
      title: "Social Media Platform",
      description: "A full-featured social platform with real-time messaging, post sharing, and user interactions built with modern technologies.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      tech: ["React", "Node.js", "PostgreSQL", "Express"],
      github: "#",
      demo: "#",
    },
    {
      title: "Online Learning Platform",
      description: "Comprehensive e-learning platform with course management, video streaming, and progress tracking capabilities.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      tech: ["Next.js", "Prisma", "Firebase", "Tailwind"],
      github: "#",
      demo: "#",
    },
    {
      title: "React Native App",
      description: "Cross-platform mobile application with seamless user experience, offline capabilities, and cloud sync.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      tech: ["React Native", "Expo", "Firebase", "Node.js"],
      github: "#",
      demo: "#",
    },
    {
      title: "OTP Authentication System",
      description: "Secure multi-factor authentication system with SMS/Email OTP, session management, and rate limiting.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      tech: ["Node.js", "Express", "Redis", "JWT"],
      github: "#",
      demo: "#",
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured e-commerce solution with payment integration, inventory management, and analytics dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      tech: ["Next.js", "GraphQL", "PostgreSQL", "Stripe"],
      github: "#",
      demo: "#",
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive charts, data visualization, and automated reporting features.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      tech: ["React", "D3.js", "Node.js", "MongoDB"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={ref as any}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-image w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github}>
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demo}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
