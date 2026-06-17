import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-100 mb-4">404</p>
        <h1 className="text-lg font-semibold text-gray-900 mb-2">Page not found</h1>
        <p className="text-sm text-gray-500 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link href="/dashboard" className="btn-primary">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
