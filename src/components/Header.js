import React from "react"
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";



function HeaderComponent() {
  const { t, i18n } = useTranslation();

  return (
    <AppBar position="static">
      <div className="header-container">
        <div className="header-img">
          <img src="/logo.png" alt="Exchange" />
        </div>

        

        <div>
          <Button variant="filled" className="header-button">
            {t("login")}
          </Button>

          <Select
            label="Language"
            className="language-select"
            onChange={(e) => {
              localStorage.setItem("lang", e.target.value);
              i18n.changeLanguage(e.target.value);
            }}
            defaultValue={localStorage.getItem("lang") || "en"}
          >
            <MenuItem value="ru" className="language-option">
              <img
                src="https://flagicons.lipis.dev/flags/4x3/ru.svg"
                alt="ru"
              />{" "}
              RU
            </MenuItem>
            <MenuItem value="en" className="language-option">
              <img
                src="https://flagicons.lipis.dev/flags/4x3/gb.svg"
                alt="gb"
              />{" "}
              EN
            </MenuItem>
            <MenuItem value="hay" className="language-option">
            <img
              src="https://flagicons.lipis.dev/flags/4x3/am.svg" 
              alt="am"
            />
            Hay
            </MenuItem>
          </Select>
        </div>
      </div>
    </AppBar>
  );
}

export const Header = memo(HeaderComponent);
