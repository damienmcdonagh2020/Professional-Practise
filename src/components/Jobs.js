import React from "react";
import {JobItem} from './JobItem';

export class Jobs extends React.Component{
    render(){
        if (!Array.isArray(this.props.jobs)) {
            return null; // or some other fallback value
          }
        return this.props.jobs.map(
            (job)=>{
                return <JobItem job={job} key={job._id} Reload={this.props.Reload}></JobItem>
            }
        );
    }
}