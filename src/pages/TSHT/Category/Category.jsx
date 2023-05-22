import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAPIDeleteCategory,
  getAPIDeleteDepartment,
  getAPIDeleteTag,
  getAPIListCategory,
  getAPIListDepartment,
  getAPIListTag,
} from "../../../helpers/fakebackend_helper";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteModal from "../../../Components/Common/DeleteModal";
import TableContainer from "../../../Components/Common/TableContainer";
import DataTable from "react-data-table-component";
import { Spin, Table } from "antd";
import CustomToastContainer from "../../../Components/Common/ToastContainer";
import ToastCustom from "../../../Components/Common/Toast";

const Category = () => {
  const [categoryList, setCategoryList] = useState();
  const [categoryId, setcategoryId] = useState({});
  const [reload, setReload] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const onClickDelete = (department_id) => {
    setcategoryId(department_id);
    setDeleteModal(true);
  };
  const handleDeleteCategory = () => {
    if (categoryId) {
      const category_id = categoryId;
      getAPIDeleteCategory(category_id).then((r) => {
        if (r.status > 0) {
          ToastCustom("Xoá chuyên mục thành công", "success");
          setReload(!reload);
        } else {
          ToastCustom("Xoá chuyên mục thất bại", "fail");
        }
      });
      setDeleteModal(false);
    }
  };
  const handleTableChange = (pagination, filters) => {
    let offset = pagination.current * pagination.pageSize - pagination.pageSize;
    getAPIListCategory(offset, pagination.pageSize).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setCategoryList(res.data.list);
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
    getAPIListCategory(offset, pagination.pageSize).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setCategoryList(res.data.list);
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

  const columns = [
    {
      title: "Chuyên mục",
      dataIndex: "category_name",
      width: "80%",
      render: (category_name) => (
        <Link to="#" className="fw-medium link-primary">
          {category_name}
        </Link>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "category_id",
      width: "15%",
      render: (category_id) => {
        return (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item edit">
              <Link
                to={`/update-category/${category_id}`}
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
                  onClickDelete(category_id);
                }}
              >
                <i className="ri-delete-bin-5-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];
  const sencondColumns = [
    {
      dataIndex: "category_name",
      width: "80%",
      props: {
        style: { paddingLeft: 50 },
      },
      render: (category_name) => (
        <Link
          to="#"
          style={{ marginLeft: 30 }}
          className="fw-medium link-primary"
        >
          {category_name}
        </Link>
      ),
    },
    {
      dataIndex: "category_id",
      width: "15%",
      render: (category_id) => {
        return (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item edit">
              <Link
                to={`/update-category/${category_id}`}
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
                  onClickDelete(category_id);
                }}
              >
                <i className="ri-delete-bin-5-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ];

  const firstExpandedRow = (record, index, indent, expanded) => {
    console.log(record.list_child_categories);
    return (
      record.list_child_categories.length > 0 && (
        <Table
          rowKey={(e) => e.category_id}
          dataSource={record.list_child_categories}
          // expandable={{ expandedRowRender: secondExpandedRow }}
          pagination={false}
          key={(e) => e.category_id}
          columns={sencondColumns}
        />
      )
    );
  };

  document.title = "Chuyên mục | Toà Soạn Hội Tụ";
  return (
    <>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteCategory}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Container fluid>
          <BreadCrumb title="Chuyên mục" pageTitle="Home" />
          <Row>
            <Col lg={12}>
              <Card id="orderList">
                <CardHeader className="card-header border-0">
                  <Row className="align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Danh sách chuyên mục</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <Link to={`/add-category`}>
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
                    {categoryList && categoryList.length && (
                      <Table
                        dataSource={categoryList || []}
                        columns={columns}
                        rowKey={(e) => e.category_id}
                        pagination={pagination}
                        onChange={handleTableChange}
                        key="b"
                        expandable={{
                          expandedRowRender: firstExpandedRow,
                          rowExpandable: (record) =>
                            record.list_child_categories.length > 0,
                        }}
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

export default Category;
