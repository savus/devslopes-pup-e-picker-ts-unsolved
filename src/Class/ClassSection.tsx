// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, TActiveTab } from "../types";

export class ClassSection extends Component<{
  children: ReactNode;
  activeTabState: TActiveTab;
  setActiveTabState: (activeTab: TActiveTab) => void;
  getNumOfFilteredDogs: (string: "favorited" | "unfavorited") => number;
}> {
  render() {
    const {
      children,
      activeTabState,
      setActiveTabState,
      getNumOfFilteredDogs,
    } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                activeTabState === "favorited" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTabState("favorited");
              }}
            >
              favorited ( {getNumOfFilteredDogs("favorited")} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeTabState === "unfavorited" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTabState("unfavorited");
              }}
            >
              unfavorited ( {getNumOfFilteredDogs("unfavorited")} )
            </div>
            <div
              className={`selector ${
                activeTabState === "create-dog" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTabState("create-dog");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
