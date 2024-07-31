interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  ingredients: Map<string, number>;
  reviews: {
    rating: number;
    count: number;
  };
  howToUse: string;
}
