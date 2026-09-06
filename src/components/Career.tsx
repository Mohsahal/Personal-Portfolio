import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Developer</h4>
                <h5>Client Project · Internship & Training Platform</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed a full-stack internship and training platform using the
              MERN stack, supporting user enrollment, structured training programs,
              live session links, and recorded content access. Built role-based
              dashboards for admins and instructors with automated certificate
              generation and secure JWT authentication.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack AI Dev</h4>
                <h5>AI &amp; Web Systems</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <p>
              Architected and deployed production-ready systems including FutureFind
              (AI-powered ATS matching, skill gap analysis, AI mock interviews),
              Veloura (scalable MERN fashion e-commerce with Razorpay &amp; RBAC),
              and Infob Digital Solutions (modern business portfolio &amp; dynamic CMS).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E – Info Science</h4>
                <h5>Yenepoya Institute of Technology · VTU</h5>
              </div>
              <h3>2022–26</h3>
            </div>
            <p>
              Pursuing Bachelor of Engineering in Information Science. Comprehensive
              academic and hands-on focus in full-stack software development, data
              structures, database management systems (MongoDB, PostgreSQL, MySQL),
              and modern cloud &amp; containerized architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
