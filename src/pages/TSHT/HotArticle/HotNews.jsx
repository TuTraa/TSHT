import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  ListGroup,
  ListGroupItem,
  CardHeader,
} from "reactstrap";
import moment from "moment";
import { Button, Popconfirm } from "antd";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getListByOutstanding,
  updateListByOutstandingSelected,
  getListByOutstandingSelected,
} from "../../../helpers/fakebackend_helper";
import CustomToastContainer from "../../../Components/Common/ToastContainer";
const HotNews = () => {
  const [hotNewList, setHotNewList] = useState([]);
  const [sortedHotNewList, setSortedHotNewList] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    (async () => {
      try {
        getListByOutstanding({
          type: 1,
          offset: 0,
          limit: 100,
        }).then((res) => {
          if (res.data.list) {
            setHotNewList(res.data.list);
          }
        });
        getListByOutstandingSelected({
          type: 1,
        }).then((res) => {
          if (res.data) {
            setSortedHotNewList(res.data);
          }
        });
      } catch (e) {
        // this should catch all exceptions
      }
    })();
  }, []);
  const handleUpdateListSelected = (element) => {
    const list = [...sortedHotNewList];
    const check = list.some((e) => {
      return e.article_id === element.article_id;
    });
    if (check) {
      toast.error("Bài viết đã được thêm trước đó");
    } else {
      toast.success("Thêm bài viết thành công");
      list.push(element);
      setSortedHotNewList(list);
    }
  };
  const handleRemoveListSelected = (element) => {
    const list = [...sortedHotNewList];
    const check = list.filter((e) => {
      return e.article_id !== element.article_id;
    });
    toast.success("Bỏ bài viết thành công");

    setSortedHotNewList(check);
  };

  const onUpdateSelected = () => {
    const body = sortedHotNewList.map((e) => {
      return e.article_id;
    });
    updateListByOutstandingSelected({
      type: 1,
      lst_article_id: body,
    });
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filter) {
        getListByOutstanding({
          type: 1,
          article_title: filter,
          offset: 0,
          limit: 100,
        }).then((res) => {
          if (res.data.list) {
            console.log(res.data.list);
            setHotNewList(res.data.list);
          }
        });
      } else {
        getListByOutstanding({
          type: 1,
          offset: 0,
          limit: 100,
        }).then((res) => {
          if (res.data.list) {
            setHotNewList(res.data.list);
          }
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [filter]);
  const onFilterText = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="page-content">
      <Container fluid>
        <CustomToastContainer />
        <BreadCrumb title="Bài viết nổi bật" pageTitle="Bài viết" />
        <Col lg={12}>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <div className="search-box ms-0 col-sm-12 mb-3">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm"
                      onChange={onFilterText}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                  <ListGroup>
                    {hotNewList.length > 0 ? (
                      hotNewList.map((e, i) => (
                        <ListGroupItem key={i}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>{e.article_title}</div>
                            <div>
                              Xuất bản:{" "}
                              {moment(e.created_date).format("DD/MM/YYYY")}
                            </div>
                            <Popconfirm
                              title={"Xác nhận lưu bài viết nổi bật"}
                              icon={<></>}
                              okText={"Đồng ý"}
                              cancelText={"Hủy bỏ"}
                              onConfirm={() => handleUpdateListSelected(e)}
                            >
                              <button
                                type="button"
                                className="btn btn-success add-btn"
                                id="create-btn"
                              >
                                <i className="ri-add-line align-bottom"></i>
                              </button>
                            </Popconfirm>
                          </div>
                        </ListGroupItem>
                      ))
                    ) : (
                      <></>
                    )}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <Label className="search-box ms-0 col-sm-12">
                    Sắp xếp bài viết
                  </Label>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <ListGroup>
                      {sortedHotNewList.length > 0 ? (
                        sortedHotNewList.map((e, i) => (
                          <ListGroupItem key={i}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>{e.article_title}</div>
                              <div>
                                Xuất bản:{" "}
                                {moment(e.created_date).format("DD/MM/YYYY")}
                              </div>
                              <button
                                type="button"
                                className="btn btn-light add-btn"
                                id="create-btn"
                                style={{ backgroundColor: "#D81717" }}
                                onClick={() => {
                                  handleRemoveListSelected(e);
                                }}
                              >
                                <i
                                  className="ri-subtract-line align-bottom"
                                  style={{ color: "white" }}
                                ></i>
                              </button>
                            </div>
                          </ListGroupItem>
                        ))
                      ) : (
                        <></>
                      )}
                    </ListGroup>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success add-btn"
                    id="create-btn"
                    onClick={onUpdateSelected}
                  >
                    Lưu
                  </button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default HotNews;
