import React from "react";
import { IconButton } from "./IconButton";
import { Search } from "./Search";
import { StateDefaultValueWrapper } from "./StateDefaultValueWrapper";
import "./style.css";

export const LoginPageConsumer = () => {
  return (
    <div className="login-page-consumer">
      <div className="div">
        <div className="overlap">
          <div className="rectangle" />
          <div className="group" />
          <button className="button">
            <div className="text-wrapper">Create Account</div>
          </button>
          <div className="text-wrapper-2">English (UK)</div>
          <p className="already-have-an">
            <span className="span">Already have an account? </span>
            <span className="text-wrapper-3">Log In</span>
          </p>
          <div className="email">
            <input className="input" placeholder="Email" type="email" />
            <img className="line" alt="Line" src="line-2.svg" />
          </div>
          <button className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper-4">Login</div>
            </div>
          </button>
          <div className="password">
            <div className="passsword">
              <div className="text-wrapper-5">Password</div>
              <img className="line" alt="Line" src="line-4.svg" />
            </div>
            <img className="element-eye-icon" alt="Element eye icon" src="211739-eye-icon-2.svg" />
          </div>
          <p className="p">Ready to Continue? Sign In Here!</p>
          <img
            className="whatsapp-image"
            alt="Whatsapp image"
            src="whatsapp-image-2024-09-17-at-7-32-03-PM-removebg-preview-1.png"
          />
        </div>
        <img className="arrow-drop-down" alt="Arrow drop down" src="arrow-drop-down.svg" />
        <div className="navigation-bar">
          <div className="overlap-2">
            <StateDefaultValueWrapper
              className="search-instance"
              divClassName="design-component-instance-node"
              state="default"
              value="Search here"
              valueType="default"
              visible={false}
            />
            <div className="frame">
              <div className="logo">
                <div className="div-wrapper">
                  <div className="overlap-group-2">
                    <p className="service-on-tab">
                      <span className="text-wrapper-6">Service on </span>
                      <span className="text-wrapper-7">Tab</span>
                    </p>
                    <div className="text-wrapper-8">Maintain and repair</div>
                  </div>
                </div>
              </div>
              <div className="overlap-3">
                <div className="navbar">
                  <div className="text-wrapper-9">Services</div>
                  <div className="text-wrapper-10">FAQ</div>
                  <div className="text-wrapper-11">Contact us</div>
                  <div className="text-wrapper-12">About us</div>
                </div>
                <p className="home">
                  <span className="text-wrapper-13">Home</span>
                  <span className="text-wrapper-14">&nbsp;</span>
                </p>
              </div>
            </div>
            <IconButton
              className="element-trailing-icon"
              icon={<Search className="icon-instance-node" color="#49454F" />}
              stateProp="enabled"
              style="standard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};