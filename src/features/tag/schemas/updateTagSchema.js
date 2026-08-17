import z from "zod";

const updateTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tên tag không được bỏ trống!")
    .max(30, "Tên tag tối đa 30 ký tự!"),

  iconName: z
    .string()
    .min(1, "Icon name không được bỏ trống!")
    .max(20, "Icon name tối da 20 ký tự"),
});

export default updateTagSchema;
