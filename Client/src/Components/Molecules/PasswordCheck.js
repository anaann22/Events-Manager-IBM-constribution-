import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Check as CheckIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

const PasswordCheck = ({ onPasswordChange }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);

  const checkPattern = (pattern) => {
    return pattern.test(password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (onPasswordChange) {
      onPasswordChange(event);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleValidationVisibility = () => {
    setValidationVisible(!validationVisible);
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
          onFocus={toggleValidationVisibility}
          onBlur={toggleValidationVisibility}
          sx={{ pr: "40px" }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={toggleShowPassword}
                sx={{ position: "absolute", right: 0 }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
        <Box display={validationVisible ? "block" : "none"}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color={checkPattern(/[a-z]/) ? "success" : "error"} />
              </ListItemIcon>
              <ListItemText>Lowercase letter</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color={checkPattern(/[A-Z]/) ? "success" : "error"} />
              </ListItemIcon>
              <ListItemText>Uppercase letter</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color={checkPattern(/\d/) ? "success" : "error"} />
              </ListItemIcon>
              <ListItemText>Number</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon
                  color={password.length >= 8 ? "success" : "error"}
                />
              </ListItemIcon>
              <ListItemText>At least 8 characters</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Box>
    </div>
  );
};

export default PasswordCheck;
