import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center gap-2 px-5 py-10 bg-white">
      <Image src="/logo.svg" alt="App Logo" width={37} height={34} priority />
      <h1 className="text-2xl">
        Brains<span className="text-blue-01">Mate</span>
      </h1>
    </div>
  );
}
