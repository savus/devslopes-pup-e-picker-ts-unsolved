import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTabState, setActiveTabState] = useState<TActiveTab>("all-dogs");
  const [isLoading, setIsLoading] = useState(false);

  const filteredDogs = allDogs.filter((dog) => {
    switch (activeTabState) {
      case "all-dogs":
        return true;
      case "create-dog":
        return false;
      case "favorited":
        return dog.isFavorite;
      case "unfavorited":
        return !dog.isFavorite;
    }
  });

  const numOfFavorited = allDogs.filter((dog) => dog.isFavorite).length;
  const numOfUnfavorited = allDogs.length - numOfFavorited;

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => {
        toast.success("Dog Created");
      })
      .then(fetchData);
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    return Requests.deleteDog(id).then(fetchData);
  };

  const updateDog = (
    dogInfo: Omit<Dog, "name" | "description" | "image">
  ) => {
    setIsLoading(true);
    return Requests.updateDog(dogInfo).then(fetchData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTabState={activeTabState}
        setActiveTabState={(tabState) => {
          if (tabState === activeTabState) return setActiveTabState("all-dogs");
          return setActiveTabState(tabState);
        }}
        numOfFavorited={numOfFavorited}
        numOfUnFavorited={numOfUnfavorited}
      >
        <FunctionalDogs
          filteredDogs={filteredDogs}
          deleteDog={deleteDog}
          updateDog={updateDog}
          isLoading={isLoading}
        />
        {activeTabState === "create-dog" && (
          <FunctionalCreateDogForm postDog={postDog} isLoading={isLoading} />
        )}
      </FunctionalSection>
    </div>
  );
}
