import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Dog, TDogProvider } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { TSelectedComponent } from "../types";

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<TSelectedComponent>("dogs");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleComponentChange = (componentName: TSelectedComponent) => {
    if (selectedComponent === componentName) {
      setSelectedComponent("dogs");
    } else setSelectedComponent(componentName);
  };

  const refetch = async () => {
    try {
      const data: Dog[] = await Requests.getAllDogs();
      setAllDogs(data);
    } catch (error) {
      console.error("Error fetching data");
    }
  };

  useEffect(() => {
    refetch().catch((error) => console.error("Error Fetching: ", error));
  }, []);

  const postDog = async (input: Omit<Dog, "id">) => {
    setAllDogs((prevDogs) => [...prevDogs, { ...input, id: prevDogs.length }]);
    setIsLoading(true);
    try {
      await Requests.postDog(input);
      toast.success("Dog Created Successfully!");
    } catch (error) {
      setAllDogs((prevDogs) => prevDogs.slice(0, -1));
      toast.error("Failed to Create Dog");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDogRequest = async (id: number) => {
    const currentDogs = allDogs; // To revert state back too in event of failed fetch
    setAllDogs((prevDogs) => prevDogs.filter((d) => d.id != id));
    try {
      await Requests.deleteDogRequest(id);
      toast.success("Dog Deleted Successfully!");
    } catch (error) {
      setAllDogs(currentDogs);
      toast.error("Error deleting dog");
    }
  };

  const patchFavoriteDog = async (dog: Dog) => {
    setAllDogs((prevDogs) =>
      prevDogs.map((d) =>
        d.id === dog.id ? { ...d, isFavorite: !d.isFavorite } : d
      )
    );
    try {
      await Requests.patchFavoriteForDog(
        { ...dog, isFavorite: !dog.isFavorite },
        dog.id
      );
    } catch (error) {
      setAllDogs((prevDogs) =>
        prevDogs.map((d) =>
          d.id === dog.id ? { ...d, isFavorite: !d.isFavorite } : d
        )
      );
      toast.error("Error updating dog");
    }
  };

  return (
    <DogContext.Provider
      value={{
        allDogs,
        isLoading,
        postDog,
        deleteDogRequest,
        patchFavoriteDog,
        selectedComponent,
        handleComponentChange,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);
