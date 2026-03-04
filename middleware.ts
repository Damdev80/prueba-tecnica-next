import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/auth/login", "/auth/register"]
export async function middleware(req: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request: req,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },

                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value, }) => {
                        req.cookies.set(name, value)
                    });
                    supabaseResponse = NextResponse.next({
                        request: req,
                    });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = req.nextUrl;

    if (!user && !publicRoutes.includes(pathname)) {
        const loginUrl = new URL("/auth/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (user && publicRoutes.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
    }


    return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     * - archivos públicos (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};