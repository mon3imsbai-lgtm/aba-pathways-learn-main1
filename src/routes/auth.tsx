import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "",
  }),
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — AbaTools" },
      { name: "description", content: "سجّل الدخول إلى حسابك في منصة AbaTools لتحليل السلوك التطبيقي." },
      { property: "og:title", content: "تسجيل الدخول — AbaTools" },
      { property: "og:description", content: "الوصول إلى حسابك في منصة AbaTools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function safeNext(next: string) {
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const target = safeNext(next);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage(error.message);
      window.location.href = target;
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}${target}` },
    });
    setBusy(false);
    if (error) return setMessage(error.message);
    setMessage("تم إنشاء الحساب. تفقّد بريدك لتأكيد التسجيل ثم عد إلى هذه الصفحة.");
    void navigate;
  }

  return (
    <section className="gradient-hero">
      <div className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-md card-elevated p-8">
          <h1 className="text-2xl font-extrabold">
            {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-7">
            سجّل الدخول للمتابعة والموافقة على ربط التطبيقات بحسابك.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold" htmlFor="email">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-start"
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="password">كلمة المرور</label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-start"
              />
            </div>
            {message && <p role="alert" className="text-sm text-muted-foreground">{message}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-60"
            >
              {mode === "signin" ? "دخول" : "تسجيل"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-5 text-sm font-semibold text-primary"
          >
            {mode === "signin" ? "ليس لديك حساب؟ أنشئ حساباً" : "لديك حساب؟ سجّل الدخول"}
          </button>
        </div>
      </div>
    </section>
  );
}
