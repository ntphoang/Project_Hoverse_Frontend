import z from "zod";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Mật khẩu cũ không được để trống"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Không được để trống"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp!",
    path: ["confirmPassword"],
  });

export default changePasswordSchema;
