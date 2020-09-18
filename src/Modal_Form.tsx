import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Prop {
    getEducationDetails: (val: Object) => void
    toggleModal: () => void;
}

const Modal_Form: React.FC<Prop> = ({ toggleModal, getEducationDetails }) => {
    // state varibales
    const [universities, setUniversities] = useState([]);
    const [name, setName] = useState<any>({})
    const [values, setValues] = useState<any>({
        degree: '',
        fos: '',
        start: '',
        end: '',
        grade: '',
        description: '',
    });

    // destructuring state variables
    const { degree, fos, start, end, grade, description } = values;

    // fetch all universities from API when initial loading of Component
    const fetchUniversities = async () => {
        try {
            const rawResponse = await fetch('http://universities.hipolabs.com/search');
            const response = await rawResponse.json();
            setUniversities(response)
        } catch (error) {
            console.log(error);
        }
    }

    // option values for degree drop-down
    const typeofdegree = ["High School", "Associate", "Bachelor", "Master", "MBA", "Juris Doctor (J.D.)", "Doctor of Medicine (M.D.)", "Doctor of Philosophy (Ph.D.)"]

    useEffect(() => {
        fetchUniversities();
    }, []);

    // handleChange method for all form elements 
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        values['name'] = name['name'];
        values['uniqueKey'] = values['name']+values['degree']
        getEducationDetails(values);
        console.log(values);
        toggleModal();
    }

    // Modal form
    const newModalForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name of School <span style={{color:'red'}}>*</span></label>
                <Autocomplete id="School" options={universities} getOptionLabel={(u) => u['name']} renderInput={(params) => <TextField {...params} label="School" variant="outlined" />} onChange={(event, newValue) => { setName(newValue) }}  freeSolo />
            </div>
            <div className="form-group">
                <label className="text-muted">Degree <span style={{color:'red'}}>*</span></label>
                <select className="form-control" name="degree" onChange={handleChange} value={degree} required>
                    <option value="">Please Select</option>
                    {typeofdegree.map((d,i) => (
                        <option key={i} value={d}>{d}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Field of Study <span style={{color:'red'}}>*</span></label>
                <input type="text" className="form-control" name="fos" value={fos} onChange={handleChange} required placeholder="e.g. - Computer Science" />
            </div>
            <div className="row">
                <div className="form-group col">
                    <label className="text-muted">Start year <span style={{color:'red'}}>*</span></label>
                    <input type="date" className="form-control" name="start" value={start} onChange={handleChange} required/>
                </div>
                <div className="form-group col">
                    <label className="text-muted">End year (expected) <span style={{color:'red'}}>*</span></label>
                    <input type="date" className="form-control" name="end" value={end} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-group">
                <label className="text-muted">Grade (on scale 4.0) <span style={{color:'red'}}>*</span></label>
                <input type="number" className="form-control" name="grade" value={grade} onChange={handleChange} max="4.0" min="0.0" step="0.01" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Description (e.g. - your experience with your University/Field of Study)</label>
                <textarea className="form-control" name="description" value={description} onChange={handleChange} rows={3} />
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
    );
}

export default Modal_Form;

