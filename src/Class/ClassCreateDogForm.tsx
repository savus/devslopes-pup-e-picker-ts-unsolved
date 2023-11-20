import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<{
  postDog: (dog: Omit<Dog, "id">) => Promise<unknown>;
  isLoading: boolean;
}> {
  state = {
    dogNameInput: "",
    dogDescriptionInput: "",
    dogImageInput: defaultSelectedImage,
  };

  resetValues = () => {
    this.setState({
      dogNameInput: "",
      dogDescriptionInput: "",
      dogImageInput: defaultSelectedImage,
    });
  };

  render() {
    const { postDog, isLoading } = this.props;
    const { dogNameInput, dogDescriptionInput, dogImageInput } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          postDog({
            name: dogNameInput,
            description: dogDescriptionInput,
            image: dogImageInput,
            isFavorite: false,
          });
          this.resetValues();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={dogNameInput}
          onChange={(e) => {
            this.setState({ dogNameInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={dogDescriptionInput}
          onChange={(e) => {
            this.setState({ dogDescriptionInput: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={dogImageInput}
          onChange={(e) => {
            this.setState({ dogImageInput: e.target.value });
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
