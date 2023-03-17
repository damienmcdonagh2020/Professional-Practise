import React from "react";
import axios from "axios";

export class Create extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeJobName = this.onChangeJobName.bind(this);
    this.onChangeJobProfession = this.onChangeJobProfession.bind(this);
    this.onChangeJobExperience = this.onChangeJobExperience.bind(this);
    this.onChangeJobPricing = this.onChangeJobPricing.bind(this);

    this.state = {
      name: "",
      profession: "",
      experience: "",
      price: "",
    };
  }              

  handleSubmit(e) {
    e.preventDefault();
    console.log(
      `Button clicked 
      ${this.state.name},
      ${this.state.profession},
      ${this.state.experience},
      ${this.state.price}`
    );

    const job = {
      name: this.state.name,
      profession: this.state.profession,
      experience: this.state.experience,
      price: this.state.price,
    };

    axios
  .post("http://localhost:4000/api/jobs", job)
  .then(response => {
    console.log(response.data);
    // do something with the response data
  })
  .catch(error => {
    console.log(error);
    // handle the error
  });

    this.setState({
      name: "",
      profession: "",
      experience: "",
      price: "",
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
  onChangeJobExperience(e) {
    this.setState({
      experience: e.target.value,
    });
  }

  onChangeJobPricing(e) {
    this.setState({
      price: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h3>Hello from Create Component!</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeJobName}
            />
          </div>

          <div className="form-group">
            <label>Profession </label>
            <input
              type="text"
              className="form-control"
              value={this.state.profession}
              onChange={this.onChangeJobProfession}
            />
          </div>

          <div className="form-group">
            <label>Experience: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.experience}
              onChange={this.onChangeJobExperience}
            />
          </div>

          <div className="form-group">
            <label>Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangeJobPricing}
            />
          </div>

          <input type="submit" value="Add Job" />
        </form>
      </div>
    );
  }
}