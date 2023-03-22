import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { adminMenu, userMenu } from '../Data/data';
import "../styles/layoutStyle.css"
import { message, Badge } from 'antd';


const Layout = ({children}) => {

    const location = useLocation();
    const { user } = useSelector((state) => state.user)
    
    const navigate = useNavigate();

const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
};
const doctorMenu = [
    
    {
        name: "Home",
        path: "/",
        icon: 'fa-solid fa-house',
    },
    {
        name: "Appointments",
        path: '/appointments',
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Profile",
        path: `/doctor/profile/${user?._id}`,
        icon: "fa-solid fa-user",
    },
    
]

const sidebarMenu = user?.isAdmin 
? adminMenu 
: user?.isDoctor 
? doctorMenu
: userMenu; 
  return (
    <>
       <div className="main">
           <div className="layout">
               <div className="sidebar">
                   <div className="logo">
                       <h6>Doc App</h6>
                       <hr />
                   </div>
                   
                   <div className="menu">
                       {sidebarMenu.map(menu => {
                           const isActive = location.pathname === menu.path
                           return (
                               <>
                               <div className={`menu-item ${isActive && "active"}`}>
                                   <i className={menu.icon}></i>
                                   <Link to={menu.path}>{menu.name}</Link>

                               </div>
                               </>

                           )
                       })}
                       <div className={`menu-item`} onClick={handleLogout}>
                                   <i className="fa-solid fa-right-from-bracket"></i>
                                   <Link to="/login">Logout</Link>
                               </div>

                   </div>
               </div>
               <div className="content">
                   <div className="header">
                       <div className='header-content'>
                       <Badge count={user && user.notification.length} onClick={() => {
                           navigate("/notification")
                       }}>
                       <i class="fa-sharp fa-solid fa-bell"></i>
                       </Badge>
                       <Link to="/profile">{user?.name}</Link>
                       </div>
                   </div>
                   <div className="body">{children}</div>

               </div>
           </div>
       </div>
    </>
  )
}
export default Layout;