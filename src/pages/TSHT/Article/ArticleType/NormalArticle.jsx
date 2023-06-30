import React, { useState, useRef, useEffect } from "react";
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
import { TreeSelect } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastCustom from "../../../../Components/Common/Toast";
import CustomToastContainer from "../../../../Components/Common/ToastContainer";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import {
  getAPIPostArticle,
  getAPIPostTag,
} from "../../../../helpers/fakebackend_helper";
import { FilePond, registerPlugin } from "react-filepond";
import Dropzone from "react-dropzone";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//api
import {
  getAPIDeleteTag,
  getAPIListArticle,
  getAPIListAuthor,
  getAPIListCategory,
} from "../../../../helpers/fakebackend_helper";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const NormalArticle = ({ article_type }) => {
  const [selectedFiles, setselectedFiles] = useState([]);
  const [valueCategory, setValueCategory] = useState();
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [valueAuthor, setValueAuthor] = useState();
  const [optionsAuthor, setOptionsAuthor] = useState([]);
  let navigate = useNavigate();
  const editorRef = useRef(null);

  function onChangeAuthor(value) {
    if (value === undefined) {
      value = null;
    }
    setValueAuthor(value);
  }
  function onChangeCategory(value) {
    if (value === undefined) {
      value = null;
    }
    setValueCategory(value);
  }
  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  document.title = "Thêm bài viết | Toà Soạn Hội Tụ";
  const [files, setFiles] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      article_title: "",
      article_sapo: "",
      slug: "",
    },
    validationSchema: Yup.object({
      article_title: Yup.string().required("Mời bạn nhập tên bài viết"),
      article_sapo: Yup.string().required("Mời bạn nhập sapo cho bài viết"),
      slug: Yup.string().required("Mời bạn nhập slug cho bài viết"),
    }),
    onSubmit: (values) => {
      const result = {
        article_title: values.article_title,
        article_sapo: values.article_sapo,
        category_id: valueCategory,
        author: valueAuthor,
        other_author: "",
        article_type_id: article_type,
        article_content: editorRef.current.getContent(),
        avatar_image: "",
        leak_url: "",
        outstanding: 0,
        tag_list: "",
        slug: values.slug,
        note: "",
        user_create_id: 90,
        publish_date: "2023-05-09T12:52:36.636Z",
        user_modify_id: "",
      };

      if (!result.article_content) {
        ToastCustom("Mời bạn nhập nội dung bài viết", "fail");
      } else if (!result.article_type_id) {
        ToastCustom("Loại bài viết không xác định", "fail");
      } else if (!result.author) {
        ToastCustom("Mời bạn chọn tác giả bài viết", "fail");
      } else if (!result.category_id) {
        ToastCustom("Mời bạn chọn chuyên mục bài viết", "fail");
      } else {
        // save new article
        console.log(result);
        getAPIPostArticle(result).then((r) => {
          if (r.status > 0) {
            ToastCustom("Thêm bài viết thành công", "success");
            validation.resetForm();
            navigate("/list-article");
          } else if (r.status === -1) {
            ToastCustom("Thêm bài viết thất bại", "fail");
          } else if (r.status === -2) {
            ToastCustom("Slug của bài viết bị trùng", "fail");
          }
        });
      }
    },
  });
  useEffect(() => {
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
    getAPIListAuthor().then((res) => {
      if (res.data && res.status > 0) {
        var options = [];
        res.data.forEach((e) => {
          options.push({
            value: e.user_id,
            label: e.author_name,
          });
        });
      }
      setOptionsAuthor(options);
    });
  }, []);
  return (
    <>
      <Row>
        <Col lg={8}>
          <Card>
            <CardBody>
              <Form
                className="tablelist-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="mb-3">
                  <Label htmlFor="article_title" className="form-label">
                    Tiêu đề
                  </Label>
                  <Input
                    name="article_title"
                    type="text"
                    className="form-control"
                    id="article_title"
                    placeholder="Toà Soạn Hội Tụ"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.article_title &&
                        validation.errors.article_title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.article_title &&
                    validation.errors.article_title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.article_title}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label htmlFor="article_sapo" className="form-label">
                    Sapo
                  </Label>
                  <Input
                    name="article_sapo"
                    type="text"
                    className="form-control"
                    id="article_sapo"
                    placeholder="Toà Soạn Hội Tụ"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.article_sapo &&
                        validation.errors.article_sapo
                        ? true
                        : false
                    }
                  />
                  {validation.touched.article_sapo &&
                    validation.errors.article_sapo ? (
                    <FormFeedback type="invalid">
                      {validation.errors.article_sapo}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label htmlFor="article_content" className="form-label">
                    Nội dung
                  </Label>
                  <Editor
                    tinymceScriptSrc={
                      process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                    }
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>Toà Soạn Hội Tụ.</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
                <div className="hstack gap-2 justify-content-end">
                  <button type="submit" className="btn btn-success">
                    Lưu bài viết
                  </button>
                  <button className="btn btn-primary">Chuyển tiếp</button>
                </div>
                <div className="mb-3">
                  <Label htmlFor="article_category" className="form-label">
                    Chuyên mục
                  </Label>
                  <TreeSelect
                    style={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    allowClear
                    treeData={optionsCategory}
                    treeDefaultExpandAll
                    placeholder="Chuyên mục"
                    value={valueCategory}
                    onChange={onChangeCategory}
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="article_author" className="form-label">
                    Tác giả
                  </Label>
                  <TreeSelect
                    style={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    allowClear
                    treeData={optionsAuthor}
                    treeDefaultExpandAll
                    placeholder="Tác giả"
                    value={valueAuthor}
                    onChange={onChangeAuthor}
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="slug" className="form-label">
                    Slug
                  </Label>
                  <Input
                    name="slug"
                    type="text"
                    className="form-control"
                    id="slug"
                    placeholder="slug"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.slug && validation.errors.slug
                        ? true
                        : false
                    }
                  />
                  {validation.touched.slug && validation.errors.slug ? (
                    <FormFeedback type="invalid">
                      {validation.errors.slug}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label htmlFor="article_relevant" className="form-label">
                    Tin liên quan
                  </Label>
                  <TreeSelect
                    style={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    allowClear
                    // treeData={optionsAuthor}
                    treeDefaultExpandAll
                    placeholder="Tin liên quan"
                  // value={valueAuthor}
                  // onChange={onChangeAuthor}
                  />
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <CardBody>
              <Form
                className="tablelist-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="mb-3">
                  <Label htmlFor="article_image" className="form-label">
                    Ảnh bài viết
                  </Label>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone dz-clickable">
                        <div
                          className="dz-message needsclick"
                          {...getRootProps()}
                        >
                          <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                          </div>
                          <h4>Kéo và thả ảnh vào đây để tải ảnh lên.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="list-unstyled mb-0" id="file-previews">
                    {selectedFiles.map((f, i) => {
                      return (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                              <Col style={{ display: "flex", gap: "5px" }}>
                                <button className="btn btn-success">
                                  Thêm
                                </button>
                                <button className="btn btn-danger">Xoá</button>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-3">
                  <Label htmlFor="article_avatar" className="form-label">
                    Ảnh đại diện
                  </Label>
                  <FilePond
                    files={avatar}
                    onupdatefiles={setAvatar}
                    allowMultiple={false}
                    name="article_avatar"
                    className="filepond filepond-input-multiple"
                    labelIdle="Kéo và thả ảnh vào đây để tải ảnh lên."
                  />
                </div>
                <div className="mb-3">
                  <div className="card">
                    <div className="card-header">
                      <Label htmlFor="article_price" className="form-label">
                        Nhuận bút
                      </Label>
                    </div>

                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <Label htmlFor="stat" className="text-muted">
                            Hệ số nội dung
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            className="form-control"
                            id="stat"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Label htmlFor="stat" className="text-muted">
                            Hệ số ảnh
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            className="form-control"
                            id="stat"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <Label htmlFor="stat" className="text-muted">
                            Hệ số video
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            className="form-control"
                            id="stat"
                          />
                        </div>
                        <div className="col-lg-6">
                          <Label htmlFor="stat" className="text-muted">
                            Hệ số audio
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            className="form-control"
                            id="stat"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-6">
                          <Label htmlFor="stat" className="text-muted">
                            Hệ số khác
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            className="form-control"
                            id="stat"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-12">
                          <Label htmlFor="note" className="text-muted">
                            Ghi chú
                          </Label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="note"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-lg-12">
                          <button className="btn btn-success">
                            Chấm nhuận bút
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="article_title" className="form-label">
                      Nhập link từ báo khác
                    </Label>
                    <div className="input-group">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Example text with two button addons"
                      />
                      <button className="btn btn-primary" type="button">
                        Lấy bài
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div
                      className="form-check form-switch form-switch-lg"
                      dir="ltr"
                    >
                      <Label
                        className="form-check-label"
                        htmlFor="customSwitchsizelg"
                      >
                        Cho phép bình luận
                      </Label>
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="article_enable_comment"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div
                      className="form-check form-switch form-switch-lg"
                      dir="ltr"
                    >
                      <Label
                        className="form-check-label"
                        htmlFor="customSwitchsizelg"
                      >
                        Lưu kho tin nổi bật
                      </Label>
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="article_is_outstanding"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </>
  );
};
export default NormalArticle;
