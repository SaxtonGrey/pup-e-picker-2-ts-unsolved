import { ReactNode } from "react";
import { useDogs } from "../Providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs, selectedComponent, handleComponentChange } = useDogs();
  const favoriteCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteCount = allDogs.filter((dog) => !dog.isFavorite).length;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              selectedComponent === "favorited" ? "active" : ""
            }`}
            onClick={() => {
              handleComponentChange("favorited");
            }}
          >
            favorited ( {favoriteCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              selectedComponent === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              handleComponentChange("unfavorited");
            }}
          >
            unfavorited ( {unfavoriteCount} )
          </div>
          <div
            className={`selector ${
              selectedComponent === "createDogForm" ? "active" : ""
            }`}
            onClick={() => {
              handleComponentChange("createDogForm");
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
