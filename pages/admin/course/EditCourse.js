import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, notification, Skeleton, Upload } from "antd";
import { useRouter } from "next/router";
import { PlusOutlined } from "@ant-design/icons";
import DefaultLayout from "/pages/admin/layout/DefaultLayout";
import { adminAPI } from "service/admin";
import Editor from "components/textEditor/Editor";

// Styled components
const Container = styled.div`
  margin: 0 10px 10px 10px;
  padding-top: 60px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #1890ff;
  border: none;
  color: #fff;
  &:hover {
    background-color: #40a9ff;
  }
  &:focus {
    background-color: #40a9ff;
  }
`;

const EditCourse = ({ courseId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        notification.error({
          message: "Lỗi",
          description: "ID khóa học không hợp lệ.",
          placement: "bottomRight",
        });
        setLoadingData(false);
        return;
      }

      try {
        const response = await adminAPI.detailCourse(courseId);
        const { data } = response;
        form.setFieldsValue({
          name: data.title,
        });
        setDescription(data.description);

        if (data.imageUrl) {
          setFileList([
            {
              uid: "-1",
              name: "Hình ảnh khóa học",
              status: "done",
              url: data.imageUrl,
            },
          ]);
        }
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: "Không thể tải dữ liệu khóa học.",
          placement: "bottomRight",
        });
      } finally {
        setLoadingData(false);
      }
    };

    fetchCourseData();
  }, [courseId, form]);

  const handleFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.name);
    formData.append("description", description);

    if (fileList.length > 0) {
      if (fileList[0].originFileObj) {
        const fileSize = fileList[0].originFileObj.size / 1024 / 1024;
        if (fileSize > 5) {
          notification.error({
            message: "Lỗi",
            description:
              "Hình ảnh quá lớn. Vui lòng chọn hình ảnh nhỏ hơn 5MB.",
            placement: "bottomRight",
          });
          setLoading(false);
          return;
        }

        const validFileTypes = ["image/jpeg", "image/png", "image/gif"];
        const fileType = fileList[0].originFileObj.type;
        if (!validFileTypes.includes(fileType)) {
          notification.error({
            message: "Lỗi",
            description: "Vui lòng chọn hình ảnh hợp lệ (JPG, PNG, GIF).",
            placement: "bottomRight",
          });
          setLoading(false);
          return;
        }

        formData.append("image", fileList[0].originFileObj);
      } else if (fileList[0].url) {
        formData.append("imageUrl", fileList[0].url);
      }
    }

    try {
      await adminAPI.updateCourse(courseId, formData);
      notification.success({
        message: "Cập nhật thành công",
        description: "Thông tin khóa học đã được cập nhật.",
        placement: "bottomRight",
      });

      router.push("/admin/courses");
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể cập nhật thông tin khóa học.",
        placement: "bottomRight",
      });
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    const validFileList = newFileList?.filter((file) =>
      file?.type?.startsWith("image/")
    );
    setFileList(validFileList);
  };

  return (
    <DefaultLayout>
      <Container>
        <Title>Chỉnh sửa khóa học</Title>
        {loadingData ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Tên khóa học"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
              hasFeedback
            >
              <Input placeholder="Nhập tên khóa học..." />
            </Form.Item>

            <Form.Item label="Mô tả" hasFeedback>
              <Editor
                value={description}
                onChange={(newContent) => setDescription(newContent)}
                placeholder="Nhập mô tả cho khóa học..."
              />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
                accept="image/*"
              >
                {fileList.length < 1 && (
                  <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <StyledButton type="primary" htmlType="submit" loading={loading}>
                Save changes
              </StyledButton>
            </Form.Item>
          </Form>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default EditCourse;