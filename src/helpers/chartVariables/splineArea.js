export const splineArea = {
  series: [
    {
      name: "ask",
      data: [],
    },
    {
      name: "bid",
      data: [],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      categories: [],
    },
    yaxis: {
      title: {
        text: "PLN",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  },
};
