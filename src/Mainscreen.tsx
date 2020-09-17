import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import Modal from 'react-modal';
import './styles.css';
import Modal_Form from './Modal_Form';
import moment from 'moment';
import { HashLink as Link } from 'react-router-hash-link';
import Card from './Card';


interface Props {
    user: string;
}

const Mainscreen: React.FC<Props> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState<any>([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        // if (localStorage.getItem('name')) user=localStorage.getItem('name') || ''
        items();
    }, [change])

    const items = () => {
        if (localStorage.getItem('education')) {
            setDetails(JSON.parse(localStorage.getItem('education') || ''))
        }
    }

    const getEducationDetails = async(detail: object) => {
        var newArray = []
        if (typeof (window) !== undefined) {
            if (localStorage.getItem('education')) {
                newArray = JSON.parse(localStorage.getItem('education') || '');
            }
        }
        newArray.unshift(detail);
        localStorage.setItem('education',JSON.stringify(newArray));
        setChange(!change);
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const sidePanel = () => (
        <div className="card">
            <h4 className="card-header">Your Education Info</h4>
            <ul className="list-group">
                {details.map((ed: any, i: any) => (
                    <li className="list-group-item" key={i}>
                        <Link smooth key={i} to={`/mainscreen/#${ed['degree']}`}>{`${ed['degree']} @ ${ed['name']}`}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );


    return (
        <Layout className="container-fluid" title={`Welcome back, ${user}`} description="Let's add some education details" >
            <div className="row">
                <div className="col-sm-12 mb-3">
                    <Link to="/" className="text-success"><i className="fas fa-chevron-left"></i> Back to Homescreen</Link>
                </div>
                <div className="col-sm-12 text-center mb-5">
                    <button className="btn btn-primary" onClick={toggleModal}>Add new education</button>
                </div>
                <div className="col-sm-12 col-md-3">
                    {localStorage.getItem('education') && sidePanel()}
                </div>
                <div className="col-sm-12 col-md-6 offset-md-1">
                    <Card details={details} />
                </div>
                <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My modal" className="mymodal" overlayClassName="myoverlay" closeTimeoutMS={500}>
                    <div className="text-center" style={{ fontWeight: 'bold' }}>Education Form</div>
                    <Modal_Form toggleModal={toggleModal} getEducationDetails={getEducationDetails} />
                </Modal>
            </div>
        </Layout>
    )
}

export default Mainscreen;
