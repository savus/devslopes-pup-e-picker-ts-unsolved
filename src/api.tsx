import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, "id">): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`, {
      method: "POST",
      body: JSON.stringify(dog),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json()),

  // should delete a dog from the database
  deleteDog: (id: number): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => response.json()),

  updateDog: (
    dogInfo: Omit<Dog, "name" | "description" | "image">
  ): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs/${dogInfo.id}`, {
      method: "PATCH",
      body: JSON.stringify(dogInfo),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json()),

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
