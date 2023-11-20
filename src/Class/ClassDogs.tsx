import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  filteredDogs: Dog[];
  updateDog: (
    dogInfo: Omit<Dog, "id" | "name" | "description" | "image">,
    id: number
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
  }
}
