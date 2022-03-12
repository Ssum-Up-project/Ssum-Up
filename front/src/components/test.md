.Header {
/_ background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%); _/
/_ background-color: #191718;
color: #e05448; #f7f7f9_/
background-color: #f7f7f9;
color: #d2302c;
height: 100px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.6rem;
position: sticky;
top: 0;
z-index: 999;
}

.intro_logo {
width: 1px;
height: auto;
}

.Header-container {
border-bottom: 1.5px solid #f7f7f9;
background-color: #f7f7f9;
align-items: center;
height: 80px;
display: flex;
justify-content: center;
/_ justify-content: space-evenly; _/
/_ width: 1500px; _/
max-width: 2000px;
}

.Header-logo {
color: #d2302c;
justify-self: start;
margin-left: 20px;
cursor: pointer;
text-decoration: none;
font-size: 2rem;
display: flex;
align-items: center;
}

.fa-typo3 {
margin-left: 0.5rem;
font-size: 1.8rem;
}

.nav-menu {
/_ background-color: transparent; _/
display: grid;
grid-template-columns: repeat(4, auto);
grid-gap: 10px;
list-style: none;
text-align: center;
width: 60vw;
justify-content: end;
margin-right: 0;
}

.nav-item {
height: 80px;
color: #f7f7f9;
}

.nav-links {
color: #e05448;
display: flex;
align-items: center;
text-decoration: none;
padding: 0.5rem 1rem;
margin-top: 14px;
bottom: 0;
height: 70%;
}

.nav-links:hover {
border-bottom: 4px solid #f7f7f9;
transition: all 0.2s ease-out;
}

.fa-bars {
color: #d2302c;
}

.nav-links-mobile {
display: none;
}

.menu-icon {
display: none;
}

@media screen and (max-width: 960px) {
.HeaderItems {
position: relative;
}

.nav-menu {
display: flex;
flex-direction: column;
width: 100%;
height: 90vh;
position: absolute;
top: 80px;
left: -100%;
opacity: 1;
transition: all 0.5s ease;
}

.nav-menu.active {
background: white;
color: #fff;
left: 0;
opacity: 1;
transition: all 0.5s ease;
z-index: 10;
justify-content: center;
}

.nav-links {
text-align: center;
padding: 10px;
width: 100%;
display: table;
}

.nav-links:hover {
background-color: f7f7f9;
color: #000;
/_ border-radius: 0; _/
height: 25px;
}

.Header-logo {
position: absolute;
top: 0;
left: 0;
transform: translate(25%, 50%);
}

.menu-icon {
display: block;
position: absolute;
top: 0;
right: 0;
transform: translate(-100%, 60%);
font-size: 1.8rem;
cursor: pointer;
}

.fa-times {
color: #000;
font-size: 2rem;
}
.fas fa-times {
color: #000;
}

.nav-links-mobile {
display: block;
text-align: center;
margin: 2rem auto;
/_ border-radius: 8px; _/
width: 50%;
text-decoration: none;
font-size: 1.5rem;
background-color: transparent;
color: #000;
padding: 14px 20px;
border: 1px solid #000;
transition: all 0.3s ease-out;
}

.nav-links-mobile:hover {
background-color: f7f7f9;
color: #000;
transition: 250ms;
}
}

@media screen and (max-width: 960px) {
.HeaderItems {
position: relative;
}

.nav-menu-login.active {
background: white;
left: 0;
opacity: 1;
transition: all 0.5s ease;
z-index: 1;
justify-content: center;
}

.nav-links {
text-align: center;
padding: 10px;
width: 100%;
display: table;
}

.nav-links:hover {
background-color: antiquewhite;
color: #000;
height: 25px;
}

.Header-logo {
position: absolute;
top: 0;
left: 0;
transform: translate(25%, 50%);
}

.menu-icon {
display: block;
position: absolute;
top: 0;
right: 0;
transform: translate(-100%, 60%);
font-size: 1.8rem;
cursor: pointer;
}

.fa-times {
color: #000;
font-size: 2rem;
}
.fas fa-times {
color: #000;
}

.nav-links-mobile {
display: block;
text-align: center;
margin: 2rem auto;
/_ border-radius: 8px; _/
width: 50%;
text-decoration: none;
font-size: 1.5rem;
background-color: transparent;
color: #000;
padding: 14px 20px;
border: 1px solid #000;
transition: all 0.3s ease-out;
}

.nav-links-mobile:hover {
background-color: antiquewhite;
color: #000;
transition: 250ms;
}
}

.nav-menu-login {
grid-template-columns: repeat(4, auto);
grid-gap: 3px;
list-style: none;
text-align: center;
width: 25vw;
/_ width: 60vw; _/
justify-content: end;
margin-right: 0;
display: flex;
/_ justify-content: space-evenly; _/
}
