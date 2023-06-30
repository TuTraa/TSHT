import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import CustomToastContainer from "../../../Components/Common/ToastContainer";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  getAPIDeleteArticle,
  statisticalArticlePriceGetList,
  getAPIListArticle,
  getAPIListAuthor,
  getAPIListCategory,
  getAPIListArticleType,
} from "../../../helpers/fakebackend_helper";
import * as Antd from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Space, Table, Tag, TreeSelect, DatePicker } from 'antd';
import moment from "moment";
import styled from "styled-components";
import { CaretUpOutlined } from '@ant-design/icons';
import { CaretDownOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const ArticlePrice = () => {
  const [articleList, setAritcleList] = useState(); // data list article
  const [reload, setReload] = useState(false); //reload useEfect list article

  //data select 
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsAuthor, setOptionsAuthor] = useState([]);
  const [articleType, setArticleType] = useState([]);

  const [valueCategory, setValueCategory] = useState();
  const [valueAuthor, setValueAuthor] = useState();
  const [valueArticleType, setValueArticleType] = useState();

  const [arrangeTime, setArrangeTime] = useState(false);

  let keyWord = "";
  const [paginationFilter, setPaginationFilter] = useState({
    _author_id: "",
    _category_id: "",
    _article_type_id: "",
    _fromdate: "",
    _todate: "",
    current: 0,
    pageSize: 20,
  });

  // css
  const divContainer = {
    marginTop: 93,
  }
  const lineHeightP = {
    lineHeight: .7
  }
  const SpanArticle = styled.p`
  font-size: 12px;
  color: #6f727a;
`;

  // get data list article
  useEffect(() => {
    let offset = 0;
    statisticalArticlePriceGetList(

      paginationFilter._author_id,
      paginationFilter._category_id,
      paginationFilter._article_type_id,
      paginationFilter._fromdate,
      paginationFilter._todate,
      offset,
      paginationFilter.pageSize,
    ).then((res) => {
      if (res && res.data) {
        let dataAricle = res.data.list;
        if (arrangeTime) {
          dataAricle = dataAricle.reverse();

        }
        setAritcleList(dataAricle)
      }
      if (res && res.data === null) {
        setAritcleList("")
      }
    })
  }, [reload])

  // get data option
  useEffect(() => {

    // get list author
    getAPIListAuthor().then((res) => {
      if (res && res.data && res.status > 0) {

        let options = [];
        res.data.forEach(element => {
          options.push({
            value: element.user_id,
            label: element.author_name,
          })
          setOptionsAuthor(options);
        });
      }
    })

    // get list category
    getAPIListCategory(0, -1).then((res) => {
      var options = [];
      if (res.data && res.data.list && res.status > 0) {
        res.data.list.forEach((e) => {
          options.push({
            value: e.category_id,
            title: e.category_name,
            children: e.list_child_categories.map((x) => ({
              value: x.category_id,
              title: x.category_name,
            })),
          });
        });
      }
      setOptionsCategory(options);
    });
    // get list artilce type
    getAPIListArticleType().then((res) => {
      if (res.data && res.status > 0) {
        let result = [];
        res.data.map((e) => {
          result.push({
            value: e.article_type_id,
            label: e.article_type_name,
          });
        });
        setArticleType(result);
      }
    });
  }, []);

  // onchange select author
  const onChangeAuthor = (newValue) => {
    if (newValue === undefined) {
      newValue = null;
      console.log('no author', newValue)
    }
    setPaginationFilter({
      ...paginationFilter,
      _author_id: newValue === null ? "" : newValue,
    });
    setValueAuthor(newValue);
    setReload(!reload);
  }

  // onchange select fromdate
  const onChangeFromDate = (dates, dateStrings) => {
    if (dateStrings === "") {
      setPaginationFilter({
        ...paginationFilter,
        _fromdate: "",
      });
    }
    else {
      setPaginationFilter({
        ...paginationFilter,
        _fromdate: dateStrings + " 00:00:00",
      });
    }
    setReload(!reload);
  };

  const onChangeToDate = (dates, dateStrings) => {

    setPaginationFilter({
      ...paginationFilter,
      _todate: dateStrings + " 00:00:00",
    });
    setReload(!reload);
  };

  const onChangeCategory = (newValue) => {
    if (newValue === undefined) {
      newValue = null;
    }
    setPaginationFilter({
      ...paginationFilter,
      _category_id: newValue === null ? "" : newValue,
    });
    setValueCategory(newValue);
    setReload(!reload);
  };

  const onChangeArticleType = (newValue) => {
    if (newValue === undefined) {
      newValue = null;
    }
    setPaginationFilter({
      ...paginationFilter,
      _article_type_id: newValue === null ? "" : newValue,
    })
    setValueArticleType(newValue);
    setReload(!reload);
  }

  const onchangeArrangeTime = () => {
    // setAritcleList(articleList.reverse())
    setArrangeTime(!arrangeTime);
    setReload(!reload)
    // setReload(!reload);
  }
  let isLoading = false;

  const exportExcel = () => {

    let data = articleList.map((e) => {
      return [
        e.article_title,
        e.author,
        e.category_name,
        e.article_type_name,
        `Nội dụng : ${e.content_quality} \n Ảnh : ${e.image_quality}\n Khác : ${e.other_quality}`,
        moment(new Date(e.created_date)).format("DD/MM/YYYY HH:mm"),
      ]
    });
    data.unshift(['Tiêu đề', 'Tác giả', 'Chuyên mục', 'Loại bài', 'Nhuận bút', 'Ngày xuất bản']);


    const headerCellStyle = {
      font: {
        bold: true
      }
    };
    const ws = XLSX.utils.aoa_to_sheet(data);

    // console.log('data excel:', data)

    const headerRange = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: data[0].length - 1, r: 0 } });
    ws['!rows'] = [{ s: { font: { bold: true } } }];

    const htmlCellStyle = {
      s: {
        alignment: {
          wrapText: true
        }
      }
    };
    ws['A1'].s = htmlCellStyle;

    // Thiết lập định dạng cho phạm vi dòng đầu tiên
    for (let i = 0; i < data[0].length; i++) {
      const cellAddress = XLSX.utils.encode_cell({ c: i, r: 0 });
      ws[cellAddress].s = headerCellStyle;
    }

    // Điều chỉnh độ rộng các cột
    const columnWidths = data[0].map((_, colIndex) => {
      const maxLength = Math.max(...data.map((row) => (row[colIndex] || '').toString().length));
      return { wch: maxLength };
    });
    ws['!cols'] = columnWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const fileData = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    FileSaver.saveAs(fileData, 'article-price.xlsx');
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  console.log('list data:', articleList)

  const columns = useMemo(() => [
    {
      title: (
        <div style={{ display: 'flex' }}>
          Tiêu đề
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 10,
            marginLeft: '3px',
            fontSize: '15px',
          }}>
            <CaretUpOutlined style={arrangeTime ? { color: "rgb(172 173 173)", marginTop: '0px' } : { marginTop: '0px' }} onClick={onchangeArrangeTime} />
            <CaretDownOutlined style={arrangeTime ? { marginTop: '-4px' } : { marginTop: '-4px', color: 'rgb(172 173 173)' }} onClick={onchangeArrangeTime} />
          </div>
        </div >
      ),
      width: '45%',
      key: 'premise',
      render: (record) => (
        < div >
          <p style={{ color: '#3668C9', fontSize: 14 }}>{record.article_title}</p>
          <p style={{ marginLeft: 3, fontSize: 12, fontWeight: 400 }}>{record.author}</p>
        </div >
      ),
    },
    {
      title: 'Chuyên mục',
      key: 'categories',
      width: '13%',
      render: (record) => (<>{record.category_name}</>)
    },
    {
      title: 'Loại bài',
      key: 'postStyle',
      width: '13%',
      render: (record) => (<>{record.article_type_name}</>)
    },
    {
      title: 'Nhuận bút',
      key: 'getPen',
      width: '13%',
      render: (record) => (<>
        <p style={lineHeightP}>Nội dụng: {record.content_quality}</p>
        <p style={lineHeightP}>Ảnh: {record.image_quality}</p>
        <p style={{ lineHeight: .7, marginBottom: 0 }}>Khác: {record.other_quality}</p>
      </>)
    },
    {
      title: 'Ngày xuất bản',
      key: 'publicationDate',
      // sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date),
      // sortDirections: arrangeTime ? ['descend'] : ['ascend'],
      render: (record) => (
        <SpanArticle>
          {moment(new Date(record.created_date)).format("DD/MM/YYYY HH:mm")}
        </SpanArticle>
      ),
    },
  ]);

  return <>
    <div style={divContainer} className="article-page">
      <Container fluid={true}>
        <BreadCrumb style={{ backgroundColor: '#000' }} title="Thống kê nhuận bút" pageTitle="Tất cả" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-lg">
                    <Row>
                      <Col className="col-2">
                        <TreeSelect
                          style={{
                            width: "100%",
                          }}
                          value={valueAuthor}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          allowClear
                          treeData={optionsAuthor}
                          treeDefaultExpandAll
                          placeholder="Tác giả"
                          onChange={onChangeAuthor}
                        />
                      </Col>
                      <Col className="col-2">
                        <TreeSelect
                          style={{
                            width: "100%",
                          }}
                          value={valueCategory}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          allowClear
                          treeData={optionsCategory}
                          treeDefaultExpandAll
                          placeholder="Chuyên mục"
                          onChange={onChangeCategory}
                        />
                      </Col>

                      <Col className="col-2">
                        <TreeSelect
                          style={{
                            width: "100%",
                          }}
                          value={valueArticleType}
                          dropdownStyle={{
                            maxHeight: 400,
                            overflow: "auto",
                          }}
                          allowClear
                          treeData={articleType}
                          treeDefaultExpandAll
                          placeholder="Loại bài viết"
                          onChange={onChangeArticleType}
                        />
                      </Col>
                      <Col className="col-4">
                        <Row>
                          <Col className="col-6">
                            <DatePicker
                              style={{ width: '100%' }}
                              allowClear
                              onChange={onChangeFromDate}
                              placeholder="Từ ngày"
                            />
                          </Col>
                          <Col className="col-6">
                            <DatePicker
                              allowClear
                              style={{ width: '100%' }}
                              onChange={onChangeToDate}
                              placeholder="Đến ngày"
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col className="col-2">
                        <Row>
                          <div className="col-6">
                            <div className="d-flex gap-1 flex-wrap">
                              <Link to={`/add-article`}>
                                <button
                                  type="button"
                                  className="btn btn-success add-btn"
                                  id="statistical-btn"
                                  style={{ padding: '6px 8px' }}
                                >
                                  Thống kê
                                </button>
                              </Link>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex gap-1 flex-wrap">
                              {/* <Link to={`/add-article`}> */}
                              <button
                                type="button"
                                className="btn btn-success add-btn"
                                id="export-btn"
                                style={{ padding: '6px 6px', backgroundColor: '#F47113', border: '1px solid #F47113' }}
                                onClick={exportExcel}
                              >
                                Xuất excel
                              </button>
                              {/* </Link> */}
                            </div>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  {!isLoading ? (
                    articleList && articleList.length > 0 ? (
                      <Table
                        className="overflow-auto"
                        columns={columns}
                        dataSource={articleList}
                        rowKey={"article_id"}
                      />
                    ) : (
                      <div
                        style={{
                          height: 500,
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h2>Không có dữ liệu</h2>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        height: 500,
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* <Spin /> */}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CustomToastContainer />
      </Container>
    </div>
    {/* <div>{articleList.map(e => (<>{e.article_id}</>))}</div> */}
  </>;
};

export default ArticlePrice;
