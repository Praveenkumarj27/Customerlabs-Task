import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import "./Popup.css";
import { MdDelete } from "react-icons/md";
import { dropdownData } from "../data";
function Popup({ handlePopup }) {
  let [schema, setSchema] = useState([]);
  let formik = useFormik({
    initialValues: {
      segment_name: "",
      schema: [],
      select: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.segment_name) {
        errors.segment_name = "Please enter segment_name";
      }
      if (schema.length === 0) {
        errors.schema = "Please enter schema";
      }
      return errors;
    },
    onSubmit: async (values) => {
      delete values.select;
      dropdownData.forEach((item) => {
        if (schema.includes(item.value)) {
          let obj = {};
          obj[item.value] = item.label;
          values.schema.push(obj);
        }
      });
      try {
        await axios.post("https://webhook.site/0a17417d-9c05-43e9-bf3e-a59c7a8a6c39", values);
        alert("Data Posted Successfully");
        resetForm();
      } catch (error) {
        console.log(error);
      }

      // console.log(values);
    },
  });
  let resetForm = () => {
    setSchema([]);
    formik.resetForm({
      values: {
        segment_name: "",
        schema: [],
        select: "",
      },
    });
    handlePopup();
  };
  let addSchema = (ele) => {
    if (!ele == "") {
      setSchema([...schema, ele]);
      formik.values.select = "";
    } else {
      alert("Select any Schema");
    }
  };
  let handleChange = (e, ele) => {
    let index = schema.indexOf(ele);
    if (schema.includes(e.target.value)) {
      alert(`${e.target.value} is already added to schema`);
    } else {
      schema.splice(index, 1, e.target.value);
      setSchema([...schema]);
    }
  };
  let handleDelete = (ele) => {
    let index = schema.indexOf(ele);
    schema.splice(index, 1);
    setSchema([...schema]);
  };
  return (
    <>
      <div className="popup-wrapper">
        <div
          className="popup-nav"
          onClick={() => {
            handlePopup();
            resetForm();
          }}
        >
          &nbsp; <span className="symbol">{`<`}</span> &nbsp; Saving Segment
        </div>
        <div className="popup-container">
          <form className="popup-form" onSubmit={formik.handleSubmit}>
            <label for="name-segment">Enter the Name of the Segment</label>
            <input
              type="text"
              placeholder="Name of the Segment"
              id="name-segment"
              name="segment_name"
              value={formik.values.segment_name}
              onChange={formik.handleChange}
            />
            <label>
              To save your segment, you need to add the schemas to build the
              query
            </label>
            {schema.length != 0 ? (
              <div className="border">
                {schema.map((sitem, key) => {
                  return (
                    <>
                      <div className="schema-wrapper">
                        <select
                          // name="schema"
                          id="schema2"
                          onChange={(e) => handleChange(e, sitem)}
                          value={sitem}
                          key={key}
                        >
                          {dropdownData.map((item, key) => {
                            return (
                              <option value={`${item.value}`} key={key}>
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                        <div>
                          <MdDelete
                            onClick={() => handleDelete(sitem)}
                            style={{ fontSize: "25px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : null}

            <select
              name="select"
              id="schema"
              onChange={formik.handleChange}
              value={formik.values.select}
            >
              <option>Add schema to segment</option>
              {dropdownData
                .filter((item) => {
                  if (!schema.includes(item.value)) {
                    return item;
                  }
                })
                .map((item, key) => {
                  return (
                    <option key={key} value={`${item.value}`}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <a className="link" onClick={() => addSchema(formik.values.select)}>
              +Add new schema
            </a>
            <div className="btn-grp">
              <button className="sub-btn" type="submit">
                Save the Segment
              </button>
              <button
                className="can-btn"
                type="cancel"
                onClick={() => {
                  handlePopup();
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Popup;
