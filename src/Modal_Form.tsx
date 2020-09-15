import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Modal_Form: React.FC = () => {
    const [url, setUrl] = useState('http://universities.hipolabs.com/search');
    const [universities, setUniversities] = useState([]);
    const [name, setName] = useState<any>({})

    const fetchUniversities = async () => {
        try {
            const rawResponse = await fetch(url);
            const response = await rawResponse.json();
            setUniversities(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUniversities();
    }, [])

    const newModalForm = () => (
        <form className="mb-3">
            <div className="form-group">
                <label className="text-muted">Name of School</label>
                <Autocomplete id="School" options={universities} getOptionLabel={(u) => u['name']} renderInput={(params) => <TextField {...params} label="School" variant="outlined" />} onChange={(event, newValue) => { setName(newValue) }} />
            </div>
            <div className="form-group">
                <label className="text-muted">Degree</label>
                <select className="form-control" name="degree" >
                    <option value="">Please select</option>
                    <option value="1">Bachelors</option>
                    <option value="2">Masters</option>
                    <option value="2">Phd</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Field of Study</label>
                <input type="text" className="form-control" name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">Start year</label>
                <input type="date" className="form-control" name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">End year(expected)</label>
                <input type="date" className="form-control" name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">Grade</label>
                <input type="text" className="form-control" name="name" />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input type="text-area" className="form-control" name="name" />
            </div>
            <div className="text-center">
                <button className="btn btn-primary">Save</button>
            </div>
        </form>
    );

    return (
        <div>
            {newModalForm()}
        </div>
    )
}

export default Modal_Form;

