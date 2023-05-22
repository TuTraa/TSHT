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
  Table,
} from "reactstrap";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAPIPostTag } from "../../../helpers/fakebackend_helper";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ToastCustom from "../../../Components/Common/Toast";
import CustomToastContainer from "../../../Components/Common/ToastContainer";
import Uinestable2 from "../../AdvanceUi/UiNestableList/uinestable2";
import SortablesProcess from "./SortablesProcess";

const AddProcess = () => {
  const [tag, setTag] = useState({});
  let navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      tag_id: (tag && tag.tag_id) || "",
      tag_name: (tag && tag.tag_name) || "",
      tag_slug: (tag && tag.tag_slug) || "",
    },
    validationSchema: Yup.object({
      tag_name: Yup.string().required("Mời bạn nhập tên tag"),
      tag_slug: Yup.string().required("Mời bạn nhập slug tag"),
    }),
    onSubmit: (values) => {
      const newTag = {
        tag_name: values.tag_name,
        tag_slug: values.tag_slug,
      };
      // save new tag
      getAPIPostTag(newTag).then((r) => {
        if (r.status > 0) {
          ToastCustom("Thêm tag thành công", "success");
          validation.resetForm();
          navigate("/process");
        } else if (r.status === -1) {
          ToastCustom("Thêm tag thất bại", "fail");
        } else if (r.status === -2) {
          ToastCustom("Slug của tag bị trùng", "fail");
        }
      });
    },
  });
  return (
    <div>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quy trình" pageTitle="Danh sách quy trình" />
          <Row>
            <Card>
              <CardBody>
                <Col lg={8}>
                  <Form
                    className="tablelist-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-3">
                      <Label htmlFor="tagname-field" className="form-label">
                        Tên quy trình
                      </Label>
                      <Input
                        name="tag_name"
                        id="tagname-field"
                        className="form-control"
                        placeholder="Nhập tên quy trình"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.tag_name || ""}
                        invalid={
                          validation.touched.tag_name &&
                          validation.errors.tag_name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.tag_name &&
                      validation.errors.tag_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.tag_name}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="tagslug-field" className="form-label">
                        Mô tả
                      </Label>
                      <textarea
                        name="tag_slug"
                        id="tagslug-field"
                        className="form-control"
                        placeholder="Nhập mô tả quy trình"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.tag_slug || ""}
                      />
                      {validation.touched.tag_slug &&
                      validation.errors.tag_slug ? (
                        <FormFeedback type="invalid">
                          {validation.errors.tag_slug}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="tagslug-field" className="form-label">
                        Các bước quy trình
                      </Label>
                      <SortablesProcess />
                    </div>

                    <div className="hstack gap-2 justify-content-start">
                      <button type="submit" className="btn btn-success">
                        Thêm mới
                      </button>
                      <Link to={`/tag`}>
                        <button type="button" className="btn btn-light">
                          Quay lại
                        </button>
                      </Link>
                    </div>
                  </Form>
                </Col>
              </CardBody>
            </Card>
          </Row>
          <CustomToastContainer />
        </Container>
      </div>
    </div>
  );
};
export default AddProcess;
