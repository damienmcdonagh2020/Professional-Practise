import React from "react";
import Card from 'react-bootstrap/Card';
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export class JobItem extends React.Component {
    constructor(){
        super();
        this.DeleteJob = this.DeleteJob.bind(this);
    }
    DeleteJob(e){
        e.preventDefault();

        axios.delete('http://localhost:4000/api/job/'+this.props.job._id)
        .then((res)=>{this.props.Reload();})
        .catch();
    }
    render() {
        return (
            <div>

                <Card>
                    <Card.Header>{this.props.job.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.job.cover}></img>
                            <footer >
                                {this.props.job.author}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={'/edit/' + this.props.job._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteJob}>Delete</Button>
                </Card>
            </div>
        );
    }
}