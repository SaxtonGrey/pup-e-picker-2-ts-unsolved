import { Dog } from "./types";

const baseUrl = "http://localhost:3000/dogs";

const getAllDogs = (): Promise<Dog[]> => {
  return fetch(`${baseUrl}`).then((response) => response.json());
};

const postDog = (newDog: Omit<Dog, "id">): Promise<Dog> => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then((response) => response.json());
};

const deleteDogRequest = (id: number): Promise<Dog> => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
};

const patchFavoriteForDog = (newDogData: Dog, id: number): Promise<Dog> => {
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
    .catch((error) => {
      throw error;
    });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
