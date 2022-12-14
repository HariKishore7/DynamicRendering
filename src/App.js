import React, { useState, useEffect } from "react";
import FormData from "./components/FormData";
import formjsondata from "./formData.json";
import { FormContext } from "./FormContext";

export default function App() {
  const [elements, setElements] = useState(null);
  const [doSubmit, setDoSubmit] = useState(false);
  useEffect(() => {
    setElements(formjsondata[0]);
  }, []);

  const { fields, formHeading } = elements ?? {};

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!doSubmit) {
      alert("Please fill all fields before submitting");
      return;
    }
    console.log(elements);
    let result = "";
    elements.fields.forEach((field) => {
      result = result.concat(field.label + " : " + field.value + "\n");
    });
    console.log(elements.fields);
    alert(result);
  };

  const handleChange = (id, event) => {
    setDoSubmit(true);
    console.log("id" + id + "event" + event);
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const val = event.target.value;
      if (field.id === id) {
        if (val !== "") {
          field["value"] = val;
          field["error"] = "";
        } else {
          field["error"] = "Field is required.";
        }
      }
      setElements(newElements);
    });
    isValid();
  };

  const isValid = () => {
    elements.fields.forEach((field) => {
      if (field.error !== "") {
        setDoSubmit(false);
      }
    });
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <h3>{formHeading}</h3>
            <form action="" method="POST">
              <fieldset className="ml-auto">
                {fields
                  ? fields.map((field, i) => <FormData key={i} field={field} />)
                  : null}
              </fieldset>
            </form>
            <div className="row justify-content-center">
              <div className="col-3">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormContext.Provider>
  );
}
