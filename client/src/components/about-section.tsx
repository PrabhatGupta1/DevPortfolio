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
                I'm a Full Stack Developer with extensive experience in building scalable web applications
                and mobile solutions. My journey in software development has been driven by a constant desire to learn
                and implement cutting-edge technologies.
              </p>
              <p>
                With expertise spanning both backend and frontend development, I specialize in creating seamless user
                experiences backed by robust server-side architectures.
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
              src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-aa98-61f7-a9e1-a75eff2fd086/raw?se=2025-06-07T19%3A27%3A33Z&sp=r&sv=2024-08-04&sr=b&scid=8f2033f9-ac80-59fd-bf69-469e882756e1&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-07T01%3A00%3A22Z&ske=2025-06-08T01%3A00%3A22Z&sks=b&skv=2024-08-04&sig=cHAUEspj7aavHsgWEzNjbaw0xBUoYgJIy0J%2BQ%2Bfxv5M%3D"
              alt="Developer workspace with multiple monitors and code"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
