import React from "react";
import Card from 'react-bootstrap/Card';
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export class JobItem extends React.Component {
    constructor() {
        super();
        this.DeleteJob = this.DeleteJob.bind(this);
    }

    DeleteJob(e) {
        e.preventDefault();
    
        const { jobs } = this.props;
    
        if (jobs && jobs._id) {
            axios.delete(`http://localhost:4000/api/job/${jobs._id}`)
                .then((res) => {
                    this.props.Reload();
                })
                .catch((error) => {
                    console.error("Error deleting job:", error);
                });
        } else {
            console.error("Job object or _id is undefined.");
        }
    }
    

    render() {
        return (
            <div className="my-3">
                <Card>
                    <Card.Body>
                        <Card.Title>{this.props.jobs.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.jobs.profession}</Card.Subtitle>
                        <Card.Subtitle>{this.props.jobs.location}</Card.Subtitle>
                        <Card.Text>Price: € {this.props.jobs.price}</Card.Text>
                        <Card.Text>Contact Details {this.props.jobs.number}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={'/edit/' + this.props.jobs._id} className="btn btn-primary mr-2">Edit</Link>
                        <Button variant="danger" onClick={this.DeleteJob}>Delete</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
