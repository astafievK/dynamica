import { FC } from "react";
import {NavLink} from "react-router-dom";

export const LeftMenu: FC = () => {
    return (
        <>
            <div className="left-menu__container">
                <div className="profile-container">
                    <NavLink
                        to="/profile"
                        className="profile-icon">
                        <img src="test pic.jpg" alt=""/>
                    </NavLink>
                    <div className="profile-notifications">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33497 4.72727V5.25342C6.64516 6.35644 4.76592 9.97935 4.83412 13.1192L4.83409 14.8631C3.45713 16.6333 3.53815 19.2727 6.9735 19.2727H9.33497C9.33497 19.996 9.61684 20.6897 10.1186 21.2012C10.6203 21.7127 11.3008 22 12.0104 22C12.72 22 13.4005 21.7127 13.9022 21.2012C14.404 20.6897 14.6858 19.996 14.6858 19.2727H17.0538C20.4826 19.2727 20.5323 16.6278 19.1555 14.8576L19.1938 13.1216C19.2631 9.97811 17.3803 6.35194 14.6858 5.25049V4.72727C14.6858 4.00396 14.404 3.31026 13.9022 2.7988C13.4005 2.28734 12.72 2 12.0104 2C11.3008 2 10.6203 2.28734 10.1186 2.7988C9.61684 3.31026 9.33497 4.00395 9.33497 4.72727ZM12.9022 4.72727C12.9022 4.74573 12.9017 4.76414 12.9006 4.78246C12.6101 4.74603 12.3142 4.72727 12.014 4.72727C11.7113 4.72727 11.413 4.74634 11.1203 4.78335C11.1192 4.76474 11.1186 4.74603 11.1186 4.72727C11.1186 4.48617 11.2126 4.25494 11.3798 4.08445C11.547 3.91396 11.7739 3.81818 12.0104 3.81818C12.2469 3.81818 12.4738 3.91396 12.641 4.08445C12.8083 4.25494 12.9022 4.48617 12.9022 4.72727ZM11.1186 19.2727C11.1186 19.5138 11.2126 19.7451 11.3798 19.9156C11.547 20.086 11.7739 20.1818 12.0104 20.1818C12.2469 20.1818 12.4738 20.086 12.641 19.9156C12.8083 19.7451 12.9022 19.5138 12.9022 19.2727H11.1186ZM17.0538 17.4545C17.8157 17.4545 18.2267 16.5435 17.7309 15.9538C17.49 15.6673 17.3616 15.3028 17.3699 14.9286L17.4106 13.0808C17.4787 9.99416 15.0427 6.54545 12.014 6.54545C8.98598 6.54545 6.55028 9.99301 6.61731 13.0789L6.65748 14.9289C6.66561 15.303 6.53726 15.6674 6.29639 15.9538C5.80054 16.5435 6.21158 17.4545 6.9735 17.4545H17.0538Z" fill="#3c4353"></path> </g></svg>
                        <div className="message">Уведомления</div>
                    </div>
                </div>
                <div className="general-navigation__container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/feed"
                                    className={({isActive}) =>
                                        isActive ? 'nav-item active-nav-item' : 'nav-item'
                                    }
                                >
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Navigation / House_01"> <path id="Vector" d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z" stroke="#3c4353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                </NavLink>
                                <div className="message">Новостная лента</div>
                            </li>
                            <li>
                                <NavLink
                                    to="/contacts"
                                    className={({isActive}) =>
                                        isActive ? 'nav-item active-nav-item' : 'nav-item'
                                    }
                                >
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 3H17C18.1046 3 19 3.89543 19 5V7V17V19C19 20.1046 18.1046 21 17 21H11H5C3.89543 21 3 20.1046 3 19V17V7V5C3 3.89543 3.89543 3 5 3H11Z" stroke="#3c4353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 3H17H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H17H11" stroke="#3c4353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12C14 13.6569 12.6569 15 11 15C9.34315 15 8 13.6569 8 12C8 10.3431 9.34315 9 11 9C12.6569 9 14 10.3431 14 12Z" stroke="#3c4353" stroke-width="2"></path> <path d="M7 21C7.42546 18.6928 8.51999 18 11 18C13.48 18 14.5745 18.6425 15 20.9497" stroke="#3c4353" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                                </NavLink>
                                <div className="message">Адресная книга</div>
                            </li>
                            <li>
                                <NavLink
                                    to="/documents"
                                    className={({isActive}) =>
                                        isActive ? 'nav-item active-nav-item' : 'nav-item'
                                    }
                                >
                                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#3c4353" fill-rule="evenodd" d="M7 1a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10.75a2 2 0 002 2h9.05a2 2 0 002-2v-1h1a2 2 0 002-2V6.06a2 2 0 00-.545-1.371l-2.884-3.06A2 2 0 0013.165 1H7zm6.05 14.75H7a2 2 0 01-2-2V6H4v10.75h9.05v-1zM7 5v8.75h9.05V6.06L13.165 3H7v2z"></path> </g></svg>
                                </NavLink>
                                <div className="message">Документы</div>
                            </li>
                            <li>
                                <NavLink
                                    to="/adaptation"
                                    className={({isActive}) =>
                                        isActive ? 'nav-item active-nav-item' : 'nav-item'
                                    }
                                >
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Checkbox_Check"> <path id="Vector" d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="#3c4353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                </NavLink>
                                <div className="message">Адаптация</div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="user-navigation__container">

                </div>
            </div>
        </>
    );
};
