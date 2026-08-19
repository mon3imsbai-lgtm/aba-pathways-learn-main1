import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Building2,
  ShieldCheck,
  Sparkles,
  Users,
  Star,
  ChevronDown,
  Award,
  Clock,
  Layers,
} from "lucide-react";
import heroImg from "../assets/aba-session.png";
import expertImg from "../assets/kaoutar-sami.jpg";
import familyImg from "../assets/family-session.jpg";
import materialsImg from "../assets/materials.jpg";
import trainingImg from "../assets/training.jpg";
import { Section, SectionHeader } from "../components/section";
import { getFeatures, getCourses, getTestimonials, getFaqItems, getProducts } from "@/lib/db/queries";
import { getServices } from "@/lib/db/queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AbaTools — منصة تدريب واستشارات في التوحد و ABA" },
      {
        name: "description",
        content:
          "منصة عربية موثوقة للتدريب والاستشارات والموارد الرقمية في التوحد وتحليل السلوك التطبيقي، بإشراف الخبيرة كوثر سامي QBA.",
      },
      { property: "og:title", content: "AbaTools — منصة تدريب واستشارات في التوحد و ABA" },
      {
        property: "og:description",
        content:
          "منصة عربية موثوقة للتدريب والاستشارات والموارد الرقمية في التوحد وتحليل السلوك التطبيقي، بإشراف الخبيرة كوثر سامي QBA.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Supervision />
      <Features />
      <UpcomingCourses />
      <AbatSpotlight />
      <ResourcesPreview />
      <ServicesPreview />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16 py-16 md:py-24 items-center">
        <div>
          <span className="badge-gold">
            <Award className="h-3.5 w-3.5" />
            بإشراف الخبيرة كوثر سامي — QBA
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-foreground leading-[1.15]">
            AbaTools
            <span className="block mt-3 text-2xl md:text-3xl font-bold text-primary">
              منصة تدريب واستشارات في التوحد و ABA
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg leading-8 text-muted-foreground max-w-xl">
            منصة عربية تقدّم إعلانات مبدئية عن دورات قادمة، استشارات أسرية ومهنية،
            كتب إلكترونية، حقائب تدريبية، وموارد رقمية قابلة للتحميل، بإشراف
            الخبيرة كوثر سامي محللة سلوك معتمدة QBA وأخصائية نفسية تربوية.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:bg-primary/90"
            >
              <GraduationCap className="h-4 w-4" />
              تصفّح الدورات
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              سجّل اهتمامك
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "8+", v: "مسارات تدريبية" },
              { k: "QBA", v: "إشراف معتمد" },
              { k: "AR", v: "محتوى عربي" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-card/70 p-4 text-center">
                <dt className="text-xl font-extrabold text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-gold/20 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-2xl">
            <img
              src={heroImg}
              alt="جلسة تدخل سلوكي ABA مع طفل باستخدام بطاقات PECS ومكعبات تعليمية"
              width={768}
              height={1344}
              className="h-full w-full object-cover aspect-[4/5] md:aspect-[5/6]"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 md:-right-8 max-w-[16rem] rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-foreground">ممارسة مهنية أخلاقية</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground leading-6">
              محتوى موثوق مبني على ممارسات ABA المعتمدة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Supervision() {
  return (
    <Section className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={expertImg}
              alt="الخبيرة كوثر سامي — محللة سلوك معتمدة QBA"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover aspect-[4/5]"
            />
          </div>
          <div className="absolute -top-4 -left-4 rounded-2xl bg-primary text-primary-foreground px-4 py-3 shadow-lg">
            <p className="text-xs opacity-80">إشراف علمي</p>
            <p className="text-base font-extrabold">كوثر سامي — QBA</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="badge-soft">
            <BadgeCheck className="h-3.5 w-3.5" />
            إشراف علمي
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">
            كل برامج AbaTools تحت إشراف الخبيرة كوثر سامي
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            محللة سلوك معتمدة QBA وأخصائية نفسية تربوية، تُشرف على بناء محتوى
            المنصة ومساراتها التدريبية لضمان وضوح المعلومات وارتباطها بالممارسة
            المهنية والأسرية.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="badge-gold">QBA معتمدة</span>
            <span className="badge-soft">محللة سلوك</span>
            <span className="badge-soft">أخصائية نفسية تربوية</span>
            <span className="badge-soft">إشراف علمي ومهني</span>
          </div>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            تعرّف على الخبيرة أكثر
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

const featureItems = [
  {
    icon: BookOpen,
    title: "محتوى عربي منظّم",
    desc: "دورات وموارد بلغة عربية واضحة، مع مصطلحات إنجليزية معتمدة.",
  },
  {
    icon: ShieldCheck,
    title: "إشراف علمي موثوق",
    desc: "كل مسار يمرّ بمراجعة مهنية من محللة سلوك معتمدة QBA.",
  },
  {
    icon: HeartHandshake,
    title: "دعم أسري ومهني",
    desc: "استشارات وأدوات تخدم الأسرة والأخصائي والمعلم في آنٍ واحد.",
  },
  {
    icon: Layers,
    title: "موارد قابلة للتطبيق",
    desc: "نماذج، أوراق عمل، وحقائب تدريبية جاهزة للاستخدام.",
  },
];

function Features() {
  const { data: features } = useQuery({
    queryKey: ["features"],
    queryFn: getFeatures,
  })
  const displayFeatures = features && features.length > 0 ? features.map(f => ({
    title: f.title,
    desc: f.description,
    icon: BookOpen,
  })) : featureItems;

  return (
    <Section>
      <SectionHeader
        eyebrow="مميزات المنصة"
        title="لماذا يختار الأخصائيون والأسر AbaTools"
        description="منصة تجمع بين الوضوح العلمي، والعملية الميدانية، والذوق التعليمي الهادئ."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayFeatures.map((f) => (
          <div key={f.title} className="card-elevated card-elevated-hover p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const upcomingCourses = [
  { title: "ABAT — Applied Behavior Analysis Technician", tag: "قريباً", desc: "المسار التأسيسي في تحليل السلوك التطبيقي.", hours: "40 ساعة" },
  { title: "QASP-S Preparation", tag: "قريباً", desc: "تحضير احترافي لاختبار QASP-S.", hours: "TBA" },
  { title: "QBA Preparation", tag: "قريباً", desc: "الإعداد لشهادة محلل السلوك المؤهل.", hours: "TBA" },
  { title: "RBT Basics", tag: "قريباً", desc: "أساسيات مساعد تحليل السلوك المسجّل.", hours: "TBA" },
  { title: "VB-MAPP", tag: "قريباً", desc: "أداة تقييم اللغة والسلوك اللفظي.", hours: "TBA" },
  { title: "PECS", tag: "قريباً", desc: "نظام التواصل بتبادل الصور.", hours: "TBA" },
];

function UpcomingCourses() {
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  })
  const displayCourses = courses && courses.length > 0
    ? courses.slice(0, 6).map((c) => ({
        title: c.title,
        tag: c.status === "open" ? "مفتوح" : c.status === "upcoming" ? "قريباً" : "مغلق",
        desc: c.description,
        hours: c.hours || "TBA",
      }))
    : upcomingCourses;

  return (
    <Section className="bg-surface">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="الدورات القادمة"
          title="مسارات تدريبية عربية بإشراف علمي"
          description="إعلانات مبدئية لمسارات AbaTools القادمة في تحليل السلوك والتوحد."
        />
        <Link to="/courses" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
          كل الدورات <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {displayCourses.map((c) => (
          <article key={c.title} className="card-elevated card-elevated-hover p-6 flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="badge-soft">{c.tag}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {c.hours}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-7 flex-1">{c.desc}</p>
            <Link to="/courses" className="mt-5 text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              التفاصيل <ArrowLeft className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

function AbatSpotlight() {
  return (
    <Section>
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-l from-primary to-primary/85 text-primary-foreground">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              دورة قادمة — الإعلان الأول
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">
              دورة ABAT — Applied Behavior Analysis Technician
            </h2>
            <p className="mt-4 text-primary-foreground/85 leading-8">
              برنامج تدريبي منظّم يؤسس المتدرّب لفهم مبادئ تحليل السلوك التطبيقي
              والعمل مع الأطفال ذوي اضطراب طيف التوحد ضمن ممارسات مهنية واضحة.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-md text-sm">
              {[
                ["الساعات", "40 ساعة"],
                ["مدة الوصول", "3 أشهر"],
                ["اللغة", "العربية + مصطلحات إنجليزية"],
                ["الحالة", "قريباً"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/10 p-3">
                  <p className="text-[11px] uppercase opacity-70">{k}</p>
                  <p className="mt-1 font-bold">{v}</p>
                </div>
              ))}
            </div>
            <Link
              to="/courses/abat"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 text-sm font-bold shadow-lg hover:opacity-95"
            >
              تفاصيل الدورة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-full min-h-[320px]">
            <img
              src={trainingImg}
              alt="ورشة تدريبية للأخصائيين"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ResourcesPreview() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })
  const items = products && products.length > 0
    ? products.slice(0, 6).map((p) => p.title)
    : [
        "دليل الأسرة العملي PDF",
        "أوراق عمل التواصل",
        "بطاقات تعليمية قابلة للطباعة",
        "دفتر متابعة السلوك",
        "نماذج تقييم المهارات",
        "حقيبة تدريب ABAT",
      ];
  return (
    <Section className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
          <img
            src={materialsImg}
            alt="نماذج بصرية وأوراق عمل"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover aspect-[4/3]"
          />
        </div>
        <div>
          <SectionHeader
            eyebrow="الموارد الرقمية"
            title="أدوات جاهزة للتحميل والاستخدام"
            description="كتب PDF، نماذج تقييم، بطاقات تعليمية قابلة للطباعة، وحقائب تدريبية."
          />
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <BadgeCheck className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/resources" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              تصفّح الموارد <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
              زيارة المتجر
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ServicesPreview() {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  })
  const items = services && services.length > 0
    ? services.slice(0, 3).map((s) => ({
        icon: HeartHandshake,
        title: s.title,
        desc: s.description,
      }))
    : [
        { icon: HeartHandshake, title: "للأسرة والطفل", desc: "إرشاد عملي لبناء روتين ودعم التواصل." },
        { icon: Users, title: "للأخصائيين", desc: "تطوير مهني وحقائب عمل ومراجعة خطط." },
        { icon: Building2, title: "للمؤسسات", desc: "تدريب فرق، سياسات متابعة، وأدوات قياس." },
      ];
  return (
    <Section>
      <SectionHeader
        eyebrow="الخدمات والاستشارات"
        title="حلول تخدم الأسرة والأخصائي والمؤسسة"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="card-elevated card-elevated-hover p-7">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <i.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-bold">{i.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{i.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          اطلع على جميع الخدمات <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function WhyUs() {
  const points = [
    "محتوى عربي مهني بلا مبالغة تسويقية.",
    "إشراف علمي من محللة سلوك QBA.",
    "أدوات قابلة للتطبيق في البيت والمركز والمدرسة.",
    "خصوصية المسارات: مسار للأسرة، ومسار للأخصائي، ومسار للمؤسسة.",
    "تحديث مستمر مبني على البيانات والممارسة.",
    "لغة واضحة، هادئة، ومحترمة للمتلقي.",
  ];
  return (
    <Section className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
        <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
          <img
            src={familyImg}
            alt="جلسة أسرية دافئة مع بطاقات تعليمية"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover aspect-[4/3]"
          />
        </div>
        <div>
          <SectionHeader eyebrow="لماذا AbaTools؟" title="منصة موثوقة تكبر معك خطوة بخطوة" />
          <ul className="mt-6 grid gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm leading-7">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  })
  const t = testimonials && testimonials.length > 0
    ? testimonials.map((x) => ({
        name: x.name,
        role: x.role,
        quote: x.quote,
      }))
    : [
        { name: "أم يوسف", role: "ولية أمر", quote: "المحتوى واضح وعملي، ساعدنا في بناء روتين هادئ للبيت." },
        { name: "سارة، أخصائية تربية خاصة", role: "أخصائية", quote: "أدوات التقييم ونماذج المتابعة وفّرت عليّ وقتاً كبيراً في التوثيق." },
        { name: "مركز إنسان", role: "مؤسسة", quote: "برنامج تدريب الفريق كان منظّماً وواقعياً وسهّل توحيد الممارسة." },
      ];

  return (
    <Section>
      <SectionHeader eyebrow="آراء وتجارب" title="ماذا يقول من جرّب AbaTools" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.map((x) => (
          <figure key={x.name} className="card-elevated p-6">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-7 text-foreground">
              «{x.quote}»
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-bold">{x.name}</span>
              <span className="text-muted-foreground"> — {x.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const { data: faqs } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqItems,
  })
  const items = faqs && faqs.length > 0
    ? faqs.map((i) => ({ q: i.question, a: i.answer }))
    : [
        { q: "هل الدورات متاحة الآن؟", a: "الإعلانات حالياً مبدئية. سيُفتح التسجيل قريباً ونُعلن التواريخ عبر المنصة." },
        { q: "هل المحتوى مناسب للأسر بدون خلفية مهنية؟", a: "نعم. لدينا مسار خاص بالأسر مبني بلغة واضحة وعملية." },
        { q: "هل يمكن للمراكز التعاقد على تدريب فرق العمل؟", a: "نعم، نقدّم برامج مؤسسية مخصصة تشمل التدريب والسياسات وأدوات القياس." },
        { q: "بأي لغة تُقدَّم الدورات؟", a: "العربية مع اعتماد المصطلحات الإنجليزية الأساسية في المجال." },
      ];

  return (
    <Section className="bg-surface">
      <SectionHeader eyebrow="الأسئلة الشائعة" title="إجابات سريعة لأكثر ما يُسأل" />
      <div className="mt-8 mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((i) => (
          <details key={i.q} className="group p-5 open:bg-secondary/40">
            <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
              <span className="text-base font-bold">{i.q}</span>
              <ChevronDown className="h-5 w-5 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{i.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-tl from-secondary via-surface to-card p-8 md:p-14 text-center">
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold">ابدأ خطوتك مع AbaTools</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            سجّل اهتمامك بالدورات القادمة أو تواصل معنا لاختيار الخدمة المناسبة لك.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90">
              سجّل اهتمامك
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/courses" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
              استعرض الدورات
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
