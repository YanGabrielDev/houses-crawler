export interface PostBody {
    businessContext: "RENT" | "SALE";
    minPrice: number;
    maxPrice: number;
    pageSize?: number;
    coordinateLat: number;
    coordinateLng: number;
  }