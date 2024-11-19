import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-sky-500">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth V5
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
