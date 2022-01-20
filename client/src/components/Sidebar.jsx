import React from "react";

const Sidebar = ({sidebarItems, logo}) => {
    return <div className="sidebar">
        <div className="sidebar-top">
            <div className="sidebar-top-left">
                <img src={logo} alt="logo"/>
                <p>Course App</p>
            </div>
        </div>

        <div className="sidebar-items">
            <ul className="sidebar-itemnav">
                {sidebarItems.map((item, index) => {
                    return <a href={item.link} key={index} className="" data-tip={item.name}>
                        <img src={item.icon} alt="sidebar item icon"/>
                        <span>{item.name}</span>

                    </a>
                })}
            </ul>

        </div>
    </div>;
};

export default Sidebar;
