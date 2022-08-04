import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from 'react';
import "./HeaderAdmin.css";

export default function HeaderAdmin() {
    
    return (
        <div>
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topLeft">
                        <span className="logo">Ecommerce</span>
                    </div>
                    <div className="topRight">
                        <div className="topbarIconContainer">
                            <NotificationsNone />
                            <span className="topIconBadge">2</span>
                        </div>
                        <div className="topbarIconContainer">
                            <Language />
                            <span className="topIconBadge">2</span>
                        </div>
                        <div className="topbarIconContainer">
                            <Settings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
