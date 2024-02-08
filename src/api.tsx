import { Dog, dogSchema } from "./types";

const baseUrl = "http://localhost:3000/dogs";

const getAllDogs = (): Promise<Dog[]> => {
  return fetch(`${baseUrl}`)
    .then((response) => response.json())
    .then((data: Dog[]) => data.map((item) => dogSchema.parse(item)));
};

const postDog = (newDog: Omit<Dog, "id">): Promise<Dog> => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  })
    .then((response) => response.json())
    .then((data) => dogSchema.parse(data));
};

const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to delete the dog. Status: ${response.status}`);
    }
  });
};

const patchFavoriteForDog = (newDogData: Dog, id: number) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDogData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update the dog. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => dogSchema.parse(data));
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
