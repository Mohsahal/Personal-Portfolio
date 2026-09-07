import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const projects = [
  {
    title: "Veloura",
    category: "Fashion E-Commerce Platform",
    tools: "React.js, Node.js, Express, MongoDB, Razorpay Gateway, JWT & RBAC, Search & Filtering",
    image: "/images/veloura.png",
    link: "https://shoppingcart-mern-choi.onrender.com/shop/home",
    github: "https://github.com/Mohsahal/portfolio",
  }, {
    title: "FutureFind",
    category: "AI Career Companion & ATS Matcher",
    tools: "MERN Stack, AI/ML, ATS Compatibility Scoring, Skill Gap Analysis, AI Mock Interviews",
    image: "/images/futurefind.png",
    link: "https://ai-powered-career-companion-system-1.onrender.com/",
    github: "https://github.com/Mohsahal/AI-Powered-Career-Companion-System",
  },

  {
    title: "Infob Digital Solutions",
    category: "Business Portfolio & Digital Presence",
    tools: "MERN Stack, SEO Optimization, Dynamic CMS, Service Management, RESTful APIs, CI/CD",
    image: "/images/infob.png",
    link: "https://business-portfolio-uga4.onrender.com/",
    github: "https://github.com/Mohsahal/business-portfolio",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div
            className="carousel-track-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools &amp; Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="carousel-actions">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-btn project-btn-live"
                              data-cursor="disable"
                            >
                              <span>Live Demo</span>
                              <MdArrowOutward />
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-btn project-btn-github"
                              data-cursor="disable"
                            >
                              <FaGithub />
                              <span>GitHub Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
