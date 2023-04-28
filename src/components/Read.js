import React from "react";
import { Jobs } from "./Jobs";
import axios from "axios";

export class Read extends React.Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/jobs")
      .then((response) => {
        this.setState({ jobs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Hello from my Read component!</h3>
        <Jobs jobs={this.state.jobs} Reload={this.componentDidMount} />
      </div>
    );
  }
}
