import React, { useRef, useState } from "react";

const Form = () => {
  const [form, setForm] = React.useState({});
  const [url, setUrl] = useState("");

  const nameRef = useRef();
  const ageRef = useRef();
  const addressRef = useRef();
  const departmentRef = useRef();
  const salaryRef = useRef();
  const fileRef = useRef();
  const statusRef = useRef();

  const handleChange = (e) => {
    let { name, value, type, files } = e.target;
    // console.log(name, value, checked, type, files)

    if (type === "file") {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setForm({ ...form, [name]: files[0].name });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //red

    if (!form.photo) {
      fileRef.current.focus();
    }
    if (!form.name) {
      nameRef.current.focus();
    }
    if (!form.address) {
      addressRef.current.focus();
    }
    if (!form.department) {
      departmentRef.current.focus();
    }
    if (!form.age) {
      ageRef.current.focus();
    }
    if (!form.status) {
      statusRef.current.focus();
    }

    if (
      form.photo &&
      form.name &&
      form.address &&
      form.department &&
      form.age &&
      form.photo &&
      form.status
    ) {
      fetch(`http://localhost:8080/form`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      setUrl("");
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
      e.target[5].checked = false;
      e.target[6].checked = false;
      e.target[7].value = "";
      e.target[8].value = "";
    }
    // console.log(e);
  };
  return (
    <div className="formDiv">
      <div>
        <h1>Employee Details</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            ref={nameRef}
          />{" "}
          <label>Age</label>
          <input
            type="number"
            onChange={handleChange}
            name="age"
            ref={ageRef}
          />{" "}
          <label>Address City </label>
          <input
            type="text"
            onChange={handleChange}
            name="address"
            ref={addressRef}
          />{" "}
          <label>Department</label>
          <select
            id="department"
            onChange={handleChange}
            name="department"
            ref={departmentRef}
          >
            <option value="">choose category</option>
            <option value="HR">HR</option>
            <option value="Consumer Affairs">Consumer Affairs</option>
            <option value="Admin">Admin</option>
            <option value="IT">IT</option>
          </select>{" "}
          <label>Salary(Per month)</label>
          <input
            type="text"
            onChange={handleChange}
            name="salary"
            ref={salaryRef}
          />{" "}
          <label>Marital Status</label>
          <div>
            <input
              type="radio"
              onChange={handleChange}
              name="status"
              value="Male"
              ref={statusRef}
            />
            <span>Male</span>
          </div>
          <div>
            <input
              type="radio"
              onChange={handleChange}
              name="status"
              value="Female"
              ref={statusRef}
            />
            <span>Female</span>
          </div>
          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleChange}
            name="photo"
            ref={fileRef}
          />{" "}
          <input type="submit" />
        </form>
      </div>
      <div className="imageDiv">
        {url ? (
          <div>
            <h3>Preview</h3> <img src={url} alt="" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
