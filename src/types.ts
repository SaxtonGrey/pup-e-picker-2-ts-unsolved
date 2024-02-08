import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type TSelectedComponent =
  | "dogs"
  | "favorited"
  | "unfavorited"
  | "createDogForm";

export type TDogProvider = {
  allDogs: Dog[];
  isLoading: boolean;
  postDog: (newDog: Omit<Dog, "id">) => Promise<void>;
  deleteDogRequest: (id: number) => Promise<void>;
  patchFavoriteDog: (newDogData: Dog, id: number) => Promise<void>;
  selectedComponent: TSelectedComponent;
  handleComponentChange: (componentName: TSelectedComponent) => void;
};
