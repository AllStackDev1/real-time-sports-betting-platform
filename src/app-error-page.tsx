import { useRouteError } from "react-router-dom";

interface RouteError {
  data: string;
  error: Error;
  message?: string;
  status: number;
  statusText: string;
  internal: boolean;
}

export default function AppErrorPage() {
  const routeError = useRouteError() as RouteError;
  const errorMessage = routeError.data || routeError?.message || "Something went wrong";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{routeError.status === 404 ? "Page " + routeError.statusText : "Oops!"}</h2>
        <p className="text-gray-700 mb-4">{errorMessage}</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
