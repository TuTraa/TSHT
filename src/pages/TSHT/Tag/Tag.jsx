import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAPIDeleteTag,
  getAPIListTag,
} from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteModal from "../../../Components/Common/DeleteModal";
import TableContainer from "../../../Components/Common/TableContainer";
import DataTable from "react-data-table-component";
import { Table } from "antd";
import CustomToastContainer from "../../../Components/Common/ToastContainer";
import ToastCustom from "../../../Components/Common/Toast";
const Tag = () => {
  const [tagList, setTagList] = useState();
  const [tagId, setTagId] = useState({});
  const [reload, setReload] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const onClickDelete = (tag_id) => {
    setTagId(tag_id);
    setDeleteModal(true);
  };
  const handleDeleteOrder = () => {
    if (tagId) {
      const tag_id = tagId;
      getAPIDeleteTag(tag_id).then((r) => {
        if (r.status > 0) {
          ToastCustom("Xoá tag thành công", "success");
          setReload(!reload);
        } else {
          ToastCustom("Xoá tag thất bại", "fail");
        }
      });
      setDeleteModal(false);
    }
  };
  const handleTableChange = (pagination, filters) => {
    let offset = pagination.current * pagination.pageSize - pagination.pageSize;
    getAPIListTag(offset, pagination.pageSize).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setTagList(res.data.list);
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
    getAPIListTag(offset, pagination.pageSize).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setTagList(res.data.list);
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

  const columns = useMemo(
    () => [
      {
        title: "Tên tag",
        dataIndex: "tag_name",
        width: "80%",
        render: (tag_name) => (
          <Link to="#" className="fw-medium link-primary">
            {tag_name}
          </Link>
        ),
      },
      {
        title: "Thao tác",
        dataIndex: "tag_id",
        width: "15%",
        render: (tag_id) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit">
                <Link
                  to={`/update-tag/${tag_id}`}
                  className="text-primary d-inline-block edit-item-btn"
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    onClickDelete(tag_id);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
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
          <BreadCrumb title="Tag" pageTitle="Home" />
          <Row>
            <Col lg={12}>
              <Card id="orderList">
                <CardHeader className="card-header border-0">
                  <Row className="align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Danh sách tag</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <Link to={`/add-tag`}>
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
                    {tagList && tagList.length && (
                      <Table
                        className="overflow-auto"
                        columns={columns}
                        dataSource={tagList || []}
                        pagination={pagination}
                        onChange={handleTableChange}
                        rowKey={"tag_id"}
                      />
                    )}
                  </div>
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

export default Tag;
