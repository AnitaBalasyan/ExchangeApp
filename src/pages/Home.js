import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Home = () => {
  const { t } = useTranslation();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const onConvertClick = async () => {
    if (!from.trim() || !to.trim() || !amount.trim()) {
      alert(t("alert"));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            apikey: "6oZWZXmB3qSMB7HjjCQ4LlEzpeZOm2VZ",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data.error.message;

      setSearchResult(data.result);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrencies = async () => {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/latest`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          apikey: "6oZWZXmB3qSMB7HjjCQ4LlEzpeZOm2VZ",
        },
      }
    );

    const data = await response.json();

    setCurrencies(Object.keys(data.rates));
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  // const colors = ["red", "blue", "orange"];

  // return (
  //   <div>
  //     <select>
  //       {colors.map(function (color) {
  //         return <option value={color}>{color}</option>;
  //       })}
  //     </select>
  //   </div>
  // );

  return (
    <div>
      <Header />

      <div className="input-btn">
        <div className="send">
          <span>{t("from")}</span> <br />
          {/* <input
            value={from}
            onChange={(e) => {
              setFrom(e.target.value.slice(0, 7));
            }}
          /> */}
          <FormControl fullWidth variant="standard" size="small">
          <Select
            value={from}
            onChange={(e) => {
              setFrom (e.target.value)
            }}
          >
            {currencies.map((currency) => {
              return (
                <MenuItem value={currency} key={currency}>
                  {currency}

                </MenuItem>
              );
            })}
          </Select>
          </FormControl>
          <br />
          <span>{t("to")}</span> <br />
          {/* <input
            value={to}
            onChange={(e) => {
              setTo(e.target.value.slice(0, 7));
            }}
          /> */}
          <FormControl fullWidth variant="standard" size="small">
  <Select
            value={to}
            onChange={(e) => {
              // setFrom(<MenuItem value={key}></MenuItem>);
              setTo (e.target.value)
            }}
          >
            {currencies.map((currency) => {
              return (
                <MenuItem value={currency} key={currency}>
                  {currency}

                </MenuItem>
              );
            })}
          </Select>
          </FormControl>

          <br />
          <span>{t("amount")}</span> <br />
          <input
            value={amount}
            onChange={(e) => {
              if (!Number.isNaN(Number(e.target.value))) {
                setAmount(e.target.value.slice(0, 7));
              }
            }}
          />{" "}
          <br />
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={onConvertClick}
          >
            {t("convert")}
          </LoadingButton>
          {searchResult && (
            <div className="search">
              {t("resultIs")}: {searchResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
