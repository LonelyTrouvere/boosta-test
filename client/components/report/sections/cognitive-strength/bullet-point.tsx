import Image from "next/image";

export default function BulletPoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Image
        src="/bullet-point.svg"
        alt="Bullet Point"
        width={24}
        height={24}
      />
      <p className="text-p text-dark-blue-03">{children}</p>
    </div>
  );
}
