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
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAPIListCategory,
  getAPIListLiveChannelSourceType,
  getAPIPostChannel,
  getAPIPostTag,
} from "../../../helpers/fakebackend_helper";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ToastCustom from "../../../Components/Common/Toast";
import CustomToastContainer from "../../../Components/Common/ToastContainer";

import { DatePicker, TreeSelect } from "antd";
import ButtonLiveChannel from "../LiveChannel/ButtonLiveChannel";
import Cleave from "cleave.js/react";

const AddEpg = () => {
  document.title = "Thêm kênh Live | Toà Soạn Hội Tụ";

  const [paginationFilter, setPaginationFilter] = useState({
    current: 1,
    pageSize: 10,
  });
  const [reload, setReload] = useState(false);
  const [valueSourceType, setValueSourceType] = useState();
  const [optionsSourceType, setOptionsSourceType] = useState([]);
  const onChangeSourceType = (newValue) => {
    if (newValue === undefined) {
      newValue = null;
    }

    setPaginationFilter({
      ...paginationFilter,
      _live_channel_source_type_id: newValue === null ? "" : newValue,
    });
    setValueSourceType(newValue);
    setReload(!reload);
  };

  const [timeStartFormat, setTimeStartFormat] = useState("");
  const [timeEndFormat, setTimeEndFormat] = useState("");

  function onTimeStartFormatChange(e) {
    setTimeStartFormat(e.target.rawValue);
  }
  function onTimeEndFormatChange(e) {
    setTimeEndFormat(e.target.rawValue);
  }

  useEffect(() => {
    getAPIListLiveChannelSourceType().then((res) => {
      var options = [];
      if (res.data && res.data && res.status > 0) {
        res.data.forEach((e) => {
          options.push({
            value: e.live_channel_source_type_id,
            title: e.source_type,
          });
        });
      }
      setOptionsSourceType(options);
    });
  }, []);

  const [channel, setChannel] = useState({});
  let navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      channel_id: (channel && channel.channel_id) || "",
      channel_title: (channel && channel.channel_title) || "",
      description: (channel && channel.description) || "",
      link: (channel && channel.link) || "",
      slug: (channel && channel.slug) || "",
      source_type: (channel && channel.source_type) || "",
      channel_status: (channel && channel.channel_status) || 0,
      drm_status: (channel && channel.drm_status) || 0,
      // live_channel_source_type_id: (channel && channel.live_channel_source_type_id) || "",
      user_create_id: 1,
    },
    validationSchema: Yup.object({
      channel_title: Yup.string().required("Mời bạn nhập tên kênh"),
      description: Yup.string().required("Mời bạn nhập mô tả"),
      link: Yup.string().required("Mời bạn nhập đường dẫn kênh"),
      slug: Yup.string().required("Mời bạn nhập slug"),
    }),
    onSubmit: (values) => {
      const newChannel = {
        channel_title: values.channel_title,
        description: values.description,
        link: values.link,
        slug: values.slug,
        source_type:
          optionsSourceType.find((e) => {
            return e.value === values.source_type;
          }) || optionsSourceType[0].title,
        channel_status: values.channel_status,
        drm_status: values.drm_status,
        user_create_id: 1,
      };

      // save new liveChannel
      getAPIPostChannel(newChannel).then((r) => {
        if (r.status >= 0) {
          ToastCustom("Thêm kênh thành công", "success");
          validation.resetForm();
          navigate("/list-live-channel");
        } else if (r.status < 0) {
          ToastCustom(r.message ? r.message : "Thêm kênh thất bại", "fail");
        }
      });
    },
  });
  return (
    <div>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Thêm Mới Kênh Live" pageTitle="Danh sách kênh" />
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
                    <div className="row">
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="tagname-field" className="form-label">
                            Tên chương trình
                          </Label>
                          <Input
                            name="channel_title"
                            id="tagname-field"
                            className="form-control"
                            placeholder="Nhập tên kênh"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.channel_title || ""}
                            invalid={
                              validation.touched.channel_title &&
                              validation.errors.channel_title
                                ? true
                                : false
                            }
                          />
                          {validation.touched.channel_title &&
                          validation.errors.channel_title ? (
                            <FormFeedback type="invalid">
                              {validation.errors.channel_title}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col xl={3}>
                        <div className="mb-3">
                          <label
                            htmlFor="cleave-time-format"
                            className="form-label"
                          >
                            Thời gian bắt đầu
                          </label>
                          <Cleave
                            placeholder="hh:mm"
                            options={{
                              time: true,
                              timePattern: ["h", "m"],
                            }}
                            value={timeStartFormat}
                            onChange={(e) => onTimeStartFormatChange(e)}
                            className="form-control"
                          />
                        </div>
                      </Col>
                      <Col xl={3}>
                        <div className="mb-3">
                          <label
                            htmlFor="cleave-time-format"
                            className="form-label"
                          >
                            Thời gian kết thúc
                          </label>
                          <Cleave
                            placeholder="hh:mm"
                            options={{
                              time: true,
                              timePattern: ["h", "m"],
                            }}
                            value={timeEndFormat}
                            onChange={(e) => onTimeEndFormatChange(e)}
                            className="form-control"
                          />
                        </div>
                      </Col>
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="description-field" className="form-label">
                        Mô tả
                      </Label>
                      <textarea
                        name="description"
                        id="description-field"
                        className="form-control"
                        placeholder="Nhập mô tả"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ""}
                      />
                      {validation.touched.description &&
                      validation.errors.description ? (
                        <FormFeedback type="invalid">
                          {validation.errors.description}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="hstack gap-2 justify-content-start">
                      <button type="submit" className="btn btn-success">
                        Thêm mới
                      </button>
                      <button type="button" className="btn btn-light">
                        <Link to={`/list-live-channel`}>Quay lại</Link>
                      </button>
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
export default AddEpg;
