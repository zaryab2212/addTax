import React, { useEffect, useState } from "react";
import { apiData } from "./apiData";
import CatData from "./components/CatData";
import "./App.css";
import { IoIosSearch } from "react-icons/io";
import Form from "./components/Form";

const App = () => {
  const [data, setData] = useState(apiData);
  const [checkedBoxCat, setcheckedBoxCat] = useState([]);
  const [checkedBox, setcheckedBox] = useState([]);

  let cat = [...new Set(data.map((item) => item?.category?.name))].reverse();

  // Check Box logic
  const handlecheckedBox = (e, isCategory) => {
    // verify is cliked on Category CheckBox / List and pushing cat list
    if (isCategory) {
      if (!checkedBoxCat.includes(e)) {
        setcheckedBoxCat([...checkedBoxCat, e]);
      } else {
        let fileredCat = checkedBoxCat.filter((i) => i !== e);
        setcheckedBoxCat([...fileredCat]);
      }

      // if click on item which does not have any category
      if (typeof e === "undefined") {
        // checking all item of no category
        if (!checkedBoxCat.includes(e)) {
          let noCategory = data
            .filter((e) => !checkedBox?.includes(e.id) && !e.category)
            .map((e) => e.id);

          setcheckedBox([...checkedBox, ...noCategory]);
        } else {
          // unChecking all item of no category
          let undefinedId = data.filter((e) => !e.category).map((e) => e.id); //category ids
          setcheckedBox(checkedBox.filter((e) => !undefinedId.includes(e))); // filter ids
        }
      } else {
        //if clicked on category
        if (isCategory && !checkedBoxCat.includes(e)) {
          let allcheckedBox = data
            .filter(
              (item) =>
                !checkedBox?.includes(item.id) &&
                item.category &&
                item.category.name === e
            )
            .map((e) => e.id); //geting all  ids of same cat

          setcheckedBox([...checkedBox, ...allcheckedBox]);
        } else {
          let catId = data
            .filter(
              (item) =>
                checkedBox?.includes(item.id) && e === item?.category?.name
            )
            .map((id) => id.id);

          setcheckedBox(checkedBox.filter((item) => !catId.includes(item)));
        }
      }
    }

    // logic if only one item click from a category
    if (!isCategory) {
      if (checkedBox.includes(e)) {
        setcheckedBox(checkedBox.filter((i) => i !== e));
      } else {
        setcheckedBox([...checkedBox, e]);
      }
    }
  };

  return (
    <div className="main">
      <h2 className="heading">Add Tax</h2>
      <Form
        checkedBox={checkedBox}
        handlecheckedBox={handlecheckedBox}
        cat={cat}
        checkedBoxCat={checkedBoxCat}
        data={data}
        setcheckedBox={setcheckedBox}
      />
    </div>
  );
};

export default App;
