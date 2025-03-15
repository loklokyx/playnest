import { FaBeer } from "react-icons/fa";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Next.js + Tailwind + TanStack!
          </h1>
          <div className="mt-4">
            <FaBeer size={50} />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-center text-gray-600">
          &copy; 2025 PlayNest. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
