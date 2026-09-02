import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow ? <span className="badge-soft mb-3">{eyebrow}</span> : null}
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base md:text-lg text-muted-foreground leading-8">{description}</p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}