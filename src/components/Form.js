import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CatData from "./CatData";
import { IoIosSearch } from "react-icons/io";

const Form = ({
  handlecheckedBox,
  cat,
  checkedBoxCat,
  data,
  setcheckedBox,
  checkedBox,
}) => {
  //  validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    rate: Yup.number().required("Required"),
    radioItems: Yup.string(),
    allItems: Yup.string(),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      rate: 0,
      radioItems: "some",
    },
    validationSchema,

    //form Submmition
    onSubmit: (values) => {
      if (values.radioItems === "all") {
        setcheckedBox(data.map((e) => e.id));
      }
      console.log(
        JSON.stringify({
          applicable_items:
            values.radioItems === "all"
              ? data.map((e) => e.id)
              : [...checkedBox],
          applied_to: values.radioItems,
          name: values.name,
          rate: values.rate,
        })
      );
    },
  });

  useEffect(() => {
    setcheckedBox([]);
    console.log(checkedBox);
  }, []);
  return (
    <div>
      {" "}
      <form onSubmit={formik.handleSubmit}>
        {/* Input Area */}
        <div className="tax-input-div">
          <div style={{ width: "100%" }}>
            <input
              className="tax-input"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </div>

          <div
            style={{ width: "100%", flexBasis: "45%", position: "relative" }}
          >
            {/* <div style={{ position: "relative" }}> */}
            <input
              className="tax-input"
              id="rate"
              name="rate"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rate}
            />
            <span
              style={{
                marginLeft: "-2rem",
                position: "absolute",
                top: ".5rem",
              }}
            >
              %
            </span>
            {formik.touched.rate && formik.errors.rate ? (
              <div style={{ color: "red" }}>{formik.errors.rate}</div>
            ) : null}
            {/* </div> */}
          </div>
        </div>

        {/* Radio Buttons */}
        <div className="radio-div">
          <div>
            <input
              className="radio-btn"
              id="allItems"
              name="radioItems"
              type="radio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={"all"}
            />
            <label htmlFor="allItems">Apply to all items in collection</label>
          </div>
          <div>
            <input
              className="radio-btn"
              id="specificItems"
              name="radioItems"
              defaultChecked
              type="radio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={"some"}
            />
            <label htmlFor="specificItems">
              Apply to specific items in collection
            </label>
          </div>
        </div>

        {/* Search Area */}
        <hr style={{ margin: "1rem 0rem" }} />
        <div className="search-bar">
          <IoIosSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search items.."
          />
        </div>

        {/* maped data */}
        <div>
          <div style={{ marginTop: "1rem" }}>
            {cat.map((e, i) => (
              <div key={i}>
                <div className="cat-heading">
                  <input
                    type="checkbox"
                    onChange={() => handlecheckedBox(e, (cat = true))}
                    checked={checkedBoxCat.includes(e)}
                  />
                  <span> {e} </span>
                </div>
                <div className="cat-Data">
                  {data.map((item) => (
                    <div key={item.id} className="cat-data-items">
                      <CatData
                        handlecheckedBox={handlecheckedBox}
                        cat={e}
                        item={item}
                        setcheckedBox={setcheckedBox}
                        checkedBox={checkedBox}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ margin: "1rem 0rem" }} />

        {/* submit Button */}
        <div className="btn-div">
          <button
            className="-submitbtn"
            type="submit"
          >{`Apply tax to ${checkedBox.length} item(s)`}</button>{" "}
        </div>
      </form>
    </div>
  );
};

export default Form;
