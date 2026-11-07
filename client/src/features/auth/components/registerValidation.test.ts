import { describe, it, expect } from "vitest";
import { z } from "zod";

const nameSchema = z.string().min(2, "Имя должно содержать минимум 2 символа");
const emailSchema = z.string().email("Введите корректный email");
const passwordSchema = z
  .string()
  .min(16, "Пароль должен быть не короче 16 символов")
  .refine(
    (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
    "Пароль должен содержать хотя бы один спецсимвол"
  );

describe("register validation schemas", () => {
  describe("name", () => {
    it("should accept name with 2+ characters", () => {
      expect(() => nameSchema.parse("Иван")).not.toThrow();
      expect(() => nameSchema.parse("И")).toThrow();
      expect(() => nameSchema.parse("")).toThrow();
    });
  });

  describe("email", () => {
    it("should accept valid email", () => {
      expect(() => emailSchema.parse("ivan@example.com")).not.toThrow();
    });

    it("should reject invalid email", () => {
      expect(() => emailSchema.parse("not-an-email")).toThrow();
      expect(() => emailSchema.parse("")).toThrow();
    });
  });

  describe("password", () => {
    it("should accept password with 16+ chars and special symbol", () => {
      expect(() => passwordSchema.parse("Password1234567!")).not.toThrow();
      expect(() => passwordSchema.parse("veryLongPassw0rd!")).not.toThrow();
    });

    it("should reject password shorter than 16 chars", () => {
      expect(() => passwordSchema.parse("Short1!")).toThrow();
      expect(() => passwordSchema.parse("Password123!")).toThrow();
    });

    it("should reject password without special symbol", () => {
      expect(() => passwordSchema.parse("Password12345678")).toThrow();
    });
  });

  describe("combined register schema", () => {
    const registerSchema = z.object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Пароли не совпадают",
    });

    it("should accept valid registration data", () => {
      expect(() =>
        registerSchema.parse({
          name: "Иван Иванов",
          email: "ivan@example.com",
          password: "SecurePass123456!",
          confirmPassword: "SecurePass123456!",
        })
      ).not.toThrow();
    });

    it("should reject mismatched passwords", () => {
      expect(() =>
        registerSchema.parse({
          name: "Иван Иванов",
          email: "ivan@example.com",
          password: "SecurePass123456!",
          confirmPassword: "OtherPass123456!",
        })
      ).toThrow();
    });

    it("should reject short name", () => {
      expect(() =>
        registerSchema.parse({
          name: "И",
          email: "ivan@example.com",
          password: "SecurePass123456!",
          confirmPassword: "SecurePass123456!",
        })
      ).toThrow();
    });
  });
});
