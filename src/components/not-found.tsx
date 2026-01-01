import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoHome = () => {
    if (user) {
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <main className="bg-white w-full min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 max-w-[600px] text-center animate-fade-in delay-[0ms]">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-bold text-foreground text-9xl md:text-[150px] leading-none">
            404
          </h1>
          
          <div className="flex flex-col gap-2 animate-fade-in delay-[200ms]">
            <h2 className="font-semibold text-foreground text-3xl md:text-4xl">
              Page Not Found
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-md">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in delay-[400ms]">
          <Button
            onClick={handleGoHome}
            className="w-full sm:w-auto h-auto px-6 py-3.5 bg-primary rounded-[10px] text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to {user ? "Dashboard" : "Sign In"}
          </Button>
          
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto h-auto px-6 py-3.5 rounded-[10px] border border-solid border-neutral-100 text-sm font-semibold text-muted-foreground hover:bg-neutral-50 transition-colors"
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

