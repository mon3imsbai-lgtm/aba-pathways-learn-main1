import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BadgeCheck, BookOpen, Calendar, Check, MapPin, Shield, Users } from "lucide-react";
import { Section, SectionHeader } from "../components/section";
import { getCourseBySlug } from "@/lib/db/queries";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "السعر والتسجيل — AbaTools" },
      {
        name: "description",
        content:
          "سجّل مقعدك في الدورة الحضورية بسعر 1000 درهم مغربي. تدريب تفاعلي مع أدوات ورشة عمل وشبكات مهنية.",
      },
      { property: "og:title", content: "السعر والتسجيل — AbaTools" },
      {
        property: "og:description",
        content: "دورة حضورية بسعر 1000 درهم مغربي. احجز مقعدك الآن.",
      },
    ],
  }),
  component: PricingPage,
});

const included = [
  "40 ساعة تدريب حضوري تفاعلي",
  "أدوات ورشة عمل مطبوعة وإلكترونية",
  "شهادة إتمام الدورة 40 ساعة معتمدة من AbaTools و QABA",
  "فرصة التواصل مع شبكة مهنية متخصصة",
  "متابعة ما بعد الدورة لمدة 3 أشهر",
];

export default function PricingPage() {
  const { data: course } = useQuery({
    queryKey: ["course", "abat"],
    queryFn: () => getCourseBySlug("abat"),
  })

  const price = course?.price || 1000
  const hours = course?.hours || "40 ساعة"
  const description = course?.full_description || course?.description || ""

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-gold">الدورة القادمة</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            سجّل مقعدك في الدورة الحضورية
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
            دورة تدريبية عملية بإشراف الخبيرة كوثر سامي، محللة سلوك معتمدة QBA،
            تهدف إلى تأسيسك في تحليل السلوك التطبيقي وإعدادك للعمل المهني.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="card-elevated overflow-hidden">
            <div className="bg-primary/5 p-6 md:p-8 border-b border-border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-muted-foreground">دورة حضورية</p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground">
                    دورة ABAT — التقني في تحليل السلوك التطبيقي{"\u00A0"}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">السعر الإجمالي</p>
                  <p className="text-4xl font-extrabold text-primary mt-1" dir="rtl">
                    {price.toLocaleString()} <span className="text-xl font-bold">MAD</span>
                    <span className="block text-xs font-normal mt-1 text-muted-foreground">(غير شاملة للإشراف)</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-lg mb-4">ما يشمله التسجيل</h3>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-6">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">مدة الدورة</p>
                    <p className="text-sm font-bold">{hours} تدريبية</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">طريقة التقديم</p>
                    <p className="text-sm font-bold">حضورية — مكان محدد يُعلن لاحقاً</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">المقاعد</p>
                    <p className="text-sm font-bold">محدودة لضمان التفاعل</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 pt-0 md:pt-0">
              <a
                href="mailto:kaoutarsami@abatools.info?subject=طلب%20تسجيل%20في%20دورة%20ABAT%20-%201000%20MAD"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                احجز مقعدك الآن
                <ArrowLeft className="h-5 w-5" />
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                بعد النقر سيتم فتح رسالة بريد تمهيدية. سنرسل لك تفاصيل الدفع والحجز خلال 48 ساعة عمل.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-surface-soft p-5">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">سياسة استرجاع الأموال</p>
              <p className="mt-1 text-sm text-muted-foreground leading-6">
                يمكنك طلب استرجاع المبلغ المدفوع وفق شروط محددة. يتم إعادة المبلغ حصراً عبر تحويل بنكي تقليدي. اقرأ التفاصيل في{" "}
                <Link to="/refund-policy" className="font-bold text-primary underline underline-offset-4 hover:text-primary/90">
                  صفحة سياسة استرجاع الأموال
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          align="center"
          eyebrow="لماذا هذه الدورة؟"
          title="تدريب يضعك على بداية الطريق المهني"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card-elevated p-6 text-center">
            <BookOpen className="h-6 w-6 text-primary mx-auto" />
            <h3 className="mt-4 font-bold">محتوى علمي موثوق</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-6">
              مبادئ ABA وطرق التقييم والتدريس مباشرة من المعايير المهنية العالمية.
            </p>
          </div>
          <div className="card-elevated p-6 text-center">
            <BadgeCheck className="h-6 w-6 text-primary mx-auto" />
            <h3 className="mt-4 font-bold">إشراف معتمد</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-6">
              بإشراف الخبيرة كوثر سامي، محللة سلوك معتمدة QBA، لضمان جودة التدريب.
            </p>
          </div>
          <div className="card-elevated p-6 text-center">
            <Users className="h-6 w-6 text-primary mx-auto" />
            <h3 className="mt-4 font-bold">تفاعل وشبكة مهنية</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-6">
              بيئة حضورية تسمح بالنقاش والتطبيق العملي وبناء علاقات مهنية جديدة.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
