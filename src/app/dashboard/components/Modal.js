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
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import Calendar from 'react-calendar';


function Modal(props)
{
    const [date, setDate] = useState(new Date());

    const [dataValue, setDataValue] = useState([])
    const [dataDates, setDataDates] = useState([])

    const [statValue, setStatValue] = useState({})
    const [isVisible, setIsVisible] = useState(true)
    const [modalDatas, setModalDatas] = useState("")
    const [stationData, setStationData] = useState({})

    const [isLoadingData, setIsLoadingData] = useState(false)

    const [dateDay, setDateDay] = useState(new Date().getDate())
    const [dateMonth, setDateMonth] = useState(new Date().getMonth())
    const [dateYear, setDateYear] = useState(new Date().getFullYear())


    const handleCloseModal = () => {
        setIsVisible(false)
    }

    async function getStationData()
    {
      setIsLoadingData(true)
        try {

            const response = await fetch('/station/data/ESIEE-1', {
                method: 'GET'
            })

            const data = await response.json()
            setStationData(data)
            

        } catch(err) {
            console.log("Erreur lors de la récupération des données de la station" + err)
            setErrors(err)
        }
    }

      const filterData = () => {
        console.log("zebi")
        const filteredData = stationData.filter(item => {
          const itemDate = new Date(item.dataDate);
          return itemDate.toDateString() === date.toDateString();
        });

        console.log("DATA FILTREES : " + filteredData)
      }

      const handleDateForm = (e) => {
        e.preventDefault()
        setDate(new Date(dateYear, dateMonth, dateDay))
        console.log(date)
      }
    

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
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
        //getStationData()
        setIsLoadingData(false)
        setDataValue([-5, 41, 42, 32, 31, 45, 56, 41, 42, 32, 31, 45, 56, 41, 42, 32, 31, 45, 56, 41, 42, 32, 31, 45, 56])
        setDataDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24])
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

                    <h3>Données du : {date.toLocaleDateString("fr")} </h3>
                    <Bar options={options} data={data} />
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
                   
                


                <form className={styles.modalDateForm} onSubmit={(e) => {
                  handleDateForm(e)
                }}>
                  <input type='number' placeholder='Jour' onChange={(e) => setDateDay(e.target.value)} value={dateDay}></input>
                  <input type='number' placeholder='Mois' onChange={(e) => setDateMonth(e.target.value)} value={dateMonth}></input>
                  <input type='number' placeholder='Année' onChange={(e) => setDateYear(e.target.value)} value={dateYear}></input>
                  <button type='submit'>Chercher</button>
                </form>
                



            </div>


        </div>


    )}
}

export default Modal