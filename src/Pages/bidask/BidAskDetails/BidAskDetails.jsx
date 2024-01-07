import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./BidAskDetails.module.scss";
import Wrapper from "../../../components/UI/Wrapper/Wrapper";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import IconArrow from "../../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import minMaxBidAsk from "../../../utils/minMaxBidAsk";
import Table from "react-bootstrap/Table";
import ResponsiveCarousel from "../../../components/Carousel/ResponsiveCarousel/ResponsiveCarousel";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";

import { BsCurrencyExchange } from "react-icons/bs";

const BidAskDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const [data, setData] = useState();
  const [dataLast, setDataLast] = useState();
  const [key, setKey] = useState("3");
  const [minBidAsk, setMinBidAsk] = useState(null);
  const [maxBidAsk, setMaxBidAsk] = useState(null);
  const [dataCarousel, setDataCarousel] = useState();

  //ask bid data
  const currencyLastTopCount = useSelector(
    (state) => state.singleCurrencyLastFewTimes.data
  );
  const isLoadingLastTop = useSelector(
    (state) => state.singleCurrencyLastFewTimes.isLoading
  );

  const statusLastTop = useSelector(
    (state) => state.singleCurrencyLastFewTimes.status
  );
  const errorLast = useSelector(
    (state) => state.singleCurrencyLastFewTimes.error
  );

  useEffect(() => {
    if (status === "success") {
      const tab = getCompareLastActualValue(
        currency[1].rates,
        currency[0].rates
      );
      setDataCarousel(tab);
    }
  }, [currency]);

  if (isLoading || isLoadingLastTop) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return <section className={classes.bid_ask}>
      <Wrapper css="dark_blue">
        <Container fluid>
          <Row>
            <Col>
              <header>
                {" "}
                <h1>Bid & Ask Details <span><BsCurrencyExchange /></span></h1>
                {currency.length > 0 ? (
                  <div className={classes.carousel}>
                    <ResponsiveCarousel
                      data={dataCarousel}
                      slidesToShow={5}
                      effectiveDate={currency[1].effectiveDate}
                    />
                  </div>
                ) : null}
              </header>
            </Col>
          </Row>
        </Container>
      </Wrapper>
  </section>;
};

export default BidAskDetails;
