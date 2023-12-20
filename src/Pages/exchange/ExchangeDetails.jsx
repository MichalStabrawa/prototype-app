import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Wrapper from "../../components/UI/Wrapper/Wrapper";

function ExchangeDetails() {
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const [data, setData] = useState();

  const filterCurrency = (data) => {
    return data[1].rates.filter((el) => el.code === params.id);
  };

  useEffect(() => {
    if (status === "success") {
      setData(filterCurrency(currency));
    }
  }, [currency]);

  if (isLoading) {
    return "Is Loading..............";
  }

  return (
    <>
      <Wrapper>
        <header>
          {" "}
          <h1>Exchange Details</h1>
          <Link to="/exchange">back</Link>
        </header>
      </Wrapper>
      <Wrapper css="grid">
        <main className="exchange">
          {currency && data && (
            <div>
              <h3>{data[0].code}</h3>
              <p>
                {data[0].currency} <span>{data[0].mid}</span>
                <span>date: {currency[1].effectiveDate}</span>
              </p>
            </div>
          )}

          <div>
            <div className="tabulation">
              <button>5d</button>
              <button>7d</button>
              <button>14d</button>
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
}

export default ExchangeDetails;
