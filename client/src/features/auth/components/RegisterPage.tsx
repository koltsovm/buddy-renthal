import React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegister } from "@/hooks/useAuth";
import { type RegisterRequest } from "@/lib/authApi";
import { Button } from "@/components/ui/button";

const nameSchema = z.string().min(2, "Имя должно содержать минимум 2 символа");
const emailSchema = z.string().email("Введите корректный email");
const passwordSchema = z
  .string()
  .min(16, "Пароль должен быть не короче 16 символов")
  .refine(
    (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
    "Пароль должен содержать хотя бы один спецсимвол"
  );

const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Пароли не совпадают",
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [formData, setFormData] = React.useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const validateField = (name: keyof RegisterFormData, value: string) => {
    const fieldSchemas: Record<keyof RegisterFormData, z.ZodTypeAny> = {
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: z.string(),
    };
    const fieldSchema = fieldSchemas[name];
    if (!fieldSchema) return undefined;
    const result = fieldSchema.safeParse(value);
    return result.success ? undefined : result.error.errors[0]?.message;
  };

  const handleChange = (name: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => {
      if (error) {
        return { ...prev, [name]: error };
      }
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const validateForm = (): boolean => {
    const result = registerSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }
    const newErrors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      newErrors[field] = err.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    const registerData: RegisterRequest = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    registerMutation.mutate(registerData);
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
          <h1 className="text-2xl font-bold text-gray-900">Регистрация</h1>
          <p className="mt-2 text-gray-600">Создайте свой аккаунт</p>
        </div>

        {serverError && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
            {serverError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Имя пользователя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ivan@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Минимум 16 символов и хотя бы один спецсимвол
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Подтверждение пароля
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              registerMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {registerMutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            Войти
          </span>
        </p>
      </div>
    </div>
  );
}
