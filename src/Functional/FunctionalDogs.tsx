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
    dogInfo: Omit<Dog, "name" | "description" | "image">
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
            updateDog({ id: dog.id, isFavorite: false });
          }}
          onEmptyHeartClick={() => {
            updateDog({ id: dog.id, isFavorite: true } );
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
