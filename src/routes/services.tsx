import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  HeartHandshake,
  Users,
  Building2,
  MessageSquare,
  GraduationCap,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import { Section, SectionHeader } from "../components/section";
import { getServices } from "@/lib/db/queries";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "الخدمات والاستشارات — AbaTools" },
      {
        name: "description",
        content:
          "استشارات وتدريب وتقييم للأسر والأخصائيين والمؤسسات في التوحد وتحليل السلوك التطبيقي.",
      },
      { property: "og:title", content: "الخدمات والاستشارات — AbaTools" },
      {
        property: "og:description",
        content: "حلول متكاملة تجمع بين الاستشارة والتدريب والتقييم.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: HeartHandshake, title: "للأسرة والطفل", desc: "إرشاد عملي لبناء روتين يومي، دعم التواصل، وفهم السلوكيات الصعبة." },
  { icon: Users, title: "للأخصائيين", desc: "تطوير مهني، مراجعة خطط، وحقائب عمل تساعد على جودة الجلسات والتوثيق." },
  { icon: Building2, title: "للمؤسسات", desc: "برامج تدريب فرق، سياسات متابعة، وأدوات قياس للمراكز والمدارس." },
  { icon: MessageSquare, title: "الاستشارات", desc: "جلسات فردية لتحديد الأولويات ووضع خطة متابعة قصيرة وواضحة." },
  { icon: GraduationCap, title: "التدريب", desc: "برامج تدريبية حول التواصل، السلوك، التقييم، وإدارة الصف." },
  { icon: ClipboardList, title: "التقييم", desc: "تنظيم أدوات الملاحظة ونماذج البيانات لتحديد مستوى المهارات والاحتياجات." },
];

function ServicesPage() {
  const { data: dbServices } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  })
  const displayServices = dbServices && dbServices.length > 0
    ? dbServices.map((s) => ({
        icon: HeartHandshake,
        title: s.title,
        desc: s.description,
      }))
    : services;

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-soft">الخدمات والاستشارات</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            حلول للأسر والأخصائيين والمؤسسات
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-8">
            خدماتنا مصممة لتلبية احتياجات مختلف الفئات بأسلوب هادئ ومهني، مع
            التزام بالممارسات المعتمدة في تحليل السلوك التطبيقي.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((s) => (
            <article key={s.title} className="card-elevated card-elevated-hover p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.desc}</p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                طلب استشارة <ArrowLeft className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader
          eyebrow="خطوات العمل معنا"
          title="مسار واضح من الاستفسار إلى التطبيق"
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["1", "الاستفسار", "أرسل طلبك عبر النموذج مع تحديد نوع الخدمة."],
            ["2", "التقييم", "جلسة أولى لتحديد الأولويات والاحتياجات."],
            ["3", "الخطة", "بناء خطة متابعة قصيرة وقابلة للتطبيق."],
            ["4", "المتابعة", "دعم مستمر ومراجعة دورية للنتائج."],
          ].map(([n, t, d]) => (
            <li key={n} className="card-elevated p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
                {n}
              </span>
              <h4 className="mt-4 font-bold">{t}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-7">{d}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}