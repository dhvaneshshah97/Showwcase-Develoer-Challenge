import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { RouteComponentProps, Link } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
    getName: () => void;
}

const Homescreen: React.FC<Props> = ({ getName, history }) => {
    const [name, setName] = useState('');
    const [disable, setDisable] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const buttonDisable = () => {
        if (localStorage.getItem('name')) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }

    useEffect(() => {
        buttonDisable();
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('name', name);
        getName();
        history.push("/mainscreen");
        setDisable(true);
    }

    const handleClick = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('education');
        setDisable(false);
    }

    const showForm = () => {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Type your name and click 'enter' below to begin!</label>
                        {disable ? <input className="form-control" readOnly /> : <input className="form-control" value={name} onChange={handleChange} required />}
                    </div>
                    {disable ? <button className="btn btn-outline-primary mb-3" disabled style={{ cursor: 'not-allowed' }}>Enter</button> : <button className="btn btn-outline-primary">Enter</button>}
                </form>
                {disable && 
                <div className="row">
                    <div className="col"><button className="btn btn-outline-success" onClick={handleClick}>Not {`${localStorage.getItem('name')} ?`}</button></div>
                    <div className="col text-right">
                        <Link to="/mainscreen" className="text-success">Go to mainscreen <i className="fas fa-chevron-right"></i></Link>
                    </div>
                </div>
                }
            </div>

        );
    }

    return (
        <Layout title="Showwcase" className="container-fluid col-md-6 offset-md-3" description="All-in-one platform built for Tech Workers">
            <h3 style={{ marginBottom: '50px' }}>Hi there! Welcome to your education showcase.</h3>
            {showForm()}
        </Layout>
    );
}

export default Homescreen;
