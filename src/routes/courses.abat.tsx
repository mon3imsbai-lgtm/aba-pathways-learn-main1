import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Clock, Globe, Monitor, Users } from "lucide-react";
import trainingImg from "../assets/training.jpg";
import { Section, SectionHeader } from "../components/section";
import {
  appealFormFields,
  appealGrounds,
  appealNotes,
  appealOutcomes,
  appealSteps,
  assessmentRules,
  blueprint,
  curriculum,
  curriculumNote,
} from "../lib/abat-content";

export const Route = createFileRoute("/courses/abat")({
  head: () => ({
    meta: [
      { title: "دورة ABAT — AbaTools" },
      {
        name: "description",
        content:
          "برنامج ABAT التأسيسي في تحليل السلوك التطبيقي، 40 ساعة، بإشراف الخبيرة كوثر سامي QBA.",
      },
      { property: "og:title", content: "دورة ABAT — Applied Behavior Analysis Technician" },
      {
        property: "og:description",
        content: "المحاور، الفئات المستهدفة، وتفاصيل الدورة القادمة.",
      },
    ],
  }),
  component: AbatPage,
});

const modules = [
  ["Module 1", "مدخل إلى ABAT وتحليل السلوك التطبيقي"],
  ["Module 2", "التوحد والاضطرابات النمائية"],
  ["Module 3", "مبادئ السلوك"],
  ["Module 4", "القياس وجمع البيانات"],
  ["Module 5", "تدريس المهارات"],
  ["Module 6", "خفض السلوكيات الصعبة"],
  ["Module 7", "التواصل الوظيفي والتعاون مع الأسرة"],
  ["Module 8", "الأخلاقيات والمراجعة النهائية"],
];

const audience = [
  "أخصائيو التربية الخاصة",
  "المعلمون",
  "أخصائيو النطق",
  "أخصائيو العلاج الوظيفي",
  "أولياء الأمور",
  "الخريجون",
];

function AbatPage() {
  return (
    <>
      <section className="gradient-hero">
        <div className="container-x py-16 md:py-24 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <span className="badge-gold">إعلان إعلامي — نشر معلومات عن الدورة</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              دورة ABAT
              <span className="block mt-2 text-xl md:text-2xl text-primary font-bold">
                Applied Behavior Analysis Technician
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-8 max-w-2xl">
              برنامج تدريبي منظّم يؤسس المتدرّب لفهم مبادئ تحليل السلوك التطبيقي
              والعمل مع الأطفال ذوي اضطراب طيف التوحد والاضطرابات النمائية ضمن
              ممارسات مهنية واضحة. هذه الصفحة تهدف إلى نشر معلومات عن الدورة.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                { icon: Clock, k: "40 ساعة", v: "عدد الساعات" },
                { icon: Users, k: "3 أشهر", v: "مدة الوصول" },
                { icon: Globe, k: "AR + EN", v: "لغة التدريب" },
                { icon: Monitor, k: "حضورية", v: "طريقة الدراسة" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card p-4">
                  <s.icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-sm font-extrabold">{s.k}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
              >
                سجّل اهتمامك <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                كل الدورات
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={trainingImg}
              alt="تدريب ABAT"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="محاور الدورة" title="ثمانية محاور متكاملة" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {modules.map(([n, t]) => (
            <div key={n} className="card-elevated p-5 flex items-start gap-4">
              <span className="shrink-0 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary text-xs font-extrabold">
                {n.split(" ")[1]}
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{n}</p>
                <p className="mt-0.5 font-bold">{t}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader eyebrow="الفئات المستهدفة" title="لمن تناسب دورة ABAT؟" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
          {audience.map((a) => (
            <li key={a} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="curriculum">
        <SectionHeader
          eyebrow="المنهج الدراسي"
          title="المجالات المعرفية المعتمدة"
          description={curriculumNote}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {curriculum.map((d, i) => (
            <div key={d.title} className="card-elevated p-6">
              <div className="flex items-start gap-3">
                <span className="shrink-0 grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary text-xs font-extrabold">
                  {i + 1}
                </span>
                <h3 className="font-bold leading-7">{d.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {d.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm text-muted-foreground leading-7">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="assessment" className="bg-surface">
        <SectionHeader
          eyebrow="التقييم والنجاح"
          title="معايير التقييم ودرجة النجاح"
          description="نظام تقييم متكامل يجمع بين التقييمات التكوينية والاختبار النهائي الشامل."
        />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {assessmentRules.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm leading-7">{r}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-right text-sm">
            <thead className="bg-secondary/60">
              <tr>
                <th className="p-4 font-bold">#</th>
                <th className="p-4 font-bold">المحور</th>
                <th className="p-4 font-bold">عدد الأسئلة</th>
                <th className="p-4 font-bold">حد النجاح</th>
              </tr>
            </thead>
            <tbody>
              {blueprint.map((b) => (
                <tr key={b.n} className="border-t border-border">
                  <td className="p-4 text-muted-foreground">{b.n}</td>
                  <td className="p-4 font-medium">{b.domain}</td>
                  <td className="p-4">{b.q}</td>
                  <td className="p-4 text-muted-foreground">{b.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="appeals">
        <SectionHeader
          eyebrow="سياسة الطعن"
          title="الطعن في نتائج التقييم"
          description="مسار واضح وعادل لمراجعة النتائج ضمن آجال محددة."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card-elevated p-6">
            <h3 className="font-bold">أسباب قبول الطعن</h3>
            <ul className="mt-4 space-y-3">
              {appealGrounds.map((g) => (
                <li key={g} className="flex gap-2 text-sm text-muted-foreground leading-7">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-elevated p-6">
            <h3 className="font-bold">القرارات المحتملة</h3>
            <ul className="mt-4 space-y-3">
              {appealOutcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-muted-foreground leading-7">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {appealSteps.map((s) => (
            <div key={s.phase} className="card-elevated p-6">
              <span className="badge-soft">{s.time}</span>
              <h3 className="mt-3 font-bold leading-7">{s.phase}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-7">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-bold">حقول نموذج طلب الاستئناف</h3>
            <ul className="mt-4 space-y-3">
              {appealFormFields.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground leading-7">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-bold">ملاحظات مهمة</h3>
            <ul className="mt-4 space-y-3">
              {appealNotes.map((n) => (
                <li key={n} className="flex gap-2 text-sm text-muted-foreground leading-7">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}