// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)

import { useDogs } from "../Providers/DogsProvider";
import { Dog } from "../types";
import { DogCard } from "./DogCard";

export const Dogs = () =>
  // no props allowed
  {
    const {
      allDogs,
      deleteDogRequest,
      isLoading,
      patchFavoriteDog,
      selectedComponent,
    } = useDogs();

    const handleTrashIconClick = (id: number) => {
      deleteDogRequest(id).catch((error) => console.error(error));
    };

    const handleHeartClick = (dog: Dog) => {
      patchFavoriteDog(dog, dog.id).catch((error) => console.error(error));
    };

    const filteredDogs = allDogs.filter((dog): boolean => {
      switch (selectedComponent) {
        case "favorited":
          return dog.isFavorite;
        case "unfavorited":
          return !dog.isFavorite;
        case "createDogForm":
          return false;
        case "dogs":
          return true;
        default:
          return true;
      }
    });

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            onTrashIconClick={() => handleTrashIconClick(dog.id)}
            onHeartClick={() => handleHeartClick(dog)}
            onEmptyHeartClick={() => handleHeartClick(dog)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  };
