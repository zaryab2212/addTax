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

  const handlecheckedBox = (e, isCategory) => {
    if (isCategory) {
      if (!checkedBoxCat.includes(e)) {
        setcheckedBoxCat([...checkedBoxCat, e]);
      } else {
        let fileredCat = checkedBoxCat.filter((i) => i !== e);
        setcheckedBoxCat([...fileredCat]);
      }

      if (typeof e === "undefined") {
        if (!checkedBoxCat.includes(e)) {
          let noCategory = data.filter((e) => {
            if (!checkedBox?.includes(e.id) && !e.category) {
              return e;
            }
          });

          setcheckedBox([...checkedBox, ...noCategory.map((e) => e.id)]);
        } else {
          let undefinedId = data.filter((e) => {
            if (!e.category) {
              return e;
            }
          });
          let undefinedIds = undefinedId.map((e) => e.id);
          setcheckedBox(checkedBox.filter((e) => !undefinedIds.includes(e)));
        }
      } else {
        if (isCategory && !checkedBoxCat.includes(e)) {
          let allcheckedBox = data.filter((item) => {
            if (
              !checkedBox?.includes(item.id) &&
              item.category &&
              item.category.name === e
            ) {
              return item.id;
            }
          });

          setcheckedBox([...checkedBox, ...allcheckedBox.map((e) => e.id)]);
        } else {
          let catId = data.filter((item) => {
            if (checkedBox?.includes(item.id) && e === item?.category?.name) {
              return item.id;
            }
          });
          let catIds = catId.map((id) => id.id);

          setcheckedBox(
            checkedBox.filter((item) => {
              if (!catIds.includes(item)) {
                return item;
              }
            })
          );
        }
      }
    }

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
