import DefaultLayout from "@/layout/DefaultLayout";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { userAPI } from "@/service/user";
import { Skeleton } from "antd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PageWrapper = styled.div`
  padding: 40px 60px;
  background: #f9fbfc;
  min-height: 100vh;
`;

const Title = styled.div`
  margin-bottom: 60px;
  text-align: center;
`;

const WelcomeText = styled.div`
  font-size: 36px;
  color: #8c8c8c;
  font-weight: 400;
`;

const ExploreText = styled.div`
  font-size: 52px;
  font-weight: 700;
  color: #0073e6;
  position: relative;
  display: inline-block;
  margin-top: 10px;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #0073e6;
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin: 50px 0 30px;
  font-weight: 600;
  position: relative;
`;

const SlideContainer = styled.div`
  display: flex;
  position: relative;
  padding: 20px 0;
  margin: 0 20px;
  align-items: center;
`;

const SlideWrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  cursor: ${(props) => (props.isDragging ? "grabbing" : "grab")};
  padding: 0 60px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  user-select: ${(props) => (props.isDragging ? "none" : "auto")};
`;

const NavigationButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  transition: all 0.3s ease;
  color: #0073e6;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background: #0073e6;
    color: white;
    box-shadow: 0 6px 16px rgba(0, 115, 230, 0.3);
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  ${(props) =>
    props.direction === "prev"
      ? `
    left: 10px;
  `
      : `
    right: 10px;
  `}
`;

const SlideCard = styled.div`
  min-width: 300px;
  height: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CourseHeader = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const CourseOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  z-index: 2;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const CourseDescription = styled.p`
  font-size: 14px;
  margin: 4px 0 0;
  line-height: 1.3;
  opacity: 0.9;
`;

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 10;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const CourseStats = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-around;
  align-items: center;
  background: white;
  border-top: 1px solid #e5e7eb;
`;

const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
`;

const StatValue = styled.div`
  color: #111827;
  font-size: 18px;
  font-weight: 700;
`;

const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e5e7eb;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${(props) => props.progress || "0%"};
    background: #6366f1;
    transition: width 0.3s ease;
  }
`;

const Explore = () => {
  const [learnCourses, setLearnCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [interviewCourses, setInterviewCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const skeletonCount = 6;

  // Tạo ref riêng cho mỗi danh mục
  const learnRef = useRef(null);
  const featuredRef = useRef(null);
  const interviewRef = useRef(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const learn = await userAPI.fetchCoursesByType("learn");
        const featured = await userAPI.fetchCoursesByType("featured");
        const interview = await userAPI.fetchCoursesByType("interview");
        setLearnCourses(learn);
        setFeaturedCourses(featured);
        setInterviewCourses(interview);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleMouseDown = (ref, e) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseMove = (ref, e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Tăng tốc độ
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (ref, direction) => {
    const scrollAmount = direction === "next" ? 300 : -300;
    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const renderCourses = (courses, title, ref) => (
    <>
      <SectionTitle>{title}</SectionTitle>
      <SlideContainer>
        <NavigationButton direction="prev" onClick={() => scroll(ref, "prev")}>
          <ChevronLeftIcon size={24} />
        </NavigationButton>

        <SlideWrapper
          ref={ref}
          onMouseDown={(e) => handleMouseDown(ref, e)}
          onMouseMove={(e) => handleMouseMove(ref, e)}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <SlideCard key={index}>
                  <Skeleton.Image
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "16px",
                    }}
                  />
                  <Skeleton
                    active
                    paragraph={{ rows: 1 }}
                    title={false}
                    style={{ padding: "16px" }}
                  />
                </SlideCard>
              ))
            : courses.map((course) => (
                <SlideCard key={course.id}>
                  <CourseHeader>
                    <CourseImage
                      src={course.imageUrl || "/api/placeholder/400/225"}
                      alt={course.title}
                    />
                    <CourseOverlay>
                      <CourseDescription>
                        {course.description}
                      </CourseDescription>
                      <CourseTitle>{course.title}</CourseTitle>
                    </CourseOverlay>
                    <Link href={`/users/course/${course.id}`} passHref>
                      <PlayButton>
                        <PlayArrowIcon
                          style={{ color: "white", fontSize: "20px" }}
                        />
                      </PlayButton>
                    </Link>
                  </CourseHeader>
                  <CourseStats>
                    <StatGroup>
                      <StatLabel>Chapters</StatLabel>
                      <StatValue>{course.chapterCount || "0"}</StatValue>
                    </StatGroup>
                    <StatGroup>
                      <StatLabel>Items</StatLabel>
                      <StatValue>{course.itemCount || "0"}</StatValue>
                    </StatGroup>
                  </CourseStats>
                  <Progress progress={`${course.progress || 0}%`} />
                </SlideCard>
              ))}
        </SlideWrapper>

        <NavigationButton direction="next" onClick={() => scroll(ref, "next")}>
          <ChevronRightIcon size={24} />
        </NavigationButton>
      </SlideContainer>
    </>
  );

  return (
    <DefaultLayout>
      <PageWrapper>
        <Title>
          <WelcomeText>Welcome to</WelcomeText>
          <ExploreText>Master Coding Courses</ExploreText>
        </Title>
        {renderCourses(learnCourses, "Learn Courses", learnRef)}
        {renderCourses(featuredCourses, "Featured Courses", featuredRef)}
        {renderCourses(interviewCourses, "Interview Courses", interviewRef)}
      </PageWrapper>
    </DefaultLayout>
  );
};

export default Explore;
