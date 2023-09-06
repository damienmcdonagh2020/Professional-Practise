import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Edit() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/job/" + id)
      .then((response) => {
        setName(response.data.name);
        setProfession(response.data.profession);
        setLocation(response.data.location);
        setPrice(response.data.price);
        setNumber(response.data.number);
      })
      .catch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editJob = {
      name: name,
      profession: profession,
      location: location,
      price: price,
      number: number,
    };

    axios
      .put("http://localhost:4000/api/job/" + id, editJob)
      .then()
      .catch();
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100">
      <div className="p-4">
        <h3 className="mb-4">Edit component</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Edit Worker's Name: </label>
            <input
              type="text"
              className="form-control form-control-lg" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Edit Profession: </label>
            <input
              type="text"
              className="form-control form-control-lg" 
              value={profession}
              onChange={(e) => {
                setProfession(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Edit Job Location: </label>
            <input
              type="text"
              className="form-control form-control-lg" 
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Edit Job Price: </label>
            <input
              type="text"
              className="form-control form-control-lg" 
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Edit Job Contact Number: </label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <input type="submit" value="Edit Job" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}
