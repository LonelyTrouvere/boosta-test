import Image from "next/image";

export default function Footer() {
  return (
    <div className="px-5 py-10 text-white bg-cyan rounded-tl-3xl rounded-tr-3xl flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="App Logo" width={37} height={34} priority />
        <h3 className="text-2xl">
          Brains<span className="text-blue-01">Mate</span>
        </h3>
      </div>
      <p className="text-sm">All rights reserved 2026</p>
    </div>
  );
}
