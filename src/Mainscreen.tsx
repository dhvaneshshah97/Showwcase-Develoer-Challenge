import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import Modal from 'react-modal';
import './styles.css';
import Modal_Form from './Modal_Form';
import { HashLink as Link } from 'react-router-hash-link';
import Card from './Card';

interface Props {
    user: string;
}

const Mainscreen: React.FC<Props> = ({ user }) => {
    // state variables
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState<any>([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        items();
    }, [change])

    const items = () => {
        if (localStorage.getItem('education')) {
            setDetails(JSON.parse(localStorage.getItem('education') || ''))
        }
    }

    // getting object containing education details from Modal_Form component via callback
    const getEducationDetails = async (detail: object) => {
        var newArray = []
        if (typeof (window) !== undefined) {
            if (localStorage.getItem('education')) {
                newArray = JSON.parse(localStorage.getItem('education') || '');
            }
        }
        newArray.unshift(detail);
        localStorage.setItem('education', JSON.stringify(newArray));
        setChange(!change);
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    // deletes education detail card 
    const deleteEducation = (p: any, index: any) => {
        details.map((e: any, i: any) => {
            if (e['uniqueKey'] === p['uniqueKey']) {
                details.splice(index, 1)
            }
        });
        // setting localstorage again after deleting particular education object
        localStorage.setItem('education', JSON.stringify(details))

        // refresh component
        setChange(!change);
    }

    // side panel of bookmarked education links
    const sidePanel = () => (
        <div className="card mb-5">
            <h4 className="card-header g-font">Jump from here</h4>
            <ul className="list-group">
                {details.map((ed: any, i: any) => (
                    <li className="list-group-item" key={i}>
                        <Link className="g-font" smooth key={i} to={`/mainscreen/#${ed['degree']}`}>{`${ed['degree']} @ ${ed['name']}`}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    // back to homescreen link
    const goBack = (
        <div className="col-sm-12 mb-3">
            <Link to="/" className="text-success"><i className="fas fa-chevron-left"></i> Back to Homescreen</Link>
        </div>
    );

    // button to add new education info
    const addNewEducationButton = (
        <div className="col-sm-12 text-center mb-5">
            <button className="btn btn-primary g-font" onClick={toggleModal}>Add new education</button>
        </div>
    );

    // this is what going to be rendered on screen
    return (
        <Layout className="container-fluid" title={`Welcome back, ${user}`} description="Let's add some education details" >
            <div className="row">
                {goBack}
                {addNewEducationButton}
                <div className="col-sm-12 col-md-3">
                    {localStorage.getItem('education') && sidePanel()}
                </div>
                <div className="col-sm-12 col-md-6 offset-md-1">
                    <Card details={details} deleteEducation={deleteEducation} />
                </div>
                <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My modal" className="mymodal" overlayClassName="myoverlay" closeTimeoutMS={500}>
                    <div className="text-center" style={{ fontWeight: 'bold' }}>Education Form</div>
                    <Modal_Form toggleModal={toggleModal} getEducationDetails={getEducationDetails} />
                </Modal>
            </div>
        </Layout>
    );
}

export default Mainscreen;
