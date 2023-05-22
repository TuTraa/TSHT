import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAPIDeleteTag,
  getAPIListComment,
} from "../../../helpers/fakebackend_helper";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteModal from "../../../Components/Common/DeleteModal";
import TableContainer from "../../../Components/Common/TableContainer";
import DataTable from "react-data-table-component";
import { Table } from "antd";
import CustomToastContainer from "../../../Components/Common/ToastContainer";
import Select from "react-select";

const Comment = () => {
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState({});
  const [reload, setReload] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const onClickDelete = (tag_id) => {
    setCommentId(tag_id);
    setDeleteModal(true);
  };
  const handleDeleteOrder = () => {
    if (commentId) {
      const comment_id = commentId;
      getAPIDeleteTag(comment_id).then((r) => {
        setReload(!reload);
      });
      setDeleteModal(false);
    }
  };
  const handleTableChange = (pagination, filters) => {
    let offset = pagination.current * pagination.pageSize - pagination.pageSize;
    getAPIListComment(offset, pagination.pageSize).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setCommentList(res.data.list);
        setPagination({ ...pagination, total: res.data.total });
      } else {
        toast.error("Không tìm thấy dữ liệu!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  useEffect(() => {
    let offset = pagination.current * pagination.pageSize - pagination.pageSize;
    getAPIListComment(offset, pagination.pageSize).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setCommentList(res.data.list);
        setPagination({ ...pagination, total: res.data.total });
      } else {
        toast.error("Không tìm thấy dữ liệu!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  }, [reload]);

  const statusComment = [
    {
      value: "Đã duyệt",
      label: "Đã duyệt",
    },
    {
      value: "Đã từ chối",
      label: "Đã từ chối",
    },
    {
      value: "Chưa duyệt",
      label: "Chưa duyệt",
    },
  ];

  const columns = useMemo(
    () => [
      {
        title: "Bình luận",
        dataIndex: "tag_name",
        width: "40%",
        render: (tag_name) => (
          <>
            <div className="mb-3">
              <Input
                name="tag_name"
                id="tagname-field"
                className="form-control"
                placeholder="Họ và tên người bình luận"
                type="text"
                value={tag_name}
                validate={{
                  required: { value: true },
                }}
              />
              <textarea
                name="tag_name"
                id="tagname-field"
                className="form-control mt-3"
                placeholder="Họ và tên người bình luận"
                type="text"
                validate={{
                  required: { value: true },
                }}
              >
                {tag_name}
              </textarea>
            </div>
          </>
        ),
      },
      {
        title: "Bài viết",
        dataIndex: "tag_name",
        width: "20%",
        render: (tag_name) => (
          <div class="row text-left mt-3">
            <Link to="#" className="fw-medium link-primary">
              {tag_name}
            </Link>
          </div>
        ),
      },
      {
        title: "Thời gian",
        dataIndex: "tag_name",
        width: "20%",
        render: (tag_name) => (
          <div class="row text-left mt-3">
            <h6>Chưa duyệt</h6>
            <div>October 15, 2021</div>
          </div>
        ),
      },
      {
        title: "Thao tác",
        dataIndex: "tag_id",
        width: "15%",
        render: (tag_id) => {
          return (
            <>
              <button type="submit" className="btn btn-danger">
                Gỡ xuống
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteOrder}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Container fluid>
          <BreadCrumb title="Bình luận" pageTitle="Home" />
          <Row>
            <Col lg={12}>
              <Card id="orderList">
                <CardHeader className="card-header border-0">
                  <Row className="align-items-center gy-3">
                    <div className="col-sm">
                      <div class={"row"}>
                        <Col lg={4}>
                          <div className="position-relative">
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Tìm kiếm..."
                              id="search-options"
                              width={30}
                              // value={value}
                              // onChange={(e) => {
                              //     onChangeData(e.target.value);
                              // }}
                            />
                          </div>
                        </Col>
                        <Col lg={2}>
                          <Select
                            // defaultValue={customerStatus[1]}
                            // onChange={(e) => {
                            //     handlecustomerStatus(e.value);
                            // }}
                            placeholder="Chọn trạng thái"
                            options={statusComment}
                            name="choices-single-default"
                            id="idStatus"
                          ></Select>
                        </Col>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <Link to={`/add-comment`}>
                          <button
                            type="button"
                            className="btn btn-success add-btn"
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Thêm mới
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {commentList && commentList.length && (
                      <Table
                        className="overflow-auto"
                        columns={columns}
                        dataSource={commentList || []}
                        pagination={pagination}
                        onChange={handleTableChange}
                        rowKey={"tag_id"}
                      />
                    )}
                  </div>
                  <CustomToastContainer />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <CustomToastContainer />
        </Container>
      </div>
    </>
  );
};

export default Comment;
