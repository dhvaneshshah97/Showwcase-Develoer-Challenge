import React, { useState } from 'react'
import Layout from './Layout';
import Modal from 'react-modal';
import './styles.css';
import Modal_Form from './Modal_Form';

interface Props {
    user: string;
}

const Mainscreen: React.FC<Props> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState([]);

    // const getEducationDetails = (detail:Object) => {
    //     details.push(detail)
    // }
    
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
                <div className="col-sm-12 col-md-6 offset-md-1">
                    {details.map((e,i)=>(
                        <div>

                        </div>
                    ))}
                </div>
                <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My modal" className="mymodal" overlayClassName="myoverlay" closeTimeoutMS={500}>
                    <div className="text-center" style={{ fontWeight: 'bold' }}>Education Form</div>
                    <Modal_Form toggleModal = {toggleModal} />
                </Modal>
            </div>
        </Layout>
    )
}

export default Mainscreen;
