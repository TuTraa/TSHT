import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAPIDeleteEpg,
  getAPIEpgGetListByChannelId,
} from "../../../helpers/fakebackend_helper";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ToastCustom from "../../../Components/Common/Toast";
import CustomToastContainer from "../../../Components/Common/ToastContainer";

import { DatePicker, Table, TreeSelect } from "antd";
import ButtonLiveChannel from "../LiveChannel/ButtonLiveChannel";
import DeleteModal from "../../../Components/Common/DeleteModal";
import moment from "moment";

const Epg = () => {
  document.title = "Kênh EPG | Toà Soạn Hội Tụ";
  const [epgList, setEpgList] = useState();
  const [epgId, setEpgId] = useState({});
  const [epg, setEpg] = useState({});
  const [reload, setReload] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [paginationFilter, setPaginationFilter] = useState({
    current: 1,
    pageSize: 10,
    _date: "",
  });
  const onChangeToDate = (dates, dateStrings) => {
    setPaginationFilter({
      ...paginationFilter,
      _date: dateStrings + " 00:00:00",
    });
    setReload(!reload);
  };

  const { id } = useParams();
  const getEpg = async () => {
    await getAPIEpgGetListByChannelId(0, -1, id).then((res) => {
      setEpg(res.data);
    });
  };
  useEffect(() => {
    getEpg().then((r) => {});
  }, []);

  const onClickDelete = (epg_id) => {
    setEpgId(epg_id);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (epgId) {
      const epg_id = epgId;
      getAPIDeleteEpg(epg_id).then((r) => {
        if (r.status > 0) {
          ToastCustom("Xoá kênh thành công", "success");
          setReload(!reload);
        } else {
          ToastCustom("Xoá kênh thất bại", "fail");
        }
      });
      setDeleteModal(false);
    }
  };

  const handleTableChange = (pagination, filters) => {
    let offset = pagination.current * pagination.pageSize - pagination.pageSize;
    getAPIEpgGetListByChannelId(offset, pagination.pageSize, id).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setEpgList(res.data.list);
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
    getAPIEpgGetListByChannelId(0, -1, id).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        setEpgList(res.data.list);
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

  const channel_title = () => {
    return document.channel_title;
  };

  const columns = useMemo(
    () => [
      {
        title: "STT",
        className: "text-center",
        width: "5%",
        render: (record, row, index) => ({
          children: index + 1,
          props: {
            className: "text-center",
          },
        }),
      },

      {
        title: "Chương trình",
        dataIndex: "program_name",
        width: "20%",
        render: (value) => (
          <Link to="#" className="fw-medium link-primary">
            {value}
          </Link>
        ),
      },
      {
        title: "Mô tả",
        dataIndex: "program_description",
        width: "23%",
        render: (value) => (
          <Link to="#" className="fw-medium link-primary">
            {value}
          </Link>
        ),
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "start_time",
        width: "17%",
        render: (value) => (
          <Link to="#" className="fw-medium link-primary">
            {moment(value).format(" MM/DD/YYYY - h:mm:ss ")}
          </Link>
        ),
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "end_time",
        width: "17%",
        render: (value) => (
          <Link to="#" className="fw-medium link-primary">
            {moment(value).format(" MM/DD/YYYY - h:mm:ss ")}
          </Link>
        ),
      },
      {
        title: "Thời lượng",
        dataIndex: "duration",
        width: "10%",
        render: (value) => (
          <Link to="#" className="fw-medium link-primary">
            {value}
          </Link>
        ),
      },

      {
        title: "Thao tác",
        dataIndex: "channel_id",
        width: "20%",
        render: (_, record) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit">
                <Link
                  to={`/update-epg/${record.epg_id}`}
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
                    onClickDelete(record.epg_id);
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
          <BreadCrumb title="Kênh" pageTitle="Home" />
          <Row>
            <Col lg={12}>
              <Card id="orderList">
                <CardHeader className="card-header border-0">
                  <Row className="align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">
                        Lịch phát sóng kênh {channel_title()}
                      </h5>
                    </div>
                    <div className="col-lg">
                      <Row>
                        <Col className="col-4" style={{ marginLeft: "60%" }}>
                          <DatePicker
                            allowClear
                            onChange={onChangeToDate}
                            placeholder="Từ ngày..."
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <Link to={`/add-epg`}>
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
                    {epgList && epgList.length && (
                      <Table
                        className="overflow-auto"
                        columns={columns}
                        dataSource={epgList || []}
                        pagination={pagination}
                        onChange={handleTableChange}
                        rowKey={"live_channel_id"}
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
export default Epg;
