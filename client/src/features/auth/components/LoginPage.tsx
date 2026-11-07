import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <Button size="sm" variant="outline" onClick={() => navigate("/")}>
            Вернуться на главную
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Вход</h1>
          <p className="mt-2 text-gray-600">Войдите в свой аккаунт</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loginMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loginMutation.isPending ? "Вход..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <span
            onClick={() => navigate("/register")}
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  );
}
