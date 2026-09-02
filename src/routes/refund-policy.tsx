import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, Check, Mail, Send, Shield } from "lucide-react";
import { Section, SectionHeader } from "../components/section";
import { submitRefundRequest } from "@/lib/db/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "سياسة استرجاع الأموال — AbaTools" },
      {
        name: "description",
        content:
          "تعرف على شروط وخطوات استرجاع مبلغ الدورة البالغ 1000 درهم مغربي. يتم الإعادة حصراً عبر تحويل بنكي تقليدي.",
      },
      { property: "og:title", content: "سياسة استرجاع الأموال — AbaTools" },
      {
        property: "og:description",
        content: "شروط وخطوات طلب استرجاع مبلغ الدورة عبر التحويل البنكي.",
      },
    ],
  }),
  component: RefundPolicyPage,
});

const steps = [
  {
    title: "إرسال طلب رسمي",
    description:
      "أرسل طلب استرجاع عبر نموذج التواصل أو البريد الإلكتروني، ويتضمن الاسم الكامل ورقم التسجيل في الدورة.",
  },
  {
    title: "تقديم البيانات البنكية",
    description:
      "أرفق البيانات البنكية الكاملة (رقم الحساب البنكي RIB واسم صاحب الحساب) لاستلام التحويل البنكي.",
  },
  {
    title: "مراجعة الطلب والتحويل",
    description:
      "تقوم الإدارة بمراجعة الطلب خلال فترة عمل محددة، ثم تنفّذ التحويل البنكي المباشر إلى حسابك.",
  },
];

const conditions = [
  "يجب أن يكون الطلب مقدماً من نفس الشخص المُسجّل في الدورة.",
  "يُرسل الطلب من البريد المُستخدم أثناء التسجيل أو يُرفق معه رقم التسجيل.",
  "تطبّق الشروط الزمنية المُعلنة في رسالة التأكيد بعد التسجيل.",
  "تُعاد الأموال حصراً عبر تحويل بنكي تقليدي (Wire Transfer) — لا يوجد دفع نقدي أو إلكتروني مباشر.",
];

export default function RefundPolicyPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const full_name = formData.get("full_name") as string;
    const registration_number = formData.get("registration_number") as string;
    const email = formData.get("email") as string;
    const bank_rib = formData.get("bank_rib") as string;
    const account_holder = formData.get("account_holder") as string;
    const bank_name = formData.get("bank_name") as string;
    const reason = formData.get("reason") as string;

    try {
      await submitRefundRequest({
        full_name,
        registration_number,
        email,
        bank_rib,
        account_holder,
        bank_name,
        reason: reason || undefined,
      });
      setSent(true);
      toast.success("تم إرسال طلب الاسترجاع بنجاح");
      form.reset();
    } catch {
      toast.error("حدث خطأ في إرسال الطلب");
    }
  };

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-soft">سياسة وضوابط</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            سياسة استرجاع الأموال
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
            نوضح لك الشروط والخطوات التفصيلية لطلب استرجاع مبلغ الدورة. تتم إعادة المبلغ
            المالي حصراً عبر تحويل بنكي تقليدي (Wire Transfer) بعد التحقق من المعلومات.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">ملخص السياسة</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-7">
                يحق للمُسجّل طلب استرجاع مبلغ الدورة الحضورية البالغ{" "}
                <strong className="text-foreground">1000 درهم مغربي (1000 MAD)</strong>{" "}
                وفق الشروط المعلنة. نحرص على معالجة كل طلب بشفافية وإرسال التحويل البنكي بعد
                إتمام المراجعة الإدارية.
              </p>
            </div>

            <div className="card-elevated p-6">
              <h2 className="text-lg font-bold mb-4">شروط الأحقية</h2>
              <ul className="space-y-3">
                {conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-6">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-3">
                <Banknote className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">طريقة الإعادة</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-7">
                تُعاد الأموال حصراً عبر{" "}
                <strong className="text-foreground">تحويل بنكي تقليدي (Wire Transfer)</strong>{" "}
                على الحساب البنكي المُرفق في نموذج الطلب. يجب أن يكون اسم صاحب الحساب مطابقاً
                للتسجيل أو مُرفقاً بتوضيح رسمي.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card-elevated p-6 md:p-8">
              <SectionHeader
                title="خطوات طلب الاسترجاع"
                description="اتبع الخطوات التالية بترتيبها لضمان معالجة طلبك بسرعة."
              />
              <div className="mt-6 space-y-4">
                {steps.map((s, i) => (
                  <div key={s.title} className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
                    <span className="shrink-0 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-6">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              className="card-elevated p-6 md:p-8"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center gap-3 mb-5">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">نموذج طلب استرجاع الأموال</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-6 mb-5">
                املأ البيانات التالية وسنراجع طلبك ونعود إليك لتأكيد التحويل البنكي.
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">الاسم الكامل</span>
                  <input
                    required
                    name="full_name"
                    type="text"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="اسمك الكامل"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">رقم التسجيل / الدورة</span>
                  <input
                    required
                    name="registration_number"
                    type="text"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="رقم التسجيل أو الدورة المسجّل فيها"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold">البريد الإلكتروني المُستخدم في التسجيل</span>
                  <input
                    required
                    name="email"
                    type="email"
                    dir="ltr"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">رقم الحساب البنكي (RIB)</span>
                  <input
                    required
                    name="bank_rib"
                    type="text"
                    dir="ltr"
                    minLength={10}
                    maxLength={34}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="XX XXXX XXXX XXXX XXXX XXXX XXX"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">اسم صاحب الحساب البنكي</span>
                  <input
                    required
                    name="account_holder"
                    type="text"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="الاسم المسجل في الحساب"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold">اسم البنك</span>
                  <input
                    required
                    name="bank_name"
                    type="text"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="اسم البنك الذي يحمل الحساب"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold">سبب طلب الاسترجاع (اختياري)</span>
                  <textarea
                    name="reason"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                    placeholder="اشرح باختصار سبب طلب الاسترجاع..."
                  />
                </label>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                {sent ? (
                  <p className="text-sm font-semibold text-primary">تم استلام طلبك — سنتواصل معك لتأكيد التحويل البنكي.</p>
                ) : (
                  <span className="text-xs text-muted-foreground">نراجع كل طلب بشكل فردي ونرد خلال 5 أيام عمل كحد أقصى.</span>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  إرسال الطلب
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
