import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ShieldCheck,
  ImageIcon,
  Zap,
  ArrowRight,
  Database,
  Layers,
  Lock,
  BarChart3,
  Search,
} from "lucide-react";
import { FadeIn, SlideIn, ScaleIn } from "@/components/motion/Animations";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-50 border-b border-border/50">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          product<span className="text-accent">app</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Entrar</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register">Crear cuenta</Link>
          </Button>
        </div>
      </nav>

      {/* Hero — asymmetric split */}
      <section className="relative px-6 py-20 md:py-28">
        {/* Decorative bg shapes */}
        <div className="absolute top-20 right-[10%] size-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-[5%] size-48 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left — text (3 cols) */}
          <div className="md:col-span-3 relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-xs font-medium text-accent mb-6">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                Administra tu catálogo
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5">
                Gestiona tus
                <br />
                <span className="text-accent">productos fácil.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base md:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                Registra productos con nombre, precio, descripción e imagen.
                Todo organizado en un panel seguro con autenticación
                y datos en tiempo real.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="group" asChild>
                  <Link href="/auth/register">
                    Comenzar gratis
                    <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/login">Ya tengo cuenta</Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right — bento preview (2 cols) */}
          <div className="md:col-span-2 relative z-10">
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-8 rounded-lg bg-accent/15 flex items-center justify-center">
                      <Layers className="size-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Registros</p>
                      <p className="text-xl font-bold text-foreground">142</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {[65, 40, 80, 55, 70, 45, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-accent/20"
                        style={{ height: `${h * 0.5}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border bg-card p-4 shadow-sm">
                  <div className="size-7 rounded-md bg-accent/15 flex items-center justify-center mb-2">
                    <ImageIcon className="size-3.5 text-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground">Imágenes</p>
                  <p className="text-lg font-bold text-foreground">Cloud</p>
                </div>
                <div className="rounded-2xl border bg-card p-4 shadow-sm">
                  <div className="size-7 rounded-md bg-accent/15 flex items-center justify-center mb-2">
                    <Lock className="size-3.5 text-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground">Acceso</p>
                  <p className="text-lg font-bold text-foreground">Seguro</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Features — bento grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              Funcionalidades
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 max-w-sm">
              Todo lo que necesitas para tu inventario.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Large card */}
            <SlideIn direction="left" className="md:col-span-4">
              <div className="h-full rounded-2xl border bg-card p-7 flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                    <Database className="size-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    CRUD completo
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                    Agrega, consulta, edita y elimina productos desde tu panel.
                    Cada producto tiene nombre, precio, descripción e imagen.
                    Todo se guarda en la nube de forma segura.
                  </p>
                </div>
                <div className="flex gap-2 mt-6">
                  {["Crear", "Leer", "Editar", "Eliminar"].map((action) => (
                    <span
                      key={action}
                      className="text-xs px-2.5 py-1 rounded-md bg-secondary text-muted-foreground font-medium"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </SlideIn>

            {/* Right column — stacked */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <ScaleIn delay={0.05}>
                <div className="rounded-2xl border bg-card p-6">
                  <ShieldCheck className="size-5 text-accent mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    Login y registro
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Autenticación con email y contraseña. Cada usuario accede solo a sus propios datos.
                  </p>
                </div>
              </ScaleIn>
              <ScaleIn delay={0.1}>
                <div className="rounded-2xl border bg-card p-6">
                  <ImageIcon className="size-5 text-accent mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    Carga de imágenes
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Sube fotos a cada producto. Se almacenan en Supabase Storage y se optimizan automáticamente.
                  </p>
                </div>
              </ScaleIn>
              <ScaleIn delay={0.15}>
                <div className="rounded-2xl border bg-card p-6">
                  <Zap className="size-5 text-accent mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    Rutas protegidas
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Middleware protege el dashboard. Si no estás autenticado, se redirige al login.
                  </p>
                </div>
              </ScaleIn>
            </div>
          </div>
        </div>
      </section>

      {/* Extra features row */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="size-10 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="size-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Dashboard con métricas</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Visualiza estadísticas de tu inventario, precios promedio y gráficas de tus productos.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="size-10 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-3">
                  <Search className="size-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Consultas optimizadas</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Las queries a Supabase están indexadas y filtradas por usuario para máximo rendimiento.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="size-10 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-3">
                  <Lock className="size-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Row-Level Security</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  RLS en Supabase asegura que nadie acceda a datos que no le pertenecen, ni por API directa.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stack */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-8 text-center">
              Stack tecnológico
            </p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              "Next.js 16",
              "TypeScript",
              "Supabase",
              "Tailwind CSS",
              "shadcn/ui",
              "Zod",
            ].map((tech, i) => (
              <FadeIn key={tech} delay={i * 0.05}>
                <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition cursor-default">
                  {tech}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <FadeIn>
          <div className="max-w-6xl mx-auto relative rounded-2xl border bg-card overflow-hidden p-10 md:p-14">
            <div className="absolute top-0 right-0 size-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Empieza a gestionar
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Crea tu cuenta y comienza a agregar productos en segundos.
              </p>
              <Button size="lg" className="group" asChild>
                <Link href="/auth/register">
                  Crear cuenta
                  <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-muted-foreground text-xs border-t border-border/50">
        &copy; 2026 productapp
      </footer>
    </div>
  );
}