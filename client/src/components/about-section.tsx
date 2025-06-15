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
                I'm your go-to Full Stack Developer with a passion for transforming ideas into powerful, real-world digital solutions. Whether you're a startup looking to launch your dream product or a business ready to elevate your online presence, I specialize in delivering scalable, high-performance applications that make an impact.
              </p>
              <p>
                With expertise spanning both backend and frontend development, I create sleek, responsive, and user-friendly interfaces, backed by robust server-side logic and well-architected RESTful APIs. I also excel at integrating third-party services and ensuring seamless functionality across platforms—including mobile.
              </p>
              <p>
                Beyond coding, I enjoy singing and music, which keeps me inspired and balanced. I thrive on collaboration, continuous learning, and building tech that truly matters.
              </p>
              <p>
                Let’s connect and build something extraordinary—your vision, brought to life with precision and innovation.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="/DevPortfolio/aboutMe.png"
              alt="Developer workspace with multiple monitors and code"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
