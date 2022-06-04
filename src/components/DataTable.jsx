import React, { useEffect, useState } from "react";

const heading = [
  "Name",
  "Age",
  "Department",
  "Address",
  "Salary",
  "Marital Status",
  "Photo",
  "Remove",
];

const DataTable = ({ count, setCount }) => {
  const [form, setForm] = useState([]);

  useEffect(() => {
    const formData = async () => {
      let r = await fetch(`http://localhost:8080/form`);
      let d = await r.json();

      setForm(d);
    };
    formData();

    return () => {};
  }, [count]);

  const handleDelete = async (id) => {
    
    let r = await fetch(`http://localhost:8080/form/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    let d = await r.json();
    // console.log(d);
    setCount(count + 1);
  };

  return (
    <div className="tableDiv">
      <button onClick={() => setCount(count + 1)} className="upload">
        Upload
      </button>
      <table>
        <thead>
          <tr>
            {heading.map((el) => {
              return <th key={el}>{el}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {form
            ? form.map((el) => {
                return (
                  <tr key={el.id}>
                    <td>{el.name}</td>
                    <td>{el.age}</td>
                    <td>{el.department}</td>
                    <td>{el.address}</td>
                    <td>{el.salary}</td>
                    <td>{el.status}</td>
                    <td>{el.photo}</td>
                    <td onClick={() => handleDelete(el.id)}>
                      <span className="material-symbols-outlined delete">
                        delete_forever
                      </span>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
