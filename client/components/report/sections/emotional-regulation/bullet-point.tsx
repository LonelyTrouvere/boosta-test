export default function BulletPoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-2 h-2 shrink-0 rounded-full bg-blue-02 mt-2" />
      <p className="text-p text-dark-blue-03">{children}</p>
    </div>
  );
}
