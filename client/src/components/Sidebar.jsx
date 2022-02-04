import React from "react";
import xIcon from '../assets/img/xIcon.svg'

const Sidebar = ({sidebarItems, logo, sidebarCollapse}) => {
    return <div className="sidebar">
        <div className="sidebar-top">
            <div className="sidebar-top-left">
                <div className="sidebarToggle">
                    <img src={xIcon} alt="x Icon" onClick={() => sidebarCollapse()} style={{cursor: "pointer"}}/>
                </div>
                <img src={logo} alt="logo"/>
                <p>Course App</p>
            </div>
        </div>

        <div className="sidebar-items">
            <ul className="sidebar-itemnav">
                {sidebarItems.map((item, index) => {
                    return <a href={item.link} key={index} className="tooltip" data-tip={item.name}>
                        <img src={item.icon} alt="sidebar item icon"/>
                        <span>{item.name}</span>

                    </a>
                })}
            </ul>

        </div>
    </div>;
};

export default Sidebar;
