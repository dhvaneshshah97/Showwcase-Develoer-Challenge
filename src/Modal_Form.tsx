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

    // const handleChange = async (val:any) => {
    //     setName(val)
    //     console.log(name);

    // }
    if (name) console.log(name['name'])
    const newPostForm = () => (
        <form className="mb-3">
            <div className="form-group">
                <label className="text-muted">Name of School</label>
                {/* <select className="form-control" >
                    {universities.map((u, i) => (
                        <option key={i} value={u['name']}>{u['name']}</option>
                    ))}
                </select> */}
                <Autocomplete id="School" options={universities} getOptionLabel={(u) => u['name']} style={{ width: 800 }} renderInput={(params) => <TextField {...params} label="School" variant="outlined" />} onChange={(event, newValue) => {setName(newValue)}} />
            </div>
        </form>

    );
    return (
        <div>
            {newPostForm()}

            {/* {universities.map((p, i) => (
                <p>{p['name']}</p>
            ))} */}

        </div>
    )
}

export default Modal_Form;

