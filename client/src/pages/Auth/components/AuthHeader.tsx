interface Props {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: Props) {
  return (
    <div className="auth-header mb-4 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        AcadHub
      </p>
      <div className="mt-2 border-b border-slate-200 pb-3">
        <h1 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          {title === "Welcome Back" ? "Client Login" : title}
        </h1>
        <span className="mx-auto mt-2 block h-px w-10 bg-slate-900" />
        <p className="mt-2 text-[11px] leading-snug text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}