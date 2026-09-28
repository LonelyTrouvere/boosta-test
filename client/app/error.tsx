"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="px-3 md:px-5 flex flex-col flex-1 pb-3 md:pb-5 items-center justify-center">
      <h2 className="text-4xl font-black text-dark-blue-02 mb-4">
        Something went wtong
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Try again in a few minutes
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-dark-blue-02 text-white rounded-xl hover:bg-dark-blue-03 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
