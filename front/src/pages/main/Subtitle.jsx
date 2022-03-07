import React, { useContext } from "react";
import { VideoInfoStateContext } from "../../App.js";

import Box from "@mui/material/Box";

const Subtitle = () => {

  return (
    <Box
      sx={{
        height: 400,
        backgroundColor: "blue",

        // "&:hover": {
        //   backgroundColor: "primary.main",
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
      sm={{ xs: 12, md: 10 }}
    >

      {" "}
      저어어어ㅓ어어언체에에에에 자막
    </Box>
  );
};

export default Subtitle;
