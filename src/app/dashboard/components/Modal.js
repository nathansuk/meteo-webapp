'use client'
import styles from '../styles.module.css'
import React from 'react'
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


function Modal(props)
{
    const [dataValue, setDataValue] = useState([])
    const [dataDates, setDataDates] = useState([])

    const [statValue, setStatValue] = useState({})
    const [isVisible, setIsVisible] = useState(true)
    const [modalDatas, setModalDatas] = useState("")

    const handleCloseModal = () => {
        setIsVisible(false)

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

      const labels = dataDates

      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataValue,
            tension: 0.4,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };

      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length; //https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array

    useEffect( () => {
        setDataValue([41, 42, 32, 31, 45, 56])
        setDataDates([1, 2, 3, 4, 5, 6])
        setStatValue([Math.max(...dataValue), Math.min(...dataValue), Math.floor(average(dataValue))])
        setModalDatas(props.modalDatas)
    }, [])

    const handleSelectChange = (e) => {
        const option = e.target.value
        console.log("Changement" + option)
        setDataValue([41, 42, 32, 31, 45, 56, 89, 100])
        setDataDates([1, 2, 3, 4, 5, 6, 7, 8])
        setStatValue([Math.max(...dataValue), Math.min(...dataValue), Math.floor(average(dataValue))])
    }
    
    if(isVisible){
    return(

            <div className={styles.modal}>
            
            <div className={styles.modalContent}>

                <div className={styles.modalContentHead}>
                    <h1>{ modalDatas["name"] }</h1>

                    <button onClick={handleCloseModal}><i class= "fi fi-sr-cross-circle"></i></button>
                </div>

                <select className={styles.modalStatRange} onChange={handleSelectChange}>
                        <option value="1">Dernières 24h</option>
                        <option value="2">Semaine</option>
                        <option value="3">Mois</option>
                </select>

                <Line options={options} data={data} />

                <div className={styles.modalStats}>
                    <h3>Valeurs</h3>
                    <div className={styles.modalStatBox}>
                        <h2>{statValue[2]} °C</h2>
                        <span>Moyenne</span>
                    </div>

                    <div className={styles.modalStatBox}>
                        <h2>{statValue[0]} °C</h2>
                        <span>Max.</span>
                    </div>

                    <div className={styles.modalStatBox}>
                        <h2>{statValue[1]} °C</h2>
                        <span>Min.</span>
                    </div>
                    
                </div>
                



            </div>



        </div>


    )}
}

export default Modal