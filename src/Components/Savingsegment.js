import { ArrowBackIos, Remove } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import "../CSS/Savingsegment.css";

function Savingsegment({ appear, setappear }) {
  const [values, setvalues] = useState([]);

  const [select, setselect] = useState([]);

  const formik = useFormik({
    initialValues: {
      select: "",
      schema: [],
      segment_name: "",
    },
    onSubmit: async (val) => {
      try {
        delete val.select;

        values.forEach((x) => {
          var obj = {};
          obj[x.value] = x.label;
          val.schema.push(obj);
        });
        axios.post(
          `https://webhook.site/0a17417d-9c05-43e9-bf3e-a59c7a8a6c39`,
          { segment_name: val.segment_name, schema: val.schema }
        );
        alert(" Posted successfully");
        val.schema = [];
      } catch (err) {
        alert("Posting unsuccessfull");
        console.log(err);
      }
    },
  });

  const bool = () => {
    if (appear) {
      var save = document.querySelector(".savings");
      save.setAttribute("style", "display:none");
    } else {
      var save = document.querySelector(".savings");
      save.setAttribute("style", "display:inline");
    }
  };
  useEffect(() => {
    bool();
  });

  const changevalues = (elements, id) => {
    const index = values.findIndex((x) => x._id === id);
    if (elements == "first_name") {
      values[index].value = elements;
      values[index].label = "First name";
    }
    if (elements == "last_name") {
      values[index].value = elements;
      values[index].label = "Last name";
    }
    if (elements == "age") {
      values[index].value = elements;
      values[index].label = "Age";
    }
    if (elements == "city") {
      values[index].value = elements;
      values[index].label = "City";
    }
    if (elements == "state") {
      values[index].value = elements;
      values[index].label = "State";
    }
    if (elements == "account_name") {
      values[index].value = elements;
      values[index].label = "Account Name";
    }
    if (elements == "gender") {
      values[index].value = elements;
      values[index].label = "Gender";
    }
  };

  const addschema = (element) => {
    if (element == "first_name") {
      setvalues([
        { label: "First Name", value: element, _id: values.length },
        ...values,
      ]);
      // setselect([{first_name:"First name"},...select]);
    }
    if (element == "last_name") {
      setvalues([
        { label: "Last Name", value: element, _id: values.length },
        ...values,
      ]);
      // setselect([{last_name:"Last name"},...select]);
    }
    if (element == "gender") {
      setvalues([
        { label: "Gender", value: element, _id: values.length },
        ...values,
      ]);
      // setselect([{gender:"Gender"},...select]);
    }
    if (element == "age") {
      setvalues([
        { label: "Age", value: element, _id: values.length },
        ...values,
      ]);
      // setselect([{age:"Age"},...select]);
    }
    if (element == "account_name") {
      setvalues([
        { label: "Account Name", value: element, _id: values.length },
        ...values,
      ]);
      // setselect([{account_name:"Account Name"},...select]);
    }
    if (element == "city") {
      setvalues([
        { label: "City", value: element, _id: values.length },
        ...values,
      ]);
      //  setselect([{city:"City"},...select]);
    }
    if (element == "state") {
      setvalues([
        { label: "State", value: element, _id: values.length },
        ...values,
      ]);
    }
    console.log(values);
  };
  const deleteelement = (element) => {
    const index = values.findIndex((x) => x == element);
    values.splice(index, 1);
    // console.log(index);
    setselect([...values]);
  };
  var arr = [];

  return (
    <div className="savings">
      <div className="navpopup">
        <ArrowBackIos /> Saving Segment
      </div>
      <div className="WRAP">
        <form className="content" onSubmit={formik.handleSubmit}>
          <label>Enter the Name of the Segment</label>
          <input
            name="segment_name"
            onChange={formik.handleChange}
            value={formik.values.segment_name}
            placeholder="Name of the input"
            style={{ padding: "5px" }}
          />
          <label>
            To save your segment , you need to add the schemas to build the
            query
          </label>
          <div className="schemas">
            {values.map((x) => {
              return (
                <div
                  key={x._id}
                  classname="container"
                  //  style={{display:"flex", alignItems:"center",justifyContent:"space-around"}}
                >
                  <select
                    classname="drop-down"
                    onChange={(e) => changevalues(e.target.value, x._id)}
                    //  style={{marginTop:"10px",padding:"5px"}}
                    placeholder="Add Schema"
                  >
                    <option>{x.value} </option>
                    <option value={"first_name"}>First Name</option>
                    <option value={"last_name"}>Last Name</option>
                    <option value={"gender"}>Gender</option>
                    <option value={"age"}>Age</option>
                    <option value={"account_name"}>Account name</option>
                    <option value={"city"}>City</option>
                    <option value={"state"}>State</option>
                  </select>

                  <Remove
                    onClick={() => {
                      deleteelement(x);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <select
            name="select"
            style={{ marginTop: "10px" }}
            onChange={formik.handleChange}
            value={formik.values.select}
          >
            <option>Add Schema to segment</option>

            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="gender">Gender</option>
            <option value="age">Age</option>
            <option value="account_name">Account name</option>
            <option value="city">City</option>
            <option value="state">State</option>
          </select>
          <span
            className="addschema"
            onClick={() => addschema(formik.values.select)}
          >
            Add Schema+
          </span>
          <div style={{ display: "flex" }}>
            <button style={{ borderRadius: "5px" }} type="submit">
              Save Segment
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "red",
                fontWeight: "600",
              }}
              onClick={() => {
                setappear(true);
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Savingsegment;
