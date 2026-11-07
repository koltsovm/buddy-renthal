import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/authApi";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogin() {
  const navigate = useNavigate();
  const loginStore = useAuthStore.getState().login;

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data.data?.user) {
        loginStore(data.data.user);
        toast.success("Вход выполнен успешно");
        navigate("/groups/1");
      }
    },
    onError: () => {
      toast.error("Ошибка входа");
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const registerStore = useAuthStore.getState().register;

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data.data?.user) {
        registerStore(data.data.user);
        toast.success("Регистрация прошла успешно");
        navigate("/groups/1");
      }
    },
    onError: () => {
      toast.error("Ошибка регистрации");
    },
  });
}
