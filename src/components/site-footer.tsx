import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/abatools-logo-stacked.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-soft">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="AbaTools" className="h-24 w-auto" width={160} height={96} />
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            منصة عربية للتدريب والاستشارات والموارد الرقمية في التوحد وتحليل السلوك التطبيقي،
            بإشراف الخبيرة كوثر سامي، محللة سلوك معتمدة QBA وأخصائية نفسية تربوية.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="badge-soft">QBA معتمدة</span>
            <span className="badge-soft">محللة سلوك</span>
            <span className="badge-gold">إشراف علمي</span>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-foreground">استكشف</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">من نحن</Link></li>
            <li><Link to="/services" className="hover:text-primary">الخدمات والاستشارات</Link></li>
            <li><Link to="/courses" className="hover:text-primary">الدورات</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">السعر والتسجيل</Link></li>
            <li><Link to="/resources" className="hover:text-primary">الموارد الرقمية</Link></li>
            <li><Link to="/shop" className="hover:text-primary">المتجر</Link></li>
            <li><Link to="/refund-policy" className="hover:text-primary">سياسة استرجاع الأموال</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-foreground">تواصل</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>kaoutarsami@abatools.info</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span dir="ltr">+212 6 54 24 48 44</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>منصة رقمية — تخدم العالم العربي</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AbaTools — جميع الحقوق محفوظة.</p>
          <p>بإشراف علمي من الخبيرة كوثر سامي — QBA</p>
        </div>
      </div>
    </footer>
  );
}