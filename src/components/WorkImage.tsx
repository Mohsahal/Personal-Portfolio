import { MdArrowOutward, MdLock } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const getDomain = (url?: string) => {
    if (!url) return "live-demo.onrender.com";
    try {
      return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    } catch {
      return "live-demo.onrender.com";
    }
  };

  const domain = getDomain(props.link);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        {/* Browser Mockup Top Bar */}
        <div className="browser-mockup-header">
          <div className="browser-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="browser-url-bar">
            <MdLock className="lock-icon" />
            <span className="url-text">{domain}</span>
          </div>
          <div className="browser-action-icon">
            <MdArrowOutward />
          </div>
        </div>

        {/* Real Screenshot Image */}
        <div className="browser-mockup-body">
          <img
            src={props.image}
            alt={props.alt || "Project screenshot"}
            loading="eager"
          />

          {/* Hover Overlay Badge */}
          <div className="work-link">
            <MdArrowOutward />
          </div>
        </div>
      </a>
    </div>
  );
};

export default WorkImage;
