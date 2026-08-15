import z from "zod";

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(30, "Tên danh mục tối đa 30 ký tự"),

  slug: z.string().min(1, "Tên slug không được để trống"),

  iconName: z.string(),
});

export default updateCategorySchema;
