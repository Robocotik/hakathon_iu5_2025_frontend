import { Planet } from "../components/Planet";
import { FormLayout } from "@/components/GlassContainer/GlassContainer.usecase"; // Убедитесь, что путь правильный

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Main content area */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] relative">
        {/* Background cosmic elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black"></div>

        {/* Planet component */}
        <div className="relative z-10">
          <Planet size={250} className="drop-shadow-2xl" />
        </div>

        {/* Floating stars/particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Ваши контейнеры внизу */}
      <FormLayout />
    </main>
  );
}
