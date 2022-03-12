// [#28]
import React from "react";
import { createGlobalStyle, GlobalStyles } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  font-family:  'Nanum Gothic Coding', monospace;


}
body {
  background-color: #D2302C;
  border-radius: 3px;}

h1, h2, h3, div, p{
  /* color: #E8E1C2; */
  /* color:#D2302C; */
}

`;

export default GlobalStyle;
//  red #3a0703
