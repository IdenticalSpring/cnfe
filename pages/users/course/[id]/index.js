import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layout/DefaultLayout";
import { Skeleton, Modal, notification, message } from "antd";
import PurchaseCourse from "./purchase";
import HeaderSection from "./HeaderSection";
import NavCard from "./NavCard";
import ContentCard from "./ContentCard";
import PurchaseMessage from "./PurchaseMessage";
import { userAPI } from "@/service/user";
import styled from "styled-components";

const MainContent = styled.div`
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 32px;
  position: relative;
  z-index: 2;
`;

const ContentGrid = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 40px;
  margin-bottom: 32px;
  min-height: calc(100vh - 400px);
  align-items: stretch;
`;

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [openChapters, setOpenChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const { id, status, message: statusMessage } = router.query;

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const loggedIn = !!userId;
    setIsLoggedIn(loggedIn);

    if (loggedIn && id) {
      setLoading(true);
      Promise.all([
        userAPI.getCourseById(id).then(setCourse),
        userAPI.getChaptersAndLessonsByCourseId(id, userId)
          .then((chaptersData) => {
            setChapters(chaptersData);
          }),
        userAPI.getPurchaseStatus(userId, id).then((response) => {
          const purchaseStatus = response?.data?.hasPurchased;
          setHasPurchased(purchaseStatus);
        }),
      ])
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (status && statusMessage) {
      notification[status === "completed" ? "success" : "warning"]({
        message: "Payment Status",
        description: statusMessage,
      });
    }
  }, [status, statusMessage]);

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const showPurchaseModal = () => setIsPurchaseModalOpen(true);
  const closePurchaseModal = () => setIsPurchaseModalOpen(false);

  const fetchLessonDetails = (chapterId, lessonId) => {
    userAPI
      .getLessonById(chapterId, lessonId)
      .then(setSelectedLesson)
      .catch((error) => console.error("Error fetching lesson details:", error));
  };

  const handleShare = () => {
    const courseUrl = `${window.location.origin}/users/course/${id}`;
    navigator.clipboard
      .writeText(courseUrl)
      .then(() => {
        message.success("Course URL copied to clipboard!");
      })
      .catch(() => {
        message.error("Failed to copy URL. Please try again.");
      });
  };

  const handleLessonCompletion = async (lessonId) => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      try {
        const progress = await userAPI.updateLessonProgress(userId, lessonId);
        message.success("Lesson marked as completed!");
      } catch (error) {
        message.error("Failed to update lesson progress.");
      }
    } else {
      message.warning("Please log in to track your progress.");
    }
  };

  return (
    <DefaultLayout>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <HeaderSection
            title={course?.title}
            imageUrl={course?.imageUrl}
            chaptersCount={chapters.length}
            lessonsCount={chapters.reduce(
              (acc, ch) => acc + (ch.lessons?.length || 0),
              0
            )}
            price={course?.price}
            showPurchaseModal={showPurchaseModal}
            handleShare={handleShare}
            hasPurchased={hasPurchased}
          />

          <MainContent>
            <ContentGrid>
              {course?.status === "demo" || course?.isDemoAvailable ? (
                <>
                  <NavCard
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    chapters={chapters}
                    toggleChapter={toggleChapter}
                    openChapters={openChapters}
                    fetchLessonDetails={fetchLessonDetails}
                  />
                  <ContentCard
                    activeTab={activeTab}
                    courseDescription={course?.description}
                    selectedLesson={selectedLesson}
                    onCompleteLesson={handleLessonCompletion} 
                  />
                </>
              ) : !isLoggedIn ? (
                <PurchaseMessage message="Log in to unlock more content." />
              ) : !hasPurchased ? (
                <PurchaseMessage message="Please purchase the course to access all content." />
              ) : (
                <>
                  <NavCard
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    chapters={chapters}
                    toggleChapter={toggleChapter}
                    openChapters={openChapters}
                    fetchLessonDetails={fetchLessonDetails}
                  />
                  <ContentCard
                    activeTab={activeTab}
                    courseDescription={course?.description}
                    selectedLesson={selectedLesson}
                    onCompleteLesson={handleLessonCompletion} 
                  />
                </>
              )}
            </ContentGrid>
          </MainContent>

          <Modal
            title="Purchase Course"
            open={isPurchaseModalOpen}
            onCancel={closePurchaseModal}
            footer={null}
          >
            <PurchaseCourse price={course?.price} onClose={closePurchaseModal} />
          </Modal>
        </>
      )}
    </DefaultLayout>
  );
};

export default CourseDetail;
