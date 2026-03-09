import { z } from "zod";

export const addToCartValidator = z.object({

  productId: z.string(),

  quantity: z.number().min(1)

});