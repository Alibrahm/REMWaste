// src/app/not-found.tsx 
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-[#0037c1] drop-shadow-lg">
          404
        </h1>
        <p className="text-3xl sm:text-4xl font-bold mt-4 mb-2">
          Page Not Found
        </p>
        <p className="text-lg sm:text-xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-[#0037c1] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Go to Homepage &rarr;
        </Link>
      </div>
    </main>
  );
}