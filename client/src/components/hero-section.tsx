import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Download, Code, Mail, Twitter } from "lucide-react";
import { useScrollAnimation } from "@/lib/animations";

export function HeroSection() {
  const ref = useScrollAnimation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/api/resume"; // Your backend route
    link.download = "PrabhatGuptaResume.pdf"; // Optional: Suggests a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={ref as any}
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQEj-xNu5XJ0Dw/profile-displayphoto-shrink_200_200/B56ZQBP5tpG4Ac-/0/1735187734660?e=1754524800&v=beta&t=-U5m5ezVAqpZCyENY7na6J8ZrddeP9ww8jwI87Z7gaM"
              alt="Professional developer portrait"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover shadow-2xl ring-4 ring-primary/20 animate-float"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Full Stack Developer
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Building modern web applications with{" "}
            <span className="text-primary font-semibold">Node.js</span>,{" "}
            <span className="text-blue-600 font-semibold">React</span>, and{" "}
            <span className="text-emerald-600 font-semibold">Next.js</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("#projects")}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Code className="w-5 h-5 mr-2" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleResumeDownload}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              target="_blanck"
              href="https://github.com/PrabhatGupta1"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              target="_blanck"
              href="https://www.linkedin.com/in/prabhatgupta012/"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              target="_blanck"
              href="https://instagram.com/prabhatgupta_101"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              target="_blanck"
              href="https://x.com/Prabhat_Gupta__"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
