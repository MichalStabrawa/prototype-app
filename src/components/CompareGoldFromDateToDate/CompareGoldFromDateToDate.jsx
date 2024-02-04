import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CompareGoldFromDateToDate.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { goldFetchFromToDate } from "../../store/goldApiNbp/goldFetchFromToDateSlice";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    type: "area",
    height: 350,
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      display: "none",
    },
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    title: {
      text: "Gold Price (PLN/g)",
    },
  },
  stroke: {
    curve: "straight",
  },
  colors: ["#FFBB5C"],
  title: {
    text: "Gold Price Movements",
    align: "left",
  },
  subtitle: {
    text: "Price Movements",
    align: "left",
  },
  labels: [], // Empty labels initially
  legend: {
    horizontalAlign: "left",
    enabled: true,
    show: false,
  },
};

const CompareGoldFromDateToDate = () => {
  const dispatch = useDispatch();
  const goldFromToDate = useSelector((state) => state.goldFetchFromToDate.data);
  const isLoading = useSelector((state) => state.goldFetchFromToDate.isLoading);
  const status = useSelector((state) => state.goldFetchFromToDate.status);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fetch, setFetch] = useState(false);
  const [maxPrice, setMax] = useState();
  const [minPrice, setMin] = useState();
  const [chartLastTop, setChartLastTop] = useState({
    options: options,
    series: [],
  });

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "fromDate") {
      setFromDate(event.target.value);
    }

    if (event.target.name === "toDate") {
      setToDate(event.target.value);
    }
  };

  const handleFetch = () => {
    setFetch(true);
  };

  useEffect(() => {
    if (fetch === true) {
      dispatch(goldFetchFromToDate({ fromDate: fromDate, toDate: toDate }));
    }
    setFetch(false);
  }, [dispatch, fetch]);

  useEffect(() => {
    if (status === "success") {
      const max = [...goldFromToDate].reduce((prev, next) =>
        prev.cena > next.cena ? prev : next
      );

      const min = [...goldFromToDate].reduce((prev, next) =>
        prev.cena < next.cena ? prev : next
      );

      setMax(max);
      setMin(min);
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (goldFromToDate.length > 0) {
      const transformedChartData = goldFromToDate.map((item) => ({
        x: new Date(item.data).getTime(),
        y: item.cena,
      }));

      const xLabels = goldFromToDate.map((item) =>
        new Date(item.data).getTime()
      );

      // Update only the series data and x-axis labels
      setChartLastTop({
        ...chartLastTop,
        options: {
          ...chartLastTop.options,
          labels: xLabels,
        },
        series: [
          {
            name: "Gold Price",
            data: transformedChartData,
          },
        ],
      });
    }
  }, [goldFromToDate, dispatch]);

  return (
    <div className={classes.wrapper}>
      <Row>
        <Col xs={12} md={6}>
          {" "}
          <div className={classes.compare}>
            <Form.Group>
              <Form.Label>
                {" "}
                <span className={classes.label}>From Date</span>
              </Form.Label>
              <Form.Control
                onChange={handleInput}
                type="date"
                name="fromDate"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                {" "}
                <span className={classes.label}>To Date</span>
              </Form.Label>
              <Form.Control
                onChange={handleInput}
                type="date"
                name="toDate"
              ></Form.Control>
            </Form.Group>
            <div className={classes.btn_wrapper}>
              {" "}
              <Button
                onClick={handleFetch}
                variant="outline-warning"
                disabled={fromDate === "" && toDate === ""}
              >
                check it
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          {status === "success" &&
            chartLastTop.options &&
            chartLastTop.series && (
              <ReactApexChart
                options={chartLastTop.options}
                series={chartLastTop.series}
                type="area"
                height={350}
              />
            )}
        </Col>
      </Row>
      <Row>
        <Col>
          {status === "rejected" && (
            <Alert variant="danger">Error fetch data!!!</Alert>
          )}
          {status === "success" && maxPrice && minPrice && (
            <div className={classes.table_min_max}>
           
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>min value</th>
                    <th>date (min)</th>
                    <th>max value</th>
                    <th>date (max)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes.min}>{minPrice.cena}</td>
                    <td className={classes.date_min_max}>{minPrice.data}</td>
                    <td className={classes.max}>{maxPrice.cena}</td>
                    <td className={classes.date_min_max}>{maxPrice.data}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CompareGoldFromDateToDate;
