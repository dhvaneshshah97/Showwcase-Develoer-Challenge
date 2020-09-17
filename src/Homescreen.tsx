import React, { useState } from 'react';
import Layout from './Layout';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
    getName: (val: string) => void;
}

const Homescreen: React.FC<Props> = ({ getName, history }) => {
    const [name, setName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        getName(name);
        history.push("/mainscreen");
    }

    const showForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Type your name and click 'enter' below to begin!</label>
                    <input className="form-control" value={name} onChange={handleChange} required />
                </div>
                <button className="btn btn-outline-primary">Enter</button>
            </form>
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
