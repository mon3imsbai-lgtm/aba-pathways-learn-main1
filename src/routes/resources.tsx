import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText, BookOpen, ClipboardList, Layers } from "lucide-react";
import materialsImg from "../assets/materials.jpg";
import { Section, SectionHeader } from "../components/section";
import { getProducts } from "@/lib/db/queries";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "الموارد الرقمية — AbaTools" },
      {
        name: "description",
        content: "كتب PDF، نماذج تقييم، بطاقات تعليمية، وأوراق عمل قابلة للتحميل.",
      },
      { property: "og:title", content: "الموارد الرقمية — AbaTools" },
      {
        property: "og:description",
        content: "أدوات جاهزة للأسرة والأخصائي والمعلم.",
      },
    ],
  }),
  component: ResourcesPage,
});

const items = [
  { icon: BookOpen, title: "دليل الأسرة العملي PDF", desc: "دليل مبسّط للأسر لبناء روتين ودعم التواصل." },
  { icon: ClipboardList, title: "نماذج التقييم والمتابعة", desc: "نماذج جاهزة لتوثيق البيانات والتقدم." },
  { icon: Layers, title: "بطاقات تعليمية قابلة للطباعة", desc: "بطاقات بصرية لدعم مهارات متعددة." },
  { icon: FileText, title: "أوراق عمل التواصل", desc: "أوراق عمل عملية لتنمية التواصل الوظيفي." },
  { icon: BookOpen, title: "حقيبة الاستشارات الأسرية", desc: "حقيبة متكاملة لجلسات الإرشاد الأسري." },
  { icon: BookOpen, title: "حقيبة تدريب ABAT", desc: "مادة تدريبية داعمة لمسار ABAT." },
  { icon: ClipboardList, title: "دفتر متابعة السلوك", desc: "أداة يومية لملاحظة السلوك وتحليله." },
  { icon: BookOpen, title: "دليل المعلم داخل الصف", desc: "أدوات عملية لدعم المعلمين في الصف." },
];

function ResourcesPage() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })
  const displayItems = products && products.length > 0
    ? products.map((p) => ({
        icon: BookOpen,
        title: p.title,
        desc: p.description,
      }))
    : items;

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <span className="badge-soft">الموارد الرقمية</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              موارد رقمية للتحميل بعد الدفع
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
              كتب PDF، حقائب تدريبية، نماذج تقييم، أوراق عمل، وبطاقات تعليمية
              قابلة للطباعة، مصمّمة لخدمة الأسرة والأخصائي والمعلم.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                زيارة المتجر
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img src={materialsImg} alt="موارد بصرية وأوراق عمل" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="مكتبة الموارد" title="اختر الأداة المناسبة" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((i) => (
            <div key={i.title} className="card-elevated card-elevated-hover p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <i.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug">{i.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{i.desc}</p>
              <Link to="/shop" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                <Download className="h-4 w-4" /> عرض في المتجر
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}