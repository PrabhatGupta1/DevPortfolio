import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/lib/animations";

export function ProjectsSection() {
  const ref = useScrollAnimation();

  const projects = [
    {
      title: "Social Networking Platform",
      description: "A dynamic social networking platform empowering users to connect, collaborate, and share their passions. Seamlessly integrates user profiles and connections with the ability to create and share posts.",
      image: "/DevPortfolio/tribesphere.png",
      tech: ["Node.js", "PostgreSQL", "Express", "React", "EJS"],
      github: "https://github.com/PrabhatGupta1/tribesphereApp",
      demo: "#",
    },
    {
      title: "Online Learning Platform",
      description: "Comprehensive e-learning platform with course management, where instructors can create and sell courses, students can enroll and learn from them.",
      image: "/DevPortfolio/onlineLearningPlatform.png",
      tech: ["Asp.Net Core", "C#", "Entity Framwork", "SQL Server"],
      github: "https://github.com/PrabhatGupta1/OnlineLearningPlatform",
      demo: "#",
    },
    {
      title: "Job Search Mobile App",
      description: "Cross-platform Job Search mobile application with seamless user experience. Job seekers can search and apply for real time available jobs according to their profiles.",
      image: "/DevPortfolio/jobSearchMobileApp.png",
      tech: ["React Native", "Expo", "External APIs"],
      github: "https://github.com/PrabhatGupta1/JobSearchApp",
      demo: "#",
    },
    {
      title: "Task Management Web App",
      description: "This is a user-friendly task management platform designed to enhance productivity built using HTML 5, CSS 3, Javascript, Bootstrap, Node.js, Express.js, EJS templating and PostgreSQL.",
      image: "/DevPortfolio/taskMngWebApp.png",
      tech: ["Node.js", "Express", "PostgreSQL", "EJS", "Javascript"],
      github: "https://github.com/PrabhatGupta1/taskManagementWebApp",
      demo: "#",
    },
    {
      title: "Online Quiz Website",
      description: "This is an online quiz website which provides quizes on various technologies and subjects built using HTML5, CSS3, Bootstrap and Javascript.",
      image: "/DevPortfolio/onlinequiz.png",
      tech: ["Javascript", "HTML 5", "CSS 3"],
      github: "https://github.com/PrabhatGupta1/onlinequiz",
      demo: "https://prabhatgupta1.github.io/onlinequiz/",
    },
    // {
    //   title: "Analytics Dashboard",
    //   description: "Real-time analytics dashboard with interactive charts, data visualization, and automated reporting features.",
    //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
    //   tech: ["React", "D3.js", "Node.js", "MongoDB"],
    //   github: "https://github.com/PrabhatGupta1/onlinequiz",
    //   demo: "https://prabhatgupta1.github.io/onlinequiz/",
    // },
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
                    <a target="_blanck" href={project.github}>
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a target="_blanck" href={project.demo}>
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
