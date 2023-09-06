import React from "react";
import {JobItem} from './JobItem';

export class Jobs extends React.Component{
    render(){
        if (!Array.isArray(this.props.jobs)) {
            return null; 
          }
        return this.props.jobs.map(
            (job)=>{
                return <JobItem jobs={job} key={job._id} Reload={this.props.Reload}></JobItem>
            }
        );
    }
}