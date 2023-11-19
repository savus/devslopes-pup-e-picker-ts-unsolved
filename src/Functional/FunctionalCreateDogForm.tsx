import { dogPictures } from "../dog-pictures";
import { useState } from "react";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  postDog,
}: {
  postDog: (dog: Omit<Dog, "id">) => void;
}) => {
  const [dogNameInput, setDogNameInput] = useState("");
  const [dogDescriptionInput, setDogDescriptionInput] = useState("");
  const [dogImageInput, setDogImageInput] = useState(defaultSelectedImage);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        postDog({
          name: dogNameInput,
          description: dogDescriptionInput,
          image: dogImageInput,
          isFavorite: false,
        });
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={dogNameInput}
        onChange={(e) => setDogNameInput(e.target.value)}
        disabled={false}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        value={dogDescriptionInput}
        onChange={(e) => setDogDescriptionInput(e.target.value)}
        disabled={false}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={dogImageInput}
        onChange={(e) => setDogImageInput(e.target.value)}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
