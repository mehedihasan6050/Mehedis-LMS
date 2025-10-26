import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
     

      <div className="relative z-10">
        {/* Customer Badge */}
        <div className="flex justify-center pt-8">
          <div className="border border-border rounded-full px-4 py-2 flex items-center gap-3 bg-background/50 backdrop-blur-sm">
            
            <span className="text-sm text-muted-foreground">1,254+ Active Learing Student</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center px-4 py-10">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center max-w-7xl leading-tight mb-6 text-foreground">
            Streamlined Communication for Iterating Fast
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground text-center max-w-2xl mb-12">
            Acme is an installable, self-hosted team chat system. You can have several paragraphs in here and the thing
            will wrap gracefully.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <Button
              variant="outline"
              className="hover:text-secondary-foreground text-base bg-transparent"
            >
             All Courses
            </Button>
            <Button>
              Get Started for Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
