import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  filteredDogs,
  deleteDog,
  updateDog,
  isLoading,
}: {
  filteredDogs: Dog[];
  deleteDog: (id: number) => Promise<unknown>;
  updateDog: (
    dogInfo: Omit<Dog, "id" | "name" | "description" | "image">,
    id: number
  ) => Promise<unknown>;
  isLoading: boolean;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => {
            deleteDog(dog.id);
          }}
          onHeartClick={() => {
            updateDog({ isFavorite: false }, dog.id);
          }}
          onEmptyHeartClick={() => {
            updateDog({ isFavorite: true }, dog.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
