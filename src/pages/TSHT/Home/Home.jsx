import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { DefaultAlertsExample } from "../../BaseUi/UiAlerts/UiAlertsCode";
import React from "react";

const Home = () => {
  document.title = "Trang chủ | Toà Soạn Hội Tụ";
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Trang chủ" pageTitle="Trang chủ" />
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
                <h1>Trang chủ</h1>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
