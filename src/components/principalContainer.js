import './principalContainer.css'
import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Cards from './cards'

const { Header, Content, Footer } = Layout;

const PrincipalContainer = () => {

    return(
        <Layout style={{minHeight: "100vh"}} >
            <Header><h1 style={{color:"white"}}>OpenNotes</h1></Header>
                <Content>
                    <div className="site-layout-content ">
                     <Cards/>
                    </div>
                </Content>
            <Footer style={{ textAlign: 'center' }}>WebApp to OpenMarket</Footer>
      </Layout>
    )
}

export default PrincipalContainer