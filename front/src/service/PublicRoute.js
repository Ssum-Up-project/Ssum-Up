import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./auth.service";

//로그인 정보 확인
export default function PublicRoute({ children }) {
    const auth =  AuthService.getCurrentUser();
    return auth ?(
        < Navigate to="/home"/>
        )  :children;
  }

