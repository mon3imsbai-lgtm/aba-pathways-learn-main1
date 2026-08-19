import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { Section } from "../components/section";
import { submitContactMessage } from "@/lib/db/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — AbaTools" },
      { name: "description", content: "أرسل استفسارك حول الدورات أو الخدمات أو المنتجات الرقمية." },
      { property: "og:title", content: "تواصل معنا — AbaTools" },
      { property: "og:description", content: "ابدأ بخطوة واضحة معنا." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const request_type = formData.get("request_type") as string;
    const message = formData.get("message") as string;

    try {
      await submitContactMessage({ full_name, email, request_type, message });
      setSent(true);
      toast.success("تم إرسال رسالتك بنجاح");
      form.reset();
    } catch {
      toast.error("حدث خطأ في إرسال الرسالة");
    }
  };

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-soft">تواصل معنا</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            ابدأ بخطوة واضحة
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
            أرسل استفسارك حول الدورات أو الخدمات أو المنتجات الرقمية، وسنساعدك
            على اختيار المسار الأنسب.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <aside className="space-y-4">
            <div className="card-elevated p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold">البريد الإلكتروني</h3>
              <p className="mt-2 text-sm text-muted-foreground">kaoutarsami@abatools.info</p>
            </div>
            <div className="card-elevated p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold">الهاتف / واتساب</h3>
              <p className="mt-2 text-sm text-muted-foreground" dir="ltr">+212 6 54 24 48 44</p>
            </div>
            <div className="card-elevated p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold">وقت الرد</h3>
              <p className="mt-2 text-sm text-muted-foreground">خلال 48 ساعة عمل عادةً.</p>
            </div>
          </aside>

          <form
            className="card-elevated p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">الاسم</span>
                <input required name="full_name" type="text" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15" placeholder="اسمك الكامل" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">البريد الإلكتروني</span>
                <input required name="email" type="email" dir="ltr" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15" placeholder="you@example.com" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-semibold">نوع الطلب</span>
                <select required name="request_type" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15">
                  <option value="">اختر نوع الطلب</option>
                  <option>دورة</option>
                  <option>استشارة</option>
                  <option>منتج رقمي</option>
                  <option>مؤسسة</option>
                </select>
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-semibold">الرسالة</span>
                <textarea required name="message" rows={5} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15" placeholder="اكتب استفسارك هنا…" />
              </label>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              {sent ? (
                <p className="text-sm font-semibold text-primary">تم استلام رسالتك — سنعود إليك قريباً.</p>
              ) : (
                <span className="text-xs text-muted-foreground">نحترم خصوصيتك ولا نشارك بياناتك مع أي طرف.</span>
              )}
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90">
                إرسال
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}