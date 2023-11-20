import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type State = {
  activeTabState: TActiveTab;
  allDogs: Dog[];
  isLoading: boolean;
};

export class ClassApp extends Component {
  state: State = {
    activeTabState: "all-dogs",
    allDogs: [],
    isLoading: false,
  };

  fetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => {
        this.setState({ allDogs: dogs });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  postDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    return Requests.postDog(dog)
      .then(() => {
        toast.success("Dog Created");
      })
      .then(this.fetchData);
  };

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    return Requests.deleteDog(id).then(this.fetchData);
  };

  updateDog = (
    dogInfo: Omit<Dog, "name" | "description" | "image">
  ) => {
    this.setState({ isLoading: true });
    return Requests.updateDog(dogInfo).then(this.fetchData);
  };

  getNumOfFilteredDogs = (string: "favorited" | "unfavorited") =>
    this.state.allDogs.filter((dog) =>
      string === "favorited" ? dog.isFavorite : !dog.isFavorite
    ).length;

  componentDidMount(): void {
    this.fetchData();
  }

  render() {
    const filteredDogs = this.state.allDogs.filter((dog) => {
      switch (this.state.activeTabState) {
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

    const { activeTabState, isLoading } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTabState={activeTabState}
          setActiveTabState={(activeTab) => {
            if (activeTab === activeTabState)
              return this.setState({ activeTabState: "all-dogs" });
            return this.setState({ activeTabState: activeTab });
          }}
          getNumOfFilteredDogs={this.getNumOfFilteredDogs}
        >
          <ClassDogs
            filteredDogs={filteredDogs}
            deleteDog={this.deleteDog}
            updateDog={this.updateDog}
            isLoading={isLoading}
          />
          {activeTabState === "create-dog" && (
            <ClassCreateDogForm postDog={this.postDog} isLoading={isLoading} />
          )}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
