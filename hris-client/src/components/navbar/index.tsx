import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Draggable from "react-draggable";

export const Navbar: React.FC = () => {
  const draggableRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });

  useEffect(() => {
    const checker = () => {
      if (window.location.pathname) {
        setActive(window.location.pathname);
      }
    };
    checker();
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {!isTabletOrMobile ? (
        <div
          id="nav"
          className="w-100 bg-white px-3 ps-5 py-2 d-flex flex-row align-items-center justify-content-between myNavbar"
        >
          <div className="d-flex p-2 top-0 rounded-circle position-absolute bg-white">
            <img
              src="/logo192.png"
              alt="Logo"
              style={{
                width: "50px",
                padding: 0,
                margin: 0,
              }}
            />
          </div>
          <div></div>
          <div className="w-auto d-flex flex-row align-items-center column-gap-4">
            <p
              className="p-0 m-0 fw-bold navMenu"
              style={{
                cursor: "pointer",
                color: active !== "/" ? "black" : "#00B1BB",
                fontSize: active !== "/" ? "16px" : "19px",
              }}
              onClick={() => {
                setActive("/");
              }}
              id="/"
            >
              <Link className="nav-link text-decoration-none" to="/">
                Beranda
              </Link>
            </p>
            <p
              className="p-0 m-0 fw-bold navMenu"
              style={{
                cursor: "pointer",
                color: active !== "/profile" ? "black" : "#00B1BB",
                fontSize: active !== "/profile" ? "16px" : "19px",
              }}
              onClick={() => {
                setActive("/profile");
              }}
              id="/profile"
            >
              <Link className="nav-link text-decoration-none" to="/profile">
                Profile
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* <Draggable nodeRef={draggableRef} onMouseDown={() => handleToggle()}> */}
            <div
              ref={draggableRef}
              className="w-auto h-auto rounded-circle p-2 menuMobile"
              onClick={() => handleToggle()}
            >
              {!open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#00B1BB"
                    d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ef4444"
                    fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </div>
          {/* </Draggable> */}
          <Sidebar
            collapsedWidth={"0px"}
            width="100vw"
            collapsed={!open}
            transitionDuration={1000}
            onBackdropClick={() => setOpen(!open)}
            rootStyles={{
              height: "100vh",
              position: "fixed",
              zIndex: "998 !important",
              backgroundColor: "rgba(255, 255, 255, 0.13)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <Menu
              rootStyles={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              closeOnClick={true}
              onClick={() => setOpen(!open)}
            >
              <MenuItem
                rootStyles={{
                  textAlign: "center",
                  padding: "10px",
                  fontWeight: "bold",
                  color: window.location.pathname !== "/" ? "black" : "#00B1BB",
                }}
                onClick={() => (window.location.href = "/")}
              >
                {" "}
                Beranda{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{
                  textAlign: "center",
                  padding: "10px",
                  fontWeight: "bold",
                  color:
                    window.location.pathname !== "/about" ? "black" : "#00B1BB",
                }}
                onClick={() => (window.location.href = "/about")}
              >
                {" "}
                Profile{" "}
              </MenuItem>
            </Menu>
          </Sidebar>
          ;
        </>
      )}
    </>
  );
};
