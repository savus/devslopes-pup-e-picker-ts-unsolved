import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  filteredDogs: Dog[];
  updateDog: (
    dogInfo: Omit<Dog, "name" | "description" | "image">
  ) => Promise<unknown>;
  deleteDog: (id: number) => Promise<unknown>;
  isLoading: boolean;
}> {
  render() {
    const { filteredDogs, updateDog, deleteDog, isLoading } = this.props;
    return (
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
              updateDog({ id: dog.id, isFavorite: true });
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
