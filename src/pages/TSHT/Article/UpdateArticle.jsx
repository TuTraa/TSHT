import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { DefaultAlertsExample } from "../../BaseUi/UiAlerts/UiAlertsCode";
import React from "react";

const AddArticle = () => {
  document.title = "Thông tin bài viết | Toà Soạn Hội Tụ";
  return (
    <>
      <div className="page-content">
        <Container fluid={false}>
          <BreadCrumb
            title="Thông tin bài viết"
            pageTitle="Danh sách bài viết"
          />
          <Row>
            <Col lg={12}>
              <Card
                style={{
                  height: 500,
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <h1>Sửa bài viết</h1>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddArticle;
