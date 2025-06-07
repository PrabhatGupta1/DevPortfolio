import { Server, Monitor, Box, Zap, Database, Layers, Share2, Cloud, Atom, Triangle, Smartphone, Wind, Flame, Settings, Code2, Hash, Braces, FileText, Binary, GitBranch } from "lucide-react";
import { useScrollAnimation } from "@/lib/animations";

export function SkillsSection() {
  const ref = useScrollAnimation();

  const backendSkills = [
    { name: "Node.js", icon: Box, color: "text-green-600" },
    { name: "Express.js", icon: Zap, color: "text-gray-600" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
    { name: "Prisma", icon: Layers, color: "text-indigo-600" },
    { name: "GraphQL", icon: Share2, color: "text-purple-600" },
    { name: "GCP", icon: Cloud, color: "text-orange-600" },
  ];

  const frontendSkills = [
    { name: "React", icon: Atom, color: "text-cyan-600" },
    { name: "Next.js", icon: Triangle, color: "text-black dark:text-white" },
    { name: "React Native", icon: Smartphone, color: "text-blue-600" },
    { name: "Tailwind CSS", icon: Wind, color: "text-teal-600" },
    { name: "Firebase", icon: Flame, color: "text-yellow-600" },
    { name: "Expo", icon: Settings, color: "text-gray-600" },
  ];

  const programmingSkills = [
    { name: "Core Java", icon: FileText, color: "text-red-600" },
    { name: "C#", icon: Hash, color: "text-purple-600" },
    { name: "JavaScript", icon: Braces, color: "text-yellow-600" },
    { name: "OOPs", icon: Code2, color: "text-blue-600" },
    { name: "Data Structures", icon: Binary, color: "text-green-600" },
    { name: "Algorithms", icon: GitBranch, color: "text-indigo-600" },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={ref as any}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expertise across the full stack with modern technologies and best practices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Backend Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Server className="w-6 h-6 mr-3 text-primary" />
              Backend Development
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {backendSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-3">
                      <skill.icon className={`w-6 h-6 ${skill.color}`} />
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Monitor className="w-6 h-6 mr-3 text-blue-600" />
              Frontend Development
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {frontendSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-3">
                      <skill.icon className={`w-6 h-6 ${skill.color}`} />
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programming & Problem Solving Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Code2 className="w-6 h-6 mr-3 text-emerald-600" />
              Programming & Problem Solving
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {programmingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-3">
                      <skill.icon className={`w-6 h-6 ${skill.color}`} />
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
