import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import classes from "./ExchangeMainTable.module.scss";

const ExchangeMainTable = () => {
  const data = useSelector((state) => state.multiple.data);
  const [newData,setNewData]= useState([{code:'',currency:'',rates:[{bid:'',ask:''}]}])

  useEffect(()=> {
    console.log('Data table')
    console.log(data)
    setNewData(data)
  },[data])
  return (
    <div>
      <table className={classes.table_rates}>
        <thead>
          <tr>
            <th>code</th>
            <th>currency</th>
            <th>bid</th>
            <th>ask</th>
            <th>mid</th>
            <th>date</th>
            <th>no</th>
          </tr>
        </thead>
        <tbody>
        {data.length>1 &&
            data.map((el, index) => {
              return (
                <tr key={index}>
                    <td className={classes.code}>{el.code}</td>
                    <td>{el.currency}</td>
                   <td>{el.rates[9].bid}</td>
                   <td>{el.rates[9].ask}</td>
                   <td>{(el.rates[9].ask+el.rates[9].bid)/2}</td>
                   <td className={classes.date}>{el.rates[9].effectiveDate}</td>
                   <td>{el.rates[9].no}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeMainTable;
