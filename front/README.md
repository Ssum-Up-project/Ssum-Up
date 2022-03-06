# 변경사항

- 파일 구조 변경 (아래 설명)
- 💥 `.js` -> `.jsx` 로 확장자 변경
- 💥 같은 컴포넌트인 `jsx`과 `css`는 같은 디렉토리로 통합

---

# Directory Structure

```
src/component
src/pages/intro
src/pages/login
src/pages/main
src/pages/team
src/test

```

---

# src

- App.js, css
- index.js, css

---

### component

- Button.jsx, css
- Footer.jsx, css
- Navbar.jsx, css
- NavbarLogin.jsx

---

### pages

**pages/intro**

- Home.jsx, css
- Section0.jsx, css
- Section1.jsx, css
- Section2.jsx, css

**pages/login**

- LogIn.jsx, css
- SignUp.jsx

**pages/main**

- Subtitle.jsx
- Summary.jsx
- Video.jsx

**pages/team**

- CardItem.jsx
- Team.jsx, css

---

### test

> 기타 테스트용 파일들
