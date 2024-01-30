import classes from "./ExpensesChart.module.scss";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpensesChart({ title, data, badgeData, color }) {
  const red = color === "red" ? "#FF7171" : "#C499F3";
  return (
    <div className={classes.chart}>
      <Card border="light" className="h-100 shadow">
        <Card.Header>
          <Card.Title>
            {title}
            <Badge bg="danger">{badgeData && badgeData}</Badge>
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          {data && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={5}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  maxBarSize={35}
                  dataKey="expenses"
                  fill={red}
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ExpensesChart;
