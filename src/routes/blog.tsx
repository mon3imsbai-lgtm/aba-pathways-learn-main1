import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User } from "lucide-react";
import { Section, SectionHeader } from "../components/section";
import { getBlogPosts } from "@/lib/db/queries";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "المدونة — AbaTools" },
      { name: "description", content: "مقالات مهنية وأسرية في التوحد وتحليل السلوك التطبيقي." },
      { property: "og:title", content: "المدونة — AbaTools" },
      { property: "og:description", content: "قراءات موجزة وواضحة لدعم الأسرة والأخصائي." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { title: "كيف نبني روتيناً هادئاً للطفل داخل البيت؟", excerpt: "خطوات عملية لبناء روتين يومي متوقّع يساعد على تقليل السلوكيات الصعبة.", date: "قريباً", author: "كوثر سامي" },
  { title: "أساسيات جمع البيانات في ABA", excerpt: "لماذا نقيس؟ وكيف نختار الأداة الصحيحة لجمع البيانات؟", date: "قريباً", author: "فريق AbaTools" },
  { title: "التواصل الوظيفي: من أين نبدأ؟", excerpt: "مبادئ عامة لبناء نظام تواصل يخدم الطفل والأسرة.", date: "قريباً", author: "كوثر سامي" },
  { title: "دور المعلم في دمج الطفل داخل الصف", excerpt: "أدوات مبسّطة لدعم المعلم داخل البيئة الصفية.", date: "قريباً", author: "فريق AbaTools" },
  { title: "التعاون مع الأسرة: مفتاح النجاح", excerpt: "لماذا يعتبر التعاون الأسري ركيزة أساسية للتقدم؟", date: "قريباً", author: "كوثر سامي" },
  { title: "الأخلاقيات المهنية في ABA", excerpt: "مبادئ عامة يجب أن يلتزم بها كل ممارس في المجال.", date: "قريباً", author: "فريق AbaTools" },
];

function BlogPage() {
  const { data: dbPosts } = useQuery({
    queryKey: ["blog"],
    queryFn: getBlogPosts,
  })
  const displayPosts = dbPosts && dbPosts.length > 0
    ? dbPosts.map((p) => ({
        title: p.title,
        excerpt: p.excerpt,
        date: p.published_at ? new Date(p.published_at).toLocaleDateString("ar-MA") : "قريباً",
        author: "فريق AbaTools",
      }))
    : posts;

  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24">
          <span className="badge-soft">المدونة</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            مقالات هادئة، مهنية، وقابلة للتطبيق
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
            محتوى قصير ومركّز لدعم الأسر والأخصائيين في رحلتهم مع التوحد و ABA.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="أحدث المقالات" title="قراءات موجزة" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((p) => (
            <article key={p.title} className="card-elevated card-elevated-hover p-6 flex flex-col">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{p.date}</span>
                <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{p.author}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground flex-1">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}