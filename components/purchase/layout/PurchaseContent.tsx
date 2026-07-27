type PurchaseContentProps = {
  children: React.ReactNode;
  summary: React.ReactNode;
};

export default function PurchaseContent({
  children,
  summary,
}: PurchaseContentProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>{children}</div>

      <aside className="lg:sticky lg:top-24 h-fit">
        {summary}
      </aside>
    </div>
  );
}