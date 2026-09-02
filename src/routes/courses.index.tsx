import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, GraduationCap, Sparkles } from "lucide-react";
import trainingImg from "../assets/training.jpg";
import { Section } from "../components/section";
import { getCourses } from "@/lib/db/queries";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "الدورات — AbaTools" },
      {
        name: "description",
        content: "مسارات AbaTools في التوحد وتحليل السلوك التطبيقي، بإشراف علمي من محللة السلوك QBA.",
      },
      { property: "og:title", content: "الدورات — AbaTools" },
      {
        property: "og:description",
        content: "ABAT، QASP-S، QBA، Ablls-r، VB-MAPP، PECS وبرامج التدخل المبكر.",
      },
    ],
  }),
  component: CoursesPage,
});

const courses = [
  {
    slug: "abat",
    title: "ABAT — Applied Behavior Analysis Technician",
    desc: "مسار تأسيسي لفهم تحليل السلوك التطبيقي، جمع البيانات، تدريس المهارات، التواصل الوظيفي، وخفض السلوكيات الصعبة ضمن ممارسات أخلاقية.",
    hours: "40 ساعة",
    status: "قريباً",
    featured: true,
  },
  { title: "QASP-S Preparation", desc: "تحضير لاختبار QASP-S وفق المعايير المهنية.", hours: "TBA", status: "قريباً" },
  { title: "QBA Preparation", desc: "الإعداد لشهادة محلل السلوك المؤهل QBA.", hours: "TBA", status: "قريباً" },
  { title: "Ablls-r", desc: "تقييم المهارات الأساسية للتعلم واللغة.  اداة تقييم ودليل منهج المهارات الاساسية والضرورية للتواصل والتعلم واللغة. يحتوي علي المهارات الاساسية التي تساعد علي اكتساب وتعلم وممارسة الكلام واللغة.", hours: "TBA", status: "قريباً" },
  { title: "VB-MAPP", desc: "أداة تقييم اللغة والسلوك اللفظي للأطفال.", hours: "TBA", status: "قريباً" },
  { title: "PECS", desc: "نظام التواصل بتبادل الصور خطوة بخطوة.", hours: "TBA", status: "قريباً" },
  { title: "التدخل المبكر", desc: "برامج ومسارات التدخل المبكر للأطفال.", hours: "TBA", status: "قريباً" },
  { title: "إدارة السلوك", desc: "استراتيجيات عملية لإدارة السلوكيات الصعبة.", hours: "TBA", status: "قريباً" },
  { title: "مهارات التواصل", desc: "تنمية مهارات التواصل الوظيفي والاجتماعي.", hours: "TBA", status: "قريباً" },
];

function CoursesPage() {
  const { data: dbCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  })
  const displayCourses = dbCourses && dbCourses.length > 0
    ? dbCourses.map((c) => ({
        slug: c.slug,
        title: c.title,
        desc: c.description,
        hours: c.hours || "TBA",
        status: c.status === "open" ? "مفتوح" : c.status === "upcoming" ? "قريباً" : "مغلق",
        featured: c.featured,
      }))
    : courses;

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center py-16 md:py-24">
          <div>
            <span className="badge-gold">
              <Sparkles className="h-3.5 w-3.5" /> مسارات AbaTools
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              مسارات AbaTools في التوحد وتحليل السلوك
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
              نعلن مبدئياً عن مسارات ABAT ثم QASP-S وQBA وAblls-r وVB-MAPP وPECS
              وبرامج التدخل المبكر وإدارة السلوك ومهارات التواصل، تحت إشراف
              الخبيرة كوثر سامي.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={trainingImg}
              alt="ورشة تدريبية للأخصائيين"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayCourses.map((c) => (
            <article
              key={c.title}
              className={`card-elevated card-elevated-hover p-6 flex flex-col ${c.featured ? "ring-2 ring-primary/40" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className={c.featured ? "badge-gold" : "badge-soft"}>
                  {c.featured ? "مسار رئيسي" : c.status}
                </span>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {c.hours}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug flex items-start gap-2">
                <GraduationCap className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span>{c.title}</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-7 flex-1">
                {c.desc}
              </p>
              {c.slug ? (
                <Link
                  to="/courses/abat"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  التفاصيل <ArrowLeft className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  سجّل اهتمامك <ArrowLeft className="h-4 w-4" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}