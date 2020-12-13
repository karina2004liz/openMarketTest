import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Tabs} from 'antd';
import { Form, Input, Button } from 'antd';
import { v4 as uuidv4 } from "uuid";
import { Card } from 'antd';
import swal from 'sweetalert';
import './cards.css'
import { EditOutlined, DeleteOutlined, CloseCircleOutlined, BgColorsOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { TabPane } = Tabs;



const Cards = () => {

    const [list, setList] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [descriptionItem, setDescriptionItem] = useState("")
    const [form] = Form.useForm();


    const createList = (values) => {
        console.log(values);
        let {title,description} = values;
        let newList = {
            title,
            description,
            idList:uuidv4(),
            color:"white"
        }
        console.log(newList)
        setList([...list, newList]);
        form.resetFields();
      };

    const handleChange =(e)=>{
        const {name,value} = e.target
        console.log(value)
        setDescriptionItem(value)
    }

    const addItem = (id) => {
        swal({
            text: 'Add new coment',
            content: "input",
            className: "blackMode",
            button: {
              text: "Add",
              closeModal: false,
            },
          }).then(data =>{
            let newItem = {
                idfromList:id,
                idItem: uuidv4(),
                description: data,
                color:"white"
            }
            setItemsList([...itemsList, newItem])
            swal({
                icon: "success",
                text:"Success",
                buttons: false,
                timer: 1000,
              })
          })

    }

    const deleteItem = (id) => {  
    let results = itemsList.filter((element) => {
      return element.idItem !== id;
    });
    setItemsList(results)
    }

    const changeColor = (element,color) => {

        let myData = element

        myData.color = color

        const tagsUpdated = list.map((value) => {
            if (value.idList === element.idList) {
            return myData;
            }
            return value;
        });



        setList(tagsUpdated)


    }

    console.log(itemsList)
    return(
        <div style={{padding:'3%'}}>
            <Tabs  tabPosition="top">
                <TabPane  tab="Create a List" key="1">

                <Form form={form} layout="vertical" onFinish={createList} >
                    <Form.Item
                    initialValues={{
                        remember: true,
                      }}
                        name='title'
                        label="Title"
                        rules={[{
                        required: true,
                        },]}
                    >
                         <Input />
                    </Form.Item>
                    <Form.Item name='description' label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8 }}>
                        <Button htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                </TabPane>
                <TabPane tab="My List" key="2">
                <div style={{overflowY:"scroll", height:"70vh"}} >
                <div className="gridContent">
                    {
                        list.map((element)=>{
                            return(
                                <div className={element.color} >
                                    <div style={{textAlign:"right"}}> 
                                        <Button onClick={()=>{changeColor(element,"purpleMode" )}} className="purple" size="small" shape="circle"> </Button>
                                        <Button onClick={()=>{changeColor(element,"darkMode" )}} className="dark" size="small" shape="circle"> </Button>
                                        <Button className="purple" size="small" shape="circle"> </Button>
                                        <Button className="purple" size="small" shape="circle"> </Button>
                                        <Button className="purple" size="small" shape="circle"> </Button>
                                        <Button className="purple" size="small" shape="circle"> </Button>                               
                                    </div>
                                    <h3 className="darkModeLetters">{element.title} </h3>
                                    <p className="darkModeLetters" >{element.description}</p>
                                    
                                    <div style={{overflowY:"scroll", height:200}}  >
                                    {
                                        itemsList.filter((i)=> {return i.idfromList === element.idList}).map((data)=>{
                                            
                                            return(
                                            <div style={{margin:" 0 2% 10% 2%", background:"gray", padding:"2%"}}  key ={data.idItem} >
                                                <div style={{textAlign:"right", margin:5}}>
                                                <CloseCircleOutlined onClick={()=>{deleteItem(data.idItem)}} />
                                                <EditOutlined/>
                                                </div>
                                                
                                                <li>{data.description}</li>
                                            </div>
                                            
                                            )
                                        })
                                    }

                                    </div>
                                    
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => addItem(element.idList)}
                                        >
                                        Add Coment
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => addItem(element.idList)}
                                        >
                                        Add Coment
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => addItem(element.idList)}
                                        >
                                        Add Coment
                                    </Button>

                          
                                    
                                </div>
                            )
                        })
                    }
                    </div>


                </div>
                
                </TabPane>
            </Tabs>
        </div>
       
    )
}

export default Cards