import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { useScrollAnimation } from "@/lib/animations";

export function BlogSection() {
  const ref = useScrollAnimation();

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={ref as any}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on web development and technology
          </p>
        </div>

        <div className="text-center">
          <div className="bg-card rounded-xl shadow-lg p-12 max-w-2xl mx-auto border">
            <div className="mb-6">
              <Edit3 className="w-16 h-16 text-primary mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              I'm working on creating valuable content about web development, best practices,
              and tutorials. Stay tuned for insightful articles and technical guides!
            </p>
            {/* <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Notify Me
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
