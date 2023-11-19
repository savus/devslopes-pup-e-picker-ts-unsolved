// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TActiveTab } from "../types";

export const FunctionalSection = ({
  children,
  activeTabState,
  setActiveTabState,
  getNumOfFilteredDogs,
}: {
  children: ReactNode;
  activeTabState: TActiveTab;
  setActiveTabState: (tabState: TActiveTab) => void;
  getNumOfFilteredDogs: (string: "favorited" | "unfavorited") => number;
}) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
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
};
