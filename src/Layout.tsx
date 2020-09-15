import React from 'react';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
    className: string;
}

const Layout: React.FC<Props> = ({ title = "Title", description = "Description", className, children }) => {
    return (
        <div>
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>

    )
}

export default Layout;
