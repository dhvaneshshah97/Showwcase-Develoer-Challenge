import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import Modal from 'react-modal';
import './styles.css';
import Modal_Form from './Modal_Form';
import moment from 'moment';
import { HashLink as Link } from 'react-router-hash-link';


interface Props {
    user: string;
}

const Mainscreen: React.FC<Props> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState<any>([]);

    useEffect(() => {
        console.log(details)
    }, [details])

    const getEducationDetails = (detail: object) => {
        console.log(detail);
        const newArray = details.slice();
        newArray.unshift(detail)
        setDetails(newArray);
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const sidePanel = () => (
        <div className="card">
            <h4 className="card-header">Your Education Info</h4>
            <ul className="list-group">
                {details.map((ed: any, i: any) => (
                    <li className="list-group-item">
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
                    <Link to="/" className="text-success"><i className="fas fa-angle-left" /> Back to Homescreen</Link>
                </div>
                <div className="col-sm-12 text-center mb-5">
                    <button className="btn btn-primary" onClick={toggleModal}>Add new education</button>
                </div>
                <div className="col-sm-12 col-md-3">{sidePanel()}</div>
                <div className="col-sm-12 col-md-6 offset-md-1">
                    {details.map((ed: any, i: any) => (
                        <div key={i} className="card" style={{ marginBottom: 40 }} id={ed['degree']}>
                            <h3 className="card-header">
                                {ed["name"]}
                            </h3>
                            <div className="card-body">
                                <h5 className="card-title">{ed["degree"]} in {ed["fos"]}</h5>
                                <span>{(ed['start'])}</span>{" - "}
                                <span>{ed["end"]}</span>
                            </div>
                            <div className="card-text">Grade: {ed["grade"]}</div>
                            <div className="card-text">Grade: {ed["description"]}</div>
                            <button className="btn btn-danger">Delete Education</button>
                        </div>
                    ))}
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
