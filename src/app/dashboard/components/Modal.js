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


function Modal(props)
{

    const [dataValue, setDataValue] = useState([])
    const [dataDates, setDataDates] = useState([])

    const [statValue, setStatValue] = useState({})
    const [isVisible, setIsVisible] = useState(true)
    const [modalDatas, setModalDatas] = useState("")

    const [dateDay, setDateDay] = useState(new Date().getDate())
    const [dateMonth, setDateMonth] = useState(new Date().getMonth())
    const [dateYear, setDateYear] = useState(new Date().getFullYear())

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
          "icon": "fi fi-sr-humidity" 
      },
      "luminosity": {
          "name": "Luminosité",
          "unit": "%",
          "icon": "fi-sr-clouds-sun" 
      },
      "rainfall": {
        "name": "Pluviométrie",
        "unit": "cl/m2",
        "icon": "fi-sr-cloud-drizzle" 
      },
      "windSpeed": {
        "name": "Anénomètre",
        "unit": "km/h",
        "icon": "fi fi-sr-wind" 
      },
  }


    // Fonction pour formater l'heure au format HH:MM
    function formatHeure(date) {
      const heure = new Date(date).getUTCHours();
      return ('0' + heure).slice(-2) + ':00';
    }


    async function getStationData()
    {
      console.log("Récupération des données du : "+dateYear+'-'+ dateMonth +'-'+ dateDay)
        try {

            const response = await fetch('/station/data/ESIEE-1/'+dateYear+'-'+dateMonth+'-'+dateDay, {
                method: 'GET'
            })

            const data = await response.json()
            const lignesParHeure = {};
          
          // Parcours du tableau de JSON
          data.forEach(json => {
            // Extraction de l'heure du champ "dataDate"
            const heure = formatHeure(json.dataDate);
            
            // Vérification si l'heure existe déjà dans l'objet "lignesParHeure"
            if (lignesParHeure.hasOwnProperty(heure)) {
              // Si l'heure existe, on ajoute la ligne JSON à l'heure correspondante
              lignesParHeure[heure].push(json);
            } else {
              // Si l'heure n'existe pas, on crée un nouveau tableau avec la ligne JSON
              lignesParHeure[heure] = [json];
            }
          });

          const statArray = []

          // Affichage des lignes JSON classées par heure
          for (const heure in lignesParHeure) {

            //console.log(`Heure ${heure}:`);

            const sommeProprietes = {
              humidity: 0,
              temperature: 0,
              pressure: 0,
              luminosity: 0,
              rainfall: 0,
              windSpeed: 0
            };
            
            let nombreElements = 0;


            lignesParHeure[heure].forEach(json => {
                sommeProprietes.humidity += json.datas.humidity;
                sommeProprietes.temperature += json.datas.temperature;
                sommeProprietes.pressure += json.datas.pressure;
                sommeProprietes.luminosity += json.datas.luminosity,
                sommeProprietes.rainfall += json.datas.rainfall,
                sommeProprietes.windSpeed += json.datas.windSpeed;
                nombreElements++;
            });

            const moyenneProprietes = {
              humidity: sommeProprietes.humidity / nombreElements,
              temperature: sommeProprietes.temperature / nombreElements,
              pressure: sommeProprietes.pressure / nombreElements,
              luminosity: sommeProprietes.luminosity / nombreElements,
              rainfall: sommeProprietes.rainfall / nombreElements,
              windSpeed: sommeProprietes.windSpeed / nombreElements
            };

            console.log(modalDatas["name"] + "" + moyenneProprietes[modalDatas["name"]])
            
            if(modalDatas["name"] === "rainfall") {
              statArray.push(moyenneProprietes[modalDatas["name"]])
            } else {
              statArray.push(Math.round(moyenneProprietes[modalDatas["name"]]))
            }
            
          
            //console.log('Moyenne des propriétés :', moyenneProprietes);
          }
          setDataValue(statArray)

        } catch(err) {
            console.log("Erreur lors de la récupération des données de la station" + err)
            setErrors(err)
        }
    }

      const handleDateForm = (e) => {
        e.preventDefault()
        getStationData()
        
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
        getStationData()
        setDataDates([
          "00h-01h", 
          "01h-02h", 
          "02h-03h", 
          "03h-04h", 
          "04h-05h", 
          "05h-06h", 
          "06h-07h", 
          "07h-08h", 
          "08h-09h",
          "09h-10h", 
          "10h-11h", 
          "11h-12h", 
          "12h-13h", 
          "13h-14h", 
          "14h-15h", 
          "15h-16h", 
          "16h-17h", 
          "17h-18h", 
          "18h-19h", 
          "19h-20h",
          "20h-21h", 
          "21h-22h", 
          "22h-23h", 
          "23h-00h",])
        setStatValue([Math.max(...dataValue), Math.min(...dataValue), Math.floor(average(dataValue))])
    }, [modalDatas])

    const handleStatButtonClick = (typeOfData) => {
      const datas = {
        "name": typeOfData
      }
      setModalDatas(datas)
      getStationData()
      console.log(datas)
    }

    
    if(isVisible){
    return(

            <div className={styles.modal}>
            <h2>Statistiques détaillées</h2>

            <div className={styles.selectStat}>
               <button onClick={(e) => handleStatButtonClick("temperature")}><i class="fi fi-sr-temperature-high"></i></button>
               <button onClick={(e) => handleStatButtonClick("humidity")}><i class="fi fi fi-sr-humidity"></i></button>
               <button onClick={(e) => handleStatButtonClick("luminosity")}><i class="fi fi-sr-brightness-low"></i></button>
               <button onClick={(e) => handleStatButtonClick("pressure")}><i class="fi fi-sr-bars-progress"></i></button>
               <button onClick={(e) => handleStatButtonClick("windSpeed")}><i class="fi fi-sr-wind"></i></button>
               <button onClick={(e) => handleStatButtonClick("rainfall")}><i class="fi-sr-cloud-drizzle"></i></button>

            </div>
            
            <div className={styles.modalContent}>

                <div className={styles.modalContentHead}>
                    <h1>{ (dataInfo.hasOwnProperty(modalDatas["name"])) ? dataInfo[modalDatas["name"]]["name"] : "Sélectionnez un capteur ci-dessus" }</h1>

                </div>         

                    <h3>Données du : {dateDay} / { parseInt(dateMonth) + 1 } / { dateYear } </h3>
                    <div className={styles.modalStats}>
                      <h3>Statistiques de la journée : </h3>
                      <div className={styles.modalStatBox}>
                          <h2>{statValue[2]} { (dataInfo.hasOwnProperty(modalDatas["name"])) ? dataInfo[modalDatas["name"]]["unit"] : " " }</h2>
                          <span>Moyenne</span>
                      </div>

                      <div className={styles.modalStatBox}>
                          <h2>{statValue[0]} { (dataInfo.hasOwnProperty(modalDatas["name"])) ? dataInfo[modalDatas["name"]]["unit"] : " " }</h2>
                          <span>Max.</span>
                      </div>

                      <div className={styles.modalStatBox}>
                          <h2>{statValue[1]} { (dataInfo.hasOwnProperty(modalDatas["name"])) ? dataInfo[modalDatas["name"]]["unit"] : " " }</h2>
                          <span>Min.</span>
                      </div>
                      
                    </div>
                   
                    <Bar options={options} data={data} />
              
                <form className={styles.modalDateForm} onSubmit={(e) => {
                  handleDateForm(e)
                }}>
                  <h3>Voir les données du :</h3>
                  <input type='number' placeholder='Jour' onChange={(e) => setDateDay(e.target.value)} value={dateDay}></input> / 
                  <select id="month" className={styles.monthSelect} onChange={(e) => setDateMonth(e.target.value)} value={dateMonth}>
                    <option value="0">Janvier</option>
                    <option value="1">Février</option>
                    <option value="2">Mars</option>
                    <option value="3">Avril</option>
                    <option value="4">Mai</option>
                    <option value="5">Juin</option>
                    <option value="6">Juillet</option>
                    <option value="7">Août</option>
                    <option value="8">Septembre</option>
                    <option value="9">Octobre</option>
                    <option value="10">Novembre</option>
                    <option value="11">Décembre</option>
                  </select>/  
                  <input type='number' placeholder='Année' onChange={(e) => setDateYear(e.target.value)} value={dateYear}></input>
                  <button type='submit'>Chercher</button>
                </form>
                



            </div>


        </div>


    )}
}

export default Modal