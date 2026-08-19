import { createClient } from "@supabase/supabase-js"
import * as dotenv from "dotenv"

dotenv.config()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

async function seedDatabase() {
  console.log("Starting database seed...")

  // Seed site settings
  const { error: settingsError } = await supabase.from("site_settings").upsert([
    { key: "site_name", value: "AbaTools" },
    { key: "site_description", value: "منصة عربية للتدريب والاستشارات في التوحد وتحليل السلوك التطبيقي" },
    { key: "contact_email", value: "info@abatools.com" },
    { key: "contact_phone", value: "+212 6XX XXX XXX" },
    { key: "contact_address", value: "المغرب" },
  ])
  if (settingsError) console.error("Error seeding site settings:", settingsError)

  // Seed features
  const { error: featuresError } = await supabase.from("features").upsert([
    { title: "تدريب معتمد", description: "برامج تدريبية معتمدة دولياً في تحليل السلوك التطبيقي", icon: "BookOpen", order_index: 1, is_active: true },
    { title: "إشراف علمي", description: "إشراف مباشر من خبراء معتمدين في مجال التوحد و ABA", icon: "ShieldCheck", order_index: 2, is_active: true },
    { title: "دعم مستمر", description: "دعم نفسي وتدريبي للأسر والمتخصصين", icon: "HeartHandshake", order_index: 3, is_active: true },
    { title: "موارد تعليمية", description: "مكتبة شاملة من الأدوات والموارد التعليمية", icon: "Layers", order_index: 4, is_active: true },
  ])
  if (featuresError) console.error("Error seeding features:", featuresError)

  // Seed categories
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .upsert([
      { name: "أدوات تدريب", slug: "training-tools", description: "أدوات لتدريب الأطفال", is_active: true },
      { name: "موارد أسرية", slug: "family-resources", description: "موارد للأسر", is_active: true },
      { name: "حقيبة تدريب", slug: "training-kits", description: "حقائب تدريبية", is_active: true },
    ])
    .select()
  if (categoriesError) console.error("Error seeding categories:", categoriesError)

  // Seed products
  const { data: products, error: productsError } = await supabase.from("products").upsert([
    { title: "دليل الأسرة العملي PDF", description: "دليل شامل للأسر لتعامل مع الأطفال المصابين بالتوحد", price: 19, is_active: true },
    { title: "أوراق عمل التواصل", description: "مجموعة من أوراق العمل لتطوير مهارات التواصل", price: 12, is_active: true },
    { title: "بطاقات تعليمية قابلة للطباعة", description: "بطاقات تعليمية لتعليم المهارات الأساسية", price: 17, is_active: true },
    { title: "دفتر متابعة السلوك", description: "دفتر لتسجيل ومتابعة السلوك اليومي", price: 21, is_active: true },
    { title: "نماذج تقييم المهارات", description: "نماذج احترافية لتقييم مهارات الطفل", price: 15, is_active: true },
    { title: "حقيبة الاستشارات الأسرية", description: "حقيبة شاملة للاستشارات الأسرية", price: 39, is_active: true },
    { title: "حقيبة تدريب ABAT", description: "حقيبة تدريب كاملة لدورة ABAT", price: 49, is_active: true },
    { title: "دليل المعلم داخل الصف", description: "دليل عملي للمعلمين داخل الفصل الدراسي", price: 24, is_active: true },
  ]).select()
  if (productsError) console.error("Error seeding products:", productsError)

  // Seed product_categories relationships
  if (products && categories) {
    const { error: pcError } = await supabase.from("product_categories").upsert([
      { product_id: products[0].id, category_id: categories[0].id },
      { product_id: products[1].id, category_id: categories[0].id },
      { product_id: products[2].id, category_id: categories[0].id },
      { product_id: products[3].id, category_id: categories[1].id },
      { product_id: products[4].id, category_id: categories[1].id },
      { product_id: products[5].id, category_id: categories[1].id },
      { product_id: products[6].id, category_id: categories[2].id },
      { product_id: products[7].id, category_id: categories[2].id },
    ])
    if (pcError) console.error("Error seeding product_categories:", pcError)
  }

  // Seed courses
  const { data: courses, error: coursesError } = await supabase.from("courses").upsert([
    { title: "ABAT — Applied Behavior Analysis Technician", slug: "abat", description: "دورة تدريبية شاملة في تحليل السلوك التطبيقي", full_description: "دورة تدريبية متكاملة تأهلك للعمل كفني ABA معتمد", hours: "40 ساعة", price: 1000, status: "open", featured: true, is_active: true },
    { title: "QASP-S — Qualified Autism Specialist Practitioner", slug: "qasp-s", description: "تأهيل متخصص مؤهل في التوحد", hours: "60 ساعة", price: 1500, status: "upcoming", featured: false, is_active: true },
    { title: "QBA — Qualified Behavior Analyst", slug: "qba", description: "تحليل سلوك معتمد", hours: "80 ساعة", price: 2500, status: "upcoming", featured: false, is_active: true },
    { title: "RBT — Registered Behavior Technician", slug: "rbt", description: "فني سلوك مسجل", hours: "40 ساعة", price: 1000, status: "upcoming", featured: false, is_active: true },
    { title: "VB-MAPP — Verbal Behavior Milestones", slug: "vb-mapp", description: "تقييم وتدريب السلوك اللفظي", hours: "30 ساعة", price: 800, status: "upcoming", featured: false, is_active: true },
    { title: "PECS — Picture Exchange Communication System", slug: "pecs", description: "نظام تبادل الصور للتواصل", hours: "20 ساعة", price: 600, status: "upcoming", featured: false, is_active: true },
    { title: "FBA — Functional Behavior Assessment", slug: "fba", description: "تقييم السلوك الوظيفي", hours: "25 ساعة", price: 700, status: "upcoming", featured: false, is_active: true },
    { title: "PBS — Positive Behavior Support", slug: "pbs", description: "دعم السلوك الإيجابي", hours: "35 ساعة", price: 900, status: "upcoming", featured: false, is_active: true },
    { title: "DTT — Discrete Trial Training", slug: "dtt", description: "التدريب بالمحاولات المتقطعة", hours: "15 ساعة", price: 500, status: "upcoming", featured: false, is_active: true },
  ]).select()
  if (coursesError) console.error("Error seeding courses:", coursesError)

  // Seed services
  const { error: servicesError } = await supabase.from("services").upsert([
    { title: "للأسرة والطفل", description: "استشارات وبرامج تدريبية مخصصة للأسر لمساعدتهم في التعامل مع أطفالهم المصابين بالتوحد", icon: "HeartHandshake", is_active: true },
    { title: "للأخصائيين", description: "تدريب متقدم للأخصائيين في مجال تحليل السلوك التطبيقي", icon: "Users", is_active: true },
    { title: "للمؤسسات", description: "برامج مؤسسية مخصصة للمؤسسات التعليمية والطبية", icon: "Building2", is_active: true },
    { title: "الاستشارات", description: "استشارات فردية وجماعية مع خبراء معتمدين", icon: "MessageSquare", is_active: true },
    { title: "التدريب", description: "برامج تدريبية معتمدة دولياً", icon: "GraduationCap", is_active: true },
    { title: "التقييم", description: "تقييم شامل لمهارات الطفل وتطوير خطة علاجية", icon: "ClipboardList", is_active: true },
  ])
  if (servicesError) console.error("Error seeding services:", servicesError)

  // Seed blog posts
  const { error: blogError } = await supabase.from("blog_posts").upsert([
    { title: "مقدمة في تحليل السلوك التطبيقي", excerpt: "تعرف على أساسيات ABA وكيف يمكن أن تساعد الأطفال المصابين بالتوحد", content: "تحليل السلوك التطبيقي (ABA) هو علم يهتم بفهم السلوك البشري وتغييره...", status: "published", published_at: new Date().toISOString() },
    { title: "استراتيجيات التواصل مع الأطفال المصابين بالتوحد", excerpt: "أفضل الاستراتيجيات والطرق الفعالة لتحسين التواصل مع الأطفال", content: "التواصل هو أحد أكبر التحديات التي تواجه الأطفال المصابين بالتوحد...", status: "published", published_at: new Date().toISOString() },
    { title: "أهمية التدخل المبكر", excerpt: "لماذا يعتبر التدخل المبكر حاسماً في تحسين نتائج الأطفال", content: "التدخل المبكر هو المفتاح لتحقيق أفضل النتائج للأطفال المصابين بالتوحد...", status: "published", published_at: new Date().toISOString() },
    { title: "كيف تختار البرنامج التدريبي المناسب", excerpt: "نصائح لاختيار البرنامج التدريبي الأفضل لطفلك", content: "اختيار البرنامج التدريبي المناسب لطفلك هو قرار مهم...", status: "published", published_at: new Date().toISOString() },
    { title: "دور الأسرة في العملية العلاجية", excerpt: "كيف يمكن للأسرة المساهمة بشكل فعال في عملية العلاج", content: "الأسرة تلعب دوراً محورياً في نجاح أي برنامج علاجي...", status: "published", published_at: new Date().toISOString() },
    { title: "التحديات الشائعة وكيفية التغلب عليها", excerpt: "أبرز التحديات التي تواجه الأسر وكيفية التعامل معها", content: "رحلة التعامل مع التوحد مليئة بالتحديات...", status: "published", published_at: new Date().toISOString() },
  ])
  if (blogError) console.error("Error seeding blog posts:", blogError)

  // Seed testimonials
  const { error: testimonialsError } = await supabase.from("testimonials").upsert([
    { name: "أم محمد", role: "أم لطفل مصاب بالتوحد", quote: "البرنامج غير حياة ابني بشكل كبير. شكراً لكم على كل الدعم.", avatar_url: "", is_active: true },
    { name: "أخصائي سارة", role: "أخصائية سلوك تطبيقي", quote: "التدريب在这里 كان متميزاً ومفيداً جداً في تطوير مهاراتي.", avatar_url: "", is_active: true },
    { name: "مدير مؤسسة", role: "مدير مركز تأهيل", quote: "تعاوننا مع AbaTools ساعد في رفع مستوى الخدمات المقدمة.", avatar_url: "", is_active: true },
  ])
  if (testimonialsError) console.error("Error seeding testimonials:", testimonialsError)

  // Seed FAQ items
  const { error: faqError } = await supabase.from("faq_items").upsert([
    { question: "ما هو تحليل السلوك التطبيقي (ABA)؟", answer: "ABA هو علم يطبق مبادئ التعلم على تحسين السلوكيات المهمة اجتماعياً وتعلماً.", order_index: 1, is_active: true },
    { question: "كيف أبدأ في التسجيل في دورة؟", answer: "يمكنك التسجيل من خلال صفحة الدورات واختيار الدورة المناسبة ثم اتباع خطوات الدفع.", order_index: 2, is_active: true },
    { question: "هل البرامج معتمدة دولياً؟", answer: "نعم، جميع برامجنا معتمدة من الجهات الدولية المعنية.", order_index: 3, is_active: true },
    { question: "هل تقدمون استشارات أسرية؟", answer: "نعم، نقدم جلسات استشارية للأسر مع خبراء متخصصين.", order_index: 4, is_active: true },
  ])
  if (faqError) console.error("Error seeding FAQ items:", faqError)

  console.log("Database seed completed!")
}

seedDatabase().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
