import "./topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SA2 Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <img src="./search.png" alt="search" className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <img src="./noAvater.png" alt="search" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <img src="./chat.png" alt="search" />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <img src="./noti.png" alt="search" />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}