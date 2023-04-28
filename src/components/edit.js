import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Edit() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/job/" + id)
      .then((response) => {
        setName(response.data.name);
        setProfession(response.data.profession);
        setPrice(response.data.price); // set the price state from the response data
      })
      .catch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editJob = {
      name: name,
      profession: profession,
      price: price, // include the price in the edit job object
    };

    axios
      .put("http://localhost:4000/api/job/" + id, editJob)
      .then()
      .catch();
  };

  return (
    <div>
      <h3>Edit component</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Workers Name: </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Edit profession: </label>
          <input
            type="text"
            className="form-control"
            value={profession}
            onChange={(e) => {
              setProfession(e.target.value);
            }}
          />

        </div>
        <div className="form-group">
          <label>Edit Job Price: </label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="Edit Job" />
      </form>
    </div>
  );
}
