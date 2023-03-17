import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Edit(){
    let {id} = useParams();
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:4000/api/job/'+id)
        .then((response)=>{
            setName(response.data.name);
            setProfession(response.data.profession); // change this line
            setLocation(response.data.location);
        })
        .catch()
    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const editJob = {
            name:name,
            profession:profession,
            location:location
        }

        axios.put('http://localhost:4000/api/job/'+id,editJob)
        .then()
        .catch();
    }
 
    return(
        <div>
            <h3>Edit component</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Job Title: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Edit profession: </label>
                    <input type="text"
                        className="form-control"
                        value={profession}
                        onChange={(e)=>{setProfession(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Edit Job Location: </label>
                    <input type="text"
                        className="form-control"
                        value={location}
                        onChange={(e)=>{setLocation(e.target.value)}}
                    />
                </div>
                <input type="submit" value="Edit Job"></input>
            </form>
        </div>
    );
}
