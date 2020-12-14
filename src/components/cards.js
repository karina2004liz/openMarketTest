import React, { useState } from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import "./cards.css";
import {
  EditOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;

const Cards = () => {
  const [list, setList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [descriptionItem, setDescriptionItem] = useState("");
  const [form] = Form.useForm();

  const createList = (values) => {
    
    let { title, description } = values;
    let newList = {
      title,
      description,
      idList: uuidv4(),
      color: "darkMode",
    };
   
    setList([...list, newList]);
    form.resetFields();
    swal({
        icon: "success",
        text: "Created!",
        buttons: false,
        timer: 1000,
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setDescriptionItem(value);
  };

  const addItem = (id) => {
    swal({
      text: "Add new coment",
      content: "input",
      className: "blackMode",
      button: {
        text: "Add",
        closeModal: false,
      },
    }).then((data) => {
      let newItem = {
        idfromList: id,
        idItem: uuidv4(),
        description: data,
        color: "white",
        edit: false,
      };
      setItemsList([...itemsList, newItem]);
      swal({
        icon: "success",
        text: "Success",
        buttons: false,
        timer: 1000,
      });
    });
  };

  const deleteItem = (id) => {
    let results = itemsList.filter((element) => {
      return element.idItem !== id;
    });
    setItemsList(results);
  };

  const deleteList = (id) => {
    let results = list.filter((element) => {
      return element.idList !== id;
    });
    let resultsItems = itemsList.filter((element) => {
      return element.idfromList !== id;
    });
    setList(results);
    setItemsList(resultsItems);
    swal({
        icon: "success",
        text: "Deleted!",
        buttons: false,
        timer: 1500,
      });
  };

  const enableItem = (element) => {
    let myData = element;

    myData.edit = true;

    setDescriptionItem(myData.description);

    const tagsUpdated = list.map((value) => {
      if (value.idList === element.idList) {
        return myData;
      }
      return value;
    });

    setList(tagsUpdated);
  };

  const disableItem = (element) => {
    let myData = element;

    myData.edit = false;

    setDescriptionItem(myData.description);

    const tagsUpdated = list.map((value) => {
      if (value.idList === element.idList) {
        return myData;
      }
      return value;
    });

    setList(tagsUpdated);
  };

  const editItem = (element) => {
    let myData = element;

    myData.description = descriptionItem;
    myData.edit = false;

    const tagsUpdated = list.map((value) => {
      if (value.idList === element.idList) {
        return myData;
      }
      return value;
    });

    setList(tagsUpdated);
  };

  const changeColor = (element, color) => {
    let myData = element;

    myData.color = color;

    const tagsUpdated = list.map((value) => {
      if (value.idList === element.idList) {
        return myData;
      }
      return value;
    });

    setList(tagsUpdated);
  };

 
  return (
    <div style={{ padding: "3%" }}>
      <Tabs tabPosition="top">
        <TabPane tab="Create a List" key="1">
          <div className="myForm">
            <Form form={form} layout="vertical" onFinish={createList}>
              <Form.Item
                initialValues={{
                  remember: true,
                }}
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{  fontWeight: 700 }}
                name="description"
                label="Description"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8 }}>
                <Button type="primary" size="large" htmlType="submit">
                  Create a new list
                </Button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="My List" key="2">
          <div style={{ overflowY: "scroll", height: "70vh" }}>
            <div className="gridContent">
              {list.map((element) => {
                let colorDiv;
                let colorButtons;

                switch (element.color) {
                  case "pinkMode":
                    colorDiv = "pinkItems";
                    colorButtons = "pinkButtons";
                    break;
                  case "purpleMode":
                    colorDiv = "purpleItems";
                    colorButtons = "purpleButtons";
                    break;
                  case "darkMode":
                    colorDiv = "darkItems";
                    colorButtons = "darkButtons";
                    break;
                  case "blueTrypanMode":
                    colorDiv = "blueTrypanItems";
                    colorButtons = "blueTrypanButtons";
                    break;
                  case "blueUltramarineMode":
                    colorDiv = "blueUltramarineItems";
                    colorButtons = "blueUltramarineButtons";
                    break;
                  case "blueSkyMode":
                    colorDiv = "blueSkyItems";
                    colorButtons = "blueSkyButtons";
                    break;
                  default:
                    break;
                }

                return (
                  <div className={element.color}>
                    <div style={{ textAlign: "right" }}>
                      <Button
                        onClick={() => {
                          changeColor(element, "pinkMode");
                        }}
                        className="pink"
                        size="small"
                        shape="circle"
                      >
                        {" "}
                      </Button>
                      <Button
                        onClick={() => {
                          changeColor(element, "purpleMode");
                        }}
                        className="purple"
                        size="small"
                        shape="circle"
                      >
                        {" "}
                      </Button>
                      <Button
                        onClick={() => {
                          changeColor(element, "darkMode");
                        }}
                        className="dark"
                        size="small"
                        shape="circle"
                      >
                        {" "}
                      </Button>
                      <Button
                        onClick={() => {
                          changeColor(element, "blueTrypanMode");
                        }}
                        className="blueTrypan"
                        size="small"
                        shape="circle"
                      >
                        {" "}
                      </Button>
                      <Button
                        onClick={() => {
                          changeColor(element, "blueUltramarineMode");
                        }}
                        className="blueUltramarine"
                        size="small"
                        shape="circle"
                      >
                        {" "}
                      </Button>
                      <Button
                        onClick={() => {
                          changeColor(element, "blueSkyMode");
                        }}
                        className="blueSky"
                        size="small"
                        shape="circle"
                      >
                        {" "}
                      </Button>
                      <CloseCircleOutlined
                        className="deleteCircleList"
                        onClick={() => {
                          deleteList(element.idList);
                        }}
                      />
                    </div>
                    <h3 className="darkModeLetters">{element.title} </h3>
                    <p className="darkModeLetters">
                      {element.description === undefined
                        ? "No description added"
                        : element.description}
                    </p>

                    <div className="scrollDiv">
                      {itemsList
                        .filter((i) => {
                          return i.idfromList === element.idList;
                        })
                        .map((data) => {
                          return (
                            <div className={colorDiv} key={data.idItem}>
                              <div style={{ textAlign: "right" }}>
                                {!data.edit && (
                                  <div>
                                    <EditOutlined
                                      onClick={() => {
                                        enableItem(data);
                                      }}
                                    />
                                    <CloseCircleOutlined
                                      onClick={() => {
                                        deleteItem(data.idItem);
                                      }}
                                    />
                                  </div>
                                )}
                                {data.edit && (
                                  <div>
                                    <PlusCircleOutlined
                                      onClick={() => {
                                        editItem(data);
                                      }}
                                    />
                                    <CloseCircleOutlined
                                      onClick={() => {
                                        disableItem(data);
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div style={{ padding: "2%" }}>
                                {!data.edit && <b>{data.description}</b>}
                                {data.edit && (
                                  <textarea
                                    style={{ width: "100%", color: "black" }}
                                    onChange={(e) => {
                                      handleChange(e);
                                    }}
                                    value={descriptionItem}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    <div className="containerButtons">
                      <Button
                        size="medium"
                        className={colorButtons}
                        onClick={() => addItem(element.idList)}
                      >
                        Add Coment
                      </Button>
                    </div>
                  </div>
                );
              }).reverse()}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Cards;
