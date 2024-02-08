import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { useDogs } from "../Providers/DogsProvider";

export const CreateDogForm = () => {
  const { postDog, isLoading } = useDogs();
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [pictureValue, setPictureValue] = useState<string>(
    dogPictures.BlueHeeler
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDog: Dog = {
      name: nameInput,
      description: descriptionInput,
      image: pictureValue,
      isFavorite: false,
      id: 0,
    };
    try {
      await postDog(newDog);
    } catch (error) {
      console.error("Error Posting Dog: ", error);
    }
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e).catch((error) =>
          console.error("Error Handling Submit: ", error)
        );
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={descriptionInput}
        onChange={(e) => {
          setDescriptionInput(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setPictureValue(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option
              value={pictureValue}
              key={pictureValue}
              disabled={isLoading}
            >
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
