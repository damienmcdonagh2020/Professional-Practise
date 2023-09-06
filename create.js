import React from "react";
import axios from "axios";

export class Create extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeJobName = this.onChangeJobName.bind(this);
    this.onChangeJobProfession = this.onChangeJobProfession.bind(this);
    this.onChangeJobLocation = this.onChangeJobLocation.bind(this);
    this.onChangeJobPricing = this.onChangeJobPricing.bind(this);
    this.onChangeJobNumber = this.onChangeJobNumber.bind(this);

    this.state = {
      name: "",
      profession: "",
      location: "",
      price: "",
      number: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  
    const job = {
      name: this.state.name,
      profession: this.state.profession,
      location: this.state.location,
      price: this.state.price,
      number: this.state.number, 
  }
  

    axios
      .post("http://localhost:4000/api/jobs", job)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
       
      });

    this.setState({
      name: "",
      profession: "",
      location: "",
      price: "",
      number: "",
    });
  }

  onChangeJobName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeJobProfession(e) {
    this.setState({
      profession: e.target.value,
    });
  }
  onChangeJobLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeJobPricing(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeJobNumber(e){
    this.setState({
      number: e.target.value,
    })
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div>
          <h3 className="mb-4">Create a Job Listing</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="jobName" className="mb-2">Name:</label>
              <input
                type="text"
                id="jobName"
                className="form-control form-control-lg"
                value={this.state.name}
                onChange={this.onChangeJobName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobProfession" className="mb-2">Profession:</label>
              <input
                type="text"
                id="jobProfession"
                className="form-control form-control-lg"
                value={this.state.profession}
                onChange={this.onChangeJobProfession}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobLocation" className="mb-2">Location:</label>
              <input
                type="text"
                id="jobLocation"
                className="form-control form-control-lg"
                value={this.state.location}
                onChange={this.onChangeJobLocation}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobPrice" className="mb-2">Price:</label>
              <input
                type="text"
                id="jobPrice"
                className="form-control form-control-lg"
                value={this.state.price}
                onChange={this.onChangeJobPricing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobNumber" className="mb-2">Contact Number:</label>
              <input
                type="text"
                id="jobNumber"
                className="form-control form-control-lg"
                value={this.state.number}
                onChange={this.onChangeJobNumber}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Job
            </button>
          </form>
        </div>
      </div>
    );
  }
}
