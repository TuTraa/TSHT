import BreadCrumb from "../../../Components/Common/BreadCrumb";
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Select } from "antd";

import { getAPIListArticleType } from "../../../helpers/fakebackend_helper";
import NormalArticle from "./ArticleType/NormalArticle";
const AddArticle = () => {
  document.title = "Tạo bài viết | Toà Soạn Hội Tụ";
  const [articleType, setArticleType] = useState([]);
  const [selectedArticleType, setSelectedArticleType] = useState(0);
  function handleChange(value) {
    setSelectedArticleType(value);
  }
  useEffect(() => {
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
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb
            title="Thêm bài viết"
            pageTitle="Danh sách bài viết"
            previousLink="/list-article"
          />
          <Card>
            <CardBody>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="article_sapo" className="form-label">
                  Loại bài viết
                </Label>
                <Select
                  placeholder="Chọn loại bài viết"
                  style={{ width: 220 }}
                  onChange={handleChange}
                  options={articleType}
                />
              </div>
            </CardBody>
          </Card>
          {selectedArticleType === 1 ? (
            <NormalArticle article_type={selectedArticleType} />
          ) : (
            <></>
          )}
        </Container>
      </div>
    </>
  );
};

export default AddArticle;
