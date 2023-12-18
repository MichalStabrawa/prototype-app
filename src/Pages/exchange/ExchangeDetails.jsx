import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Wrapper from "../../components/UI/Wrapper/Wrapper";

function ExchangeDetails() {
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  console.log(params.id);
  console.log("Currency isnide EUR");
  console.log(currency);

  const filterCurrency = currency[1].rates.filter(
    (el) => el.code === params.id
  );
  console.log(filterCurrency);

  return (
    <>
      <Wrapper>
        <header>
          {" "}
          <h1>Exchange Details</h1>
        </header>
      </Wrapper>
      <Wrapper css="grid">
        <main className="exchange">
          <div>
            <h3>{filterCurrency[0].code}</h3>
            <p>
              {filterCurrency[0].currency} <span>{filterCurrency[0].mid}</span>
            </p>
          </div>
          <div>
            <div className="tabulation">
              <button>5d</button><button>7d</button><button>14d</button>
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
}

export default ExchangeDetails;
