import React from "react";
import { Jobs } from "./Jobs";
import axios from "axios";

export class Read extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      jobs: [],
      filteredJobs: [],
      searchProfession: "",
      searchLocation: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/jobs")
      .then((response) => {
        this.setState({ jobs: response.data, filteredJobs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearch = () => {
    const { jobs, searchProfession, searchLocation } = this.state;

    const filteredJobs = jobs.filter((job) =>
      job.profession.toLowerCase().includes(searchProfession.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
    );

    this.setState({ filteredJobs });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by profession..."
              name="searchProfession"
              value={this.state.searchProfession}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by location..."
              name="searchLocation"
              value={this.state.searchLocation}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary"
              onClick={this.handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <Jobs jobs={this.state.filteredJobs} Reload={this.componentDidMount} />
      </div>
    );
  }
}
