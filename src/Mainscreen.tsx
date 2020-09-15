import React, { useState } from 'react'
import Layout from './Layout';
import Modal from 'react-modal';
import './styles.css';

interface Props {
    user: string;
}

const Mainscreen: React.FC<Props> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const sidePanel = () => (
        <div className="card">
            <h4 className="card-header">Your Education Info</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    Eduaction 1
                </li>
            </ul>
        </div>
    );

    return (
        <Layout className="container-fluid" title={`Welcome back, ${user}`} description="Let's add some education details" >
            <div className="row">
                <div className="col-sm-12 text-center mb-5">
                    <button className="btn btn-primary" onClick={toggleModal}>Add new education</button>
                </div>
                <div className="col-sm-12 col-md-3">{sidePanel()}</div>
                <div className="col-sm-12 col-md-9"></div>
                <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My modal" className="mymodal" overlayClassName="myoverlay" closeTimeoutMS={500}>
                    <div>My Modal</div>
                    <button onClick={toggleModal}>Save</button>
                </Modal>
            </div>
        </Layout>
    )
}

export default Mainscreen;
