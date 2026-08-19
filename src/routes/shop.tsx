import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Download } from "lucide-react";
import { Section } from "../components/section";
import { getProducts } from "@/lib/db/queries";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "المتجر الرقمي — AbaTools" },
      { name: "description", content: "متجر AbaTools للحقائب التدريبية والموارد الرقمية القابلة للتحميل." },
      { property: "og:title", content: "المتجر الرقمي — AbaTools" },
      { property: "og:description", content: "منتجات رقمية بأسعار مناسبة لدعم الأسر والأخصائيين." },
    ],
  }),
  component: ShopPage,
});

const products = [
  { title: "دليل الأسرة العملي PDF", desc: "دليل مبسّط للأسرة لبناء روتين ودعم التواصل.", price: 19 },
  { title: "أوراق عمل التواصل", desc: "أوراق عمل قابلة للطباعة لدعم التواصل الوظيفي.", price: 12 },
  { title: "بطاقات تعليمية قابلة للطباعة", desc: "بطاقات بصرية لمهارات متعددة.", price: 17 },
  { title: "دفتر متابعة السلوك", desc: "أداة يومية لتتبّع السلوك وتحليله.", price: 21 },
  { title: "نماذج تقييم المهارات", desc: "نماذج جاهزة لتقييم المهارات وتوثيق البيانات.", price: 15 },
  { title: "حقيبة الاستشارات الأسرية", desc: "حقيبة متكاملة لجلسات الإرشاد الأسري.", price: 39 },
  { title: "حقيبة تدريب ABAT", desc: "مادة تدريبية داعمة لمسار ABAT.", price: 49 },
  { title: "دليل المعلم داخل الصف", desc: "أدوات عملية للمعلمين لإدارة الصف.", price: 24 },
];

function ShopPage() {
  const { data: dbProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })
  const displayProducts = dbProducts && dbProducts.length > 0
    ? dbProducts.map((p) => ({
        title: p.title,
        desc: p.description,
        price: p.price,
      }))
    : products;

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-soft">المتجر</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            متجر AbaTools للحقائب والموارد الرقمية
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
            منتجات قابلة للتحميل بعد الدفع، تخدم الأسرة والأخصائي والمعلم بأدوات عملية.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProducts.map((p) => (
            <article key={p.title} className="card-elevated card-elevated-hover overflow-hidden flex flex-col">
              <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-surface flex items-center justify-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Download className="h-7 w-7" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-7 flex-1">{p.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-primary">
                    {p.price} <span className="text-xs font-semibold text-muted-foreground">MAD</span>
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    أضف للسلة
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}