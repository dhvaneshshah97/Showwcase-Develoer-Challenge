import React from 'react';

interface Prop {
    details: any;
}

const Card: React.FC<Prop> = ({ details }) => {
    return (
        <div>
            {details.map((d: any, i: any) => (
                <div className="card mb-5" id={d['degree']}>
                    <h4 className="card-header">Education</h4>
                    <ul className="list-group">
                        <li className="list-group-item">Name of University: {d['name']}</li>
                        <li className="list-group-item">{d['degree']} in {d['fos']} </li>
                        <li className="list-group-item"> {d['start']} - {d['end']}  </li>
                        <li className="list-group-item">Grade: {d['grade']} </li>
                        <li className="list-group-item">Description: {d['description']} </li>
                        <li className="list-group-item"><button className="btn btn-danger">Delete</button></li>
                    </ul>
                </div>
            ))}
        </div>

    )
}


export default Card;