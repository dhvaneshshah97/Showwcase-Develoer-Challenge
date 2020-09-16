import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Prop {
    // getEducationDetails: (val: Object) => void
    toggleModal: () => void;
}


const Modal_Form: React.FC<Prop> = ({toggleModal}) => {
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

    const { degree, fos, start, end, grade, description } = values;

    const fetchUniversities = async () => {
        try {
            const rawResponse = await fetch('http://universities.hipolabs.com/search');
            const response = await rawResponse.json();
            setUniversities(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        values['name'] = name['name'];
        console.log(values);
        toggleModal();
    }

    const newModalForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name of School</label>
                <Autocomplete id="School" options={universities} getOptionLabel={(u) => u['name']} renderInput={(params) => <TextField {...params} label="School" variant="outlined" />} onChange={(event, newValue) => { setName(newValue) }}  />
            </div>
            <div className="form-group">
                <label className="text-muted">Degree</label>
                <select className="form-control" name="degree" onChange={handleChange} value={degree}>
                    <option value="">Please select</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Field of Study</label>
                <input type="text" className="form-control" name="fos" value={fos} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Start year</label>
                <input type="date" className="form-control" name="start" value={start} onChange={handleChange}  />
            </div>
            <div className="form-group">
                <label className="text-muted">End year(expected)</label>
                <input type="date" className="form-control" name="end" value={end} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Grade</label>
                <input type="number" className="form-control" name="grade" value={grade} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input type="text-area" className="form-control" name="description" value={description} onChange={handleChange} />
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

