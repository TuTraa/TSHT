import React, { useEffect, useState } from "react";
import {
  getAPICategoryById,
  getAPIDepartmentById,
  getAPIListCategory,
  getAPIPostCategory,
  getAPIPutCategory,
} from "../../../helpers/fakebackend_helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastCustom from "../../../Components/Common/Toast";
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
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import uploadImg from "../../../assets/images/small/img-4.jpg";
import CustomToastContainer from "../../../Components/Common/ToastContainer";

const UpdateCategory = () => {
  const [category, setCategory] = useState({});
  const [listCategory, setListCategory] = useState([]);

  const { id } = useParams();
  const getCategory = async () => {
    await getAPICategoryById(id).then((res) => {
      setCategory(res.data);
    });
  };
  useEffect(() => {
    getCategory().then((r) => {});
  }, []);

  useEffect(() => {
    getAPIListCategory(0, -1).then((res) => {
      if (res.data && res.data.list && res.status > 0) {
        const filterList = res.data.list.filter(
          (e) => e.category_id !== parseInt(id)
        );
        console.log(filterList);
        setListCategory(filterList);
      }
    });
  }, []);
  document.title = "Sửa chuyên mục | Toà Soạn Hội Tụ";

  let navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      category_name: (category && category.category_name) || "",
      parent_id: (category && category.parent_id) || "",
      category_slug: (category && category.category_slug) || "",
      title: (category && category.title) || "",
      image_url: (category && category.image_url) || "",
      description: (category && category.description) || "",
      keyword: (category && category.keyword) || "",
    },
    validationSchema: Yup.object({
      category_name: Yup.string().required("Mời bạn nhập tên chuyên mục"),
    }),
    onSubmit: (values) => {
      const updateCategory = {
        category_id: id,
        category_name: values.category_name,
        parent_id: values.parent_id === "" ? 0 : values.parent_id,
        category_slug: values.category_slug,
        title: values.title,
        image_url: values.image_url,
        description: values.description,
        keyword: values.keyword,
        user_modify_id: 1,
      };
      // save new category
      getAPIPutCategory(updateCategory).then((r) => {
        if (r.status > 0) {
          ToastCustom("Sửa chuyên mục thành công", "success");
          validation.resetForm();
          navigate("/list-category");
        } else if (r.status === -1) {
          ToastCustom("Sửa chuyên mục thất bại", "fail");
        } else if (r.status === -2) {
          ToastCustom("Slug chuyên mục bị trùng", "fail");
        }
      });
    },
  });
  return (
    <div>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Sửa chuyên mục" pageTitle="Danh sách chuyên mục" />
          <Row>
            <Card>
              <CardBody>
                <Col lg={12}>
                  <Form
                    className="tablelist-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="categoryname-field"
                            className="form-label"
                          >
                            Tên
                          </Label>
                          <Input
                            name="category_name"
                            id="categoryname-field"
                            className="form-control"
                            placeholder="Nhập tên chuyên mục"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.category_name || ""}
                            invalid={
                              !!(
                                validation.touched.category_name &&
                                validation.errors.category_name
                              )
                            }
                          />
                          {validation.touched.category_name &&
                          validation.errors.category_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.category_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="parentid-field"
                            className="form-label"
                          >
                            Chuyên mục cha
                          </Label>
                          <Input
                            name="parent_id"
                            type="select"
                            className="form-select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.parent_id || ""}
                          >
                            <option value="">Chọn chuyên mục cha</option>
                            {listCategory &&
                              listCategory?.map((item, key) => (
                                <option
                                  className="form-control"
                                  value={item.category_id}
                                  key={key}
                                >
                                  {item.category_name}
                                </option>
                              ))}
                          </Input>
                        </div>
                      </Col>
                    </Row>
                    <div className="mb-3">
                      <Label htmlFor="slug-field" className="form-label">
                        Slug
                      </Label>
                      <Input
                        name="category_slug"
                        id="slug-field"
                        className="form-control"
                        placeholder="Nhập slug chuyên mục"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.category_slug || ""}
                      />
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="title-field" className="form-label">
                        Tiêu đề (SEO)
                      </Label>
                      <Input
                        name="title"
                        id="title-field"
                        className="form-control"
                        placeholder="Nhập tiêu đề chuyên mục"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.title || ""}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="title-field" className="form-label">
                        Thêm ảnh (SEO)
                      </Label>
                      <div>
                        <figure className="figure">
                          <img
                            style={{
                              width: 300,
                              height: 250,
                              objectFit: "cover",
                            }}
                            src={uploadImg}
                            className="figure-img img-fluid rounded"
                            alt="..."
                          />
                        </figure>
                      </div>
                      <button
                        type="button"
                        className="btn"
                        style={{ background: "gray", color: "white" }}
                      >
                        Upload ảnh
                      </button>
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="description-field" className="form-label">
                        Mô tả (SEO)
                      </Label>
                      <Input
                        name="description"
                        id="description-field"
                        className="form-control"
                        placeholder="Nhập mô tả chuyên mục"
                        type="textarea"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        rows="4"
                        value={validation.values.description || ""}
                      />
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="keyword-field" className="form-label">
                        Từ khoá (SEO)
                      </Label>
                      <Input
                        name="keyword"
                        id="keyword-field"
                        className="form-control"
                        placeholder="Nhập từ khoá chuyên mục "
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.keyword || ""}
                      />
                    </div>
                    <div className="hstack gap-2 justify-content-start mt-4">
                      <button type="submit" className="btn btn-success">
                        Chỉnh sửa
                      </button>
                      <Link to={`/list-category`}>
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
export default UpdateCategory;
