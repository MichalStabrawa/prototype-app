export const bartChartDouble ={
          
    series: [{
      data: []
    }, {
      data: []
    }],
    options: {
      chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: [],
      },
    },
  
  
  };

 export const options = {
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
      text: false,
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