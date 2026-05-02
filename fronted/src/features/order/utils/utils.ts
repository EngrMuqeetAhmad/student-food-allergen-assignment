import type { Order } from "../types/order.types";

export const sortOrdersByIdAsc = (orders?: Order[]) => {
  return [...(orders ?? [])].sort((a, b) => a.id - b.id);
};