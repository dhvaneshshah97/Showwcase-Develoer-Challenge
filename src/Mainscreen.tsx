import React from 'react'
import Layout from './Layout';

interface Props  {
    user: string;
}

const Mainscreen: React.FC<Props> = ({user}) => {
    return (
        <Layout className="container-fluid" title={`Welcome back, ${user}`} description="Let's add some education details">

        </Layout>
    )
}

export default Mainscreen;
