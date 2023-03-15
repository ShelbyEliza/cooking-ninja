import "../pages/create-update/TagsRating.css";

import { useTheme } from "../hooks/useTheme";
const tagList = [
  "Comfort",
  "American",
  "Dessert",
  "Breakfast",
  "Salad",
  "Soup",
  "Baking",
  "Sandwich",
  "Drinks",
  "Holiday",
  "Sides",
  "Vegetables",
  "Fruity",
  "Asian",
  "Middle-Eastern",
  "Meat",
  "Snack",
  "Kid-Friendly",
  "Spring",
  "Summer",
  "Fall",
  "Winter",
  "Fried",
];
export default function Tags({ handleTags, tags }) {
  const { mode, color } = useTheme();
  return (
    <fieldset className={`tag-container tag-${mode}-${color.name}`}>
      <legend>Tags</legend>
      <div className="tag-list">
        {tagList.map((tag) => {
          let checked = false;
          if (tags && tags.length > 0 && tags.includes(tag)) {
            checked = true;
          }
          return (
            <div key={tag.toLowerCase()} className="tag-option">
              <input
                type="checkbox"
                id={tag.toLowerCase()}
                onChange={(e) => handleTags(e)}
                value={tag}
                defaultChecked={checked ? "checked" : ""}
              />
              <label htmlFor={tag.toLowerCase()}>{tag}</label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
