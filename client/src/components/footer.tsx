import { Github, Linkedin, Instagram, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
            <div className="flex justify-center space-x-6">
              <a
                target="_blanck"
                href="https://github.com/PrabhatGupta1"
                className="text-slate-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                target="_blanck"
                href="https://www.linkedin.com/in/prabhatgupta012/"
                className="text-slate-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                target="_blanck"
                href="https://instagram.com/prabhatgupta_101"
                className="text-slate-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                target="_blanck"
                href="https://x.com/Prabhat_Gupta__"
                className="text-slate-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                target="_blanck"
                href="mailto:prabhatgupta428@gmail.com"
                className="text-slate-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400">
              © 2025 Prabhat Gupta. Built with ❤️.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
