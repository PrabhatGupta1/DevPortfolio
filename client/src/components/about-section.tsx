import { useScrollAnimation } from "@/lib/animations";

export function AboutSection() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1" ref={ref as any}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I'm a passionate Full Stack Developer with extensive experience in building scalable web applications
                and mobile solutions. My journey in software development has been driven by a constant desire to learn
                and implement cutting-edge technologies.
              </p>
              <p>
                With expertise spanning both backend and frontend development, I specialize in creating seamless user
                experiences backed by robust server-side architectures. From social media platforms to e-learning
                solutions, I've delivered diverse projects that solve real-world problems.
              </p>
              <p>
                Beyond coding, I'm passionate about music and singing, which helps me maintain creativity and
                balance in my work. I believe in continuous learning and staying updated with the latest
                industry trends and best practices.
              </p>
              <p>
                I'm always excited to collaborate on innovative projects and connect with fellow developers
                and creators who share similar passions for technology and creative expression.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Developer workspace with multiple monitors and code"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
