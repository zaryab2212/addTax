import React from "react";

const CatData = ({ item, cat, handlecheckedBox, checkedBox }) => {
  return (
    <div>
      {cat === item?.category?.name && (
        <div>
          <input
            checked={checkedBox.includes(item.id)}
            type="checkbox"
            onChange={() => handlecheckedBox(item.id, (cat = false))}
          />
          <span>{item.name} </span>
        </div>
      )}
    </div>
  );
};

export default CatData;
