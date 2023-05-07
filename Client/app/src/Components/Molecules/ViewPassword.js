import React, { useState } from "react";
import { Box, TextField, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Check as CheckIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";

const ViewPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Box>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}

          sx={{ pr: "40px" }} // adăugat stil personalizat
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={toggleShowPassword}
                sx={{ position: "absolute", right: 0 }} // adăugat stil personalizat
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            )
          }}
        />
    </Box>
    </div>
  )
};

export default ViewPassword;