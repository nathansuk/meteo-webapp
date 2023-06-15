import styles from '../styles.module.css'
import react from 'react'
import {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';


function StatisticBox({ statName, datas }) {

    const [dataValue, setDataValue] = useState([])
    const [dataDates, setDataDates] = useState([])

    const [dataName, setDataName] = useState("")
    const [icon, setIcon] = useState("")
    const [unit, setUnit] = useState("")

    const dataInfo = {
        "pressure": {
            "name": "Pression",
            "unit": "mBar",
            "icon": "fi-sr-bars-progress" 
        },
        "temperature": {
            "name": "Température",
            "unit": "°C",
            "icon": "fi-sr-temperature-high" 
        },
        "humidity": {
            "name": "Humidité",
            "unit": "%",
            "icon": "fi-sr-cloud-drizzle" 
        },
        "luminosity": {
            "name": "Luminosité",
            "unit": "%",
            "icon": "fi-sr-clouds-sun" 
        }
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    useEffect(() => {

        setDataName(dataInfo[statName]["name"])
        setIcon(dataInfo[statName]["icon"])
        setUnit(dataInfo[statName]["unit"])

        let values = [];
        let dates = [];
    
        datas.forEach((item) => {
          values.push(item.datas[statName]);
          const dateFormatted = new Date(item.dataDate);
          dates.push(dateFormatted.getHours() + " : " + dateFormatted.getMinutes());
        });
    
        setDataValue(values);
        setDataDates(dates);
        console.log('changement')
      }, [datas, statName]);

    const labels = dataDates

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        },
      };

      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataValue,
            tension: 0.4,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
              label: 'Dataset 2',
              data: dataDates,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
      };

      return (
        <div className={styles.dashboardStationBox}>

            <h2><i className={`fi ${icon}`}></i>{ dataName } ({ unit }) </h2>

            <Line options={options} data={data} />

        </div>
      )


}

export default StatisticBox