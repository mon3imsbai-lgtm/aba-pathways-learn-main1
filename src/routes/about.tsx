import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Target, Compass, Heart } from "lucide-react";
import expertImg from "../assets/kaoutar-sami.jpg";
import certificateImg from "../assets/qba-certificate.jpg";
import { Section, SectionHeader } from "../components/section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — AbaTools" },
      {
        name: "description",
        content:
          "AbaTools منصة عربية للتدريب والاستشارات في التوحد وتحليل السلوك التطبيقي، بإشراف الخبيرة كوثر سامي QBA.",
      },
      { property: "og:title", content: "من نحن — AbaTools" },
      { property: "og:description", content: "الرؤية والرسالة والقيم وفريق الإشراف العلمي." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-soft">من نحن</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            AbaTools منصة عربية بإشراف الخبيرة كوثر سامي
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-8">
            منصة تعليمية واستشارية تهدف إلى جعل المعرفة المهنية والأسرية في التوحد
            وتحليل السلوك التطبيقي أكثر وضوحاً وتنظيماً وقابلية للتطبيق، بإشراف
            محللة السلوك المعتمدة QBA والأخصائية النفسية التربوية كوثر سامي.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "الرؤية",
              text: "أن تصبح AbaTools مرجعاً عربياً موثوقاً للتعلم المهني والأسري في التوحد وتحليل السلوك التطبيقي.",
            },
            {
              icon: Target,
              title: "الرسالة",
              text: "تقديم محتوى تدريبي واستشاري واضح، أخلاقي، وقابل للتطبيق في البيت والمركز والمدرسة.",
            },
            {
              icon: Heart,
              title: "القيم",
              text: "الاحترام، الدقة، التمكين، سهولة الوصول، والتحسين المستمر المبني على البيانات.",
            },
          ].map((x) => (
            <div key={x.title} className="card-elevated p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <x.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{x.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{x.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="مسيرتنا" title="محطات في تطوّر المنصة" />
        <ol className="mt-10 relative border-r-2 border-border pr-6 space-y-8 max-w-3xl">
          {[
            ["البداية", "بلورة فكرة منصة عربية موحّدة للتدريب والاستشارات في التوحد و ABA."],
            ["الإشراف العلمي", "انضمام الخبيرة كوثر سامي QBA للإشراف على البناء والمحتوى."],
            ["المسارات الأولى", "الإعلان المبدئي عن مسار ABAT وباقي المسارات القادمة."],
            ["الموارد والمتجر", "إطلاق مكتبة الموارد الرقمية والمتجر للحقائب التدريبية."],
            ["التوسّع", "توسيع الخدمات لتشمل المؤسسات والمدارس والمراكز العربية."],
          ].map(([k, v]) => (
            <li key={k} className="relative">
              <span className="absolute -right-[33px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-surface" />
              <h4 className="text-lg font-bold">{k}</h4>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">{v}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <img
                src={expertImg}
                alt="الخبيرة كوثر سامي"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover aspect-[4/5]"
              />
            </div>
          </div>
          <div>
            <span className="badge-gold">
              <Award className="h-3.5 w-3.5" /> QBA معتمدة
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold">
              كوثر سامي — محللة سلوك معتمدة QBA
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              أخصائية نفسية تربوية ومحللة سلوك معتمدة، تعمل على بناء محتوى مهني
              عربي واضح، وتقدّم استشارات وبرامج تدريبية للأسر والأخصائيين
              والمؤسسات، مع التزام كامل بالممارسات الأخلاقية في ABA.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "محللة سلوك مؤهلة QBA",
                "أخصائية نفسية تربوية",
                "خبرة في التقييم والتدخل السلوكي",
                "الإشراف على محتوى ومسارات AbaTools",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <BadgeCheck className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="text-sm font-bold text-foreground mb-3">شهادة الاعتماد QBA</h3>
              <a
                href={certificateImg}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={certificateImg}
                  alt="شهادة QBA — Qualified Behavior Analyst للخبيرة كوثر سامي"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}