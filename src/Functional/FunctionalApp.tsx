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
      case "favorites":
        return dog.isFavorite;
      case "unfavorites":
        return !dog.isFavorite;
    }
  });

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
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
      >
        <FunctionalDogs filteredDogs={filteredDogs} />
        {activeTabState === "create-dog" && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
