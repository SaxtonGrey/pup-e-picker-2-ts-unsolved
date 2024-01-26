import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { useDogs } from "../Providers/DogsProvider";

export const CreateDogForm = () => {
  const { PostDog } = useDogs();
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [pictureValue, setPictureValue] = useState<string>(
    dogPictures.BlueHeeler
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDog: Dog = {
      name: nameInput,
      description: descriptionInput,
      image: pictureValue,
      isFavorite: false,
      id: 0,
    };
    PostDog(newDog);
    setNameInput("");
    setDescriptionInput("");
    setPictureValue(dogPictures.BlueHeeler);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
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
        disabled={false}
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
