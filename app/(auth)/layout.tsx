import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Layers, Lock, ImageIcon, ShieldCheck } from "lucide-react";

const features = [
  { icon: Layers, text: "CRUD completo de productos" },
  { icon: ImageIcon, text: "Carga de imágenes en la nube" },
  { icon: Lock, text: "Rutas protegidas por usuario" },
  { icon: ShieldCheck, text: "Row-Level Security en BD" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — decorative (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--accent)_0%,_transparent_50%)] opacity-20" />
        <div className="absolute bottom-0 left-0 size-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          <Link href="/" className="text-lg font-bold tracking-tight text-primary-foreground">
            product<span className="text-accent-foreground/70">app</span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-foreground leading-tight max-w-xs">
              Gestiona tu catálogo de forma simple y segura
            </h2>
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <f.icon className="size-4 text-primary-foreground/80" />
                  </div>
                  <span className="text-sm text-primary-foreground/70">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-primary-foreground/30">&copy; 2026 productapp</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-foreground lg:invisible">
            product<span className="text-accent">app</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}