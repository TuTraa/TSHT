import { Space, Table, Tag, Select } from 'antd';
import { Container } from 'reactstrap';
import {
    getAPIDeleteArticle,
    getAPIListArticle,
    getAPIListAuthor,
    getAPIListCategory,
} from "../../../helpers/fakebackend_helper";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import React, { useEffect, useMemo, useState } from "react";
import ToastCustom from "../../../Components/Common/Toast";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
const SpanArticle = styled.p`
  font-size: 12px;
  color: #6f727a;
`;

const StatusBtn = styled.p`
  border: 1px solid #ffffff;
  border-radius: 20px;
  width: 83px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-bottom: 5px;
`;

const btnNew = {
    background: "#FFD88C",
    color: "#F47113",
};
const btnPending = {
    background: "#8F49E7",
    color: "#FFFFFF",
};
const btnIsWaitApproved = {
    background: "#FFD88C",
    color: "#FFFFFF",
};
const btnPublished = {
    background: "#256AD0",
    color: "#FFFFFF",
};
const btnDelete = {
    background: "#FC957F",
    color: "#FF0000",
};


const onClickDelete = (article_id) => {
    // setArticleId(article_id);
    // setDeleteModal(true);
    alert('onclick delete')
};

const Article2 = () => {
    const [articleList, setArticleList] = useState();
    const [paginationFilter, setPaginationFilter] = useState({
        current: 1,
        pageSize: 10,
        _article_title: "",
        _category_id: "",
        _author: "",
        _todate: "",
        _fromdate: "",
    });
    const [reload, setReload] = useState(false);
    useEffect(() => {
        let offset = 0
        getAPIListArticle(
            offset,
            paginationFilter.pageSize,
            paginationFilter._article_title,
            paginationFilter._category_id,
            paginationFilter._author,
            paginationFilter._todate,
            paginationFilter._fromdate
        ).then((res) => {
            if (res.data && res.data.list && res.status > 0) {
                setArticleList(res.data.list);
                setPaginationFilter({ ...paginationFilter, total: res.data.total });
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
                setArticleList([]);
            }
            // setIsLoading(false);
        });
    }, [reload]);
    const pArticle = {
        marginBottom: 5,
    };
    console.log('list:', articleList);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    console.log('data list', articleList)
    const columns = useMemo(
        () => [
            {
                title: "Tên bài viết",
                width: "35%",
                render: (record) => (
                    <div className="d-flex flex-column">
                        <p style={{ pArticle }}>{record.article_title}</p>
                        <SpanArticle>
                            {record.article_type_name}{" "}
                            {record.created_date === null
                                ? ""
                                : `| ${moment(new Date(record.created_date)).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                )}`}
                        </SpanArticle>
                    </div>
                ),
            },
            {
                title: "Chuyên mục",
                width: "18%",
                render: (record) => (
                    <div className="d-flex flex-column">
                        <p style={pArticle}>{record.category_name}</p>
                        <SpanArticle
                            style={{
                                color: "rgba(26, 114, 246, 0.8)",
                                fontSize: "12px",
                                fontWeight: 700,
                            }}
                        >
                            {(record.is_selected === 1 && "Tin tiêu điểm") ||
                                (record.outstanding === 1 && "Tin nổi bật") ||
                                ""}
                        </SpanArticle>
                    </div>
                ),
            },
            {
                title: "Tác giả",
                width: "16%",
                render: (record) => (
                    <div className="d-flex flex-column">
                        <p style={{ pArticle }}>{record.author_name}</p>
                        <SpanArticle style={{ minHeight: 18 }}>
                            {record.other_author?.trim().length >= 1 ? "Nhóm tác giả" : ""}
                        </SpanArticle>
                    </div>
                ),
            },
            {
                title: "Trạng thái",
                width: "15%",
                render: (record) => (
                    <div className="d-flex flex-column" style={{ marginBottom: 10 }}>
                        <StatusBtn
                            style={
                                (record.article_status_id === 1 && btnNew) ||
                                (record.article_status_id === 2 && btnPending) ||
                                (record.article_status_id === 3 && btnIsWaitApproved) ||
                                (record.article_status_id === 4 && btnPublished) ||
                                (record.article_status_id === 5 && btnDelete)
                            }
                        >
                            {record.status}
                        </StatusBtn>
                        <SpanArticle>
                            {record.modified_date === null
                                ? ""
                                : moment(new Date(record.modified_date)).format(
                                    "DD/MM/YYYY HH:mm:s"
                                )}
                        </SpanArticle>
                    </div>
                ),
            },

            {
                title: "Thao tác",
                width: "8%",
                render: (record) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item edit">
                                <Link
                                    to={`/`}
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
                                        onClickDelete(record.article_id);
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
        <div style={{ margin: 94, backgroundColor: '#fff', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <div></div>
            <Container fluid={true}>
                <BreadCrumb title="Bài viết" pageTitle="Home" />
            </Container>
            <Space wrap>
                <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        // { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                />
            </Space>
            {
                articleList && articleList.length > 0 &&
                <Table columns={columns} dataSource={articleList} />

            }
        </div>
    );
}

export default Article2;