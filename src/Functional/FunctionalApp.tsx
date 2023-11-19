import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTabState, setActiveTabState] = useState<TActiveTab>("all-dogs");

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

  const getNumOfFilteredDogs = (string: "favorited" | "unfavorited") =>
    allDogs.filter((dog) =>
      string === "favorited" ? dog.isFavorite : !dog.isFavorite
    ).length;

  const fetchData = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  const postDog = (dog: Omit<Dog, "id">) => {
    return Requests.postDog(dog).then(fetchData);
  };

  const deleteDog = (id: number) => {
    return Requests.deleteDog(id).then(fetchData);
  };

  const updateDog = (
    dogInfo: Omit<Dog, "id" | "name" | "description" | "image">,
    id: number
  ) => {
    return Requests.updateDog(dogInfo, id).then(fetchData);
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
        getNumOfFilteredDogs={getNumOfFilteredDogs}
      >
        <FunctionalDogs filteredDogs={filteredDogs} deleteDog={deleteDog} updateDog={updateDog} />
        {activeTabState === "create-dog" && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
