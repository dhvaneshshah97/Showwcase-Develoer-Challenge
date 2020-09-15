import React, { useState } from 'react';
import Layout from './Layout';


const HomeScreen: React.FC = () => {
    const [name, setName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const showForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Type your name and click 'enter' below to begin!</label>
                    <input className="form-control" value={name} onChange={handleChange} required/>
                </div>
                <button className="btn btn-outline-primary">Enter</button>
            </form>
        );
    }

    return (
        <Layout title="Home Page" className="container-fluid col-md-6 offset-md-2" description="Your personal education showcase Portal">
            <h3 style={{ marginBottom: '50px' }}>Hi there! Welcome to your education showcase.</h3>
            {showForm()}
        </Layout>
    );
}

export default HomeScreen;
