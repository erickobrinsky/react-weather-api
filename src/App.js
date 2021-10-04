import React, {Fragment, useState, useEffect} from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Weather from './components/Weather'
import Error from './components/Error';


function App() {
  const [search, saveSearch] = useState({
    city:'',
    country:''
  })
  
  const [ask, saveAsk] = useState(false)
  const [result, saveResult] = useState({})
  const [error, saveError] = useState(false);

  const {city, country} = search;


  useEffect(() => {
    const askApi = async ()=>{

      if(ask){
        const appId = '23871fc6ccfe6ff9e6ead7c2000d69b1';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`
        const answer = await fetch(url)
        const result = await answer.json()
        saveResult(result)
        saveAsk(false)

        if(result.cod === "404") {
          saveError(true);
      } else {
        saveError(false);
      }
      }

    }
    askApi()
  },[ask])

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Weather 
                    result={result}
                />
  }




  return (
    <Fragment>
      <Header title= 'Weather react app'></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
              search={search}
              saveSearch={saveSearch}
              saveAsk={saveAsk}
              />
            </div>
            <div className="col m6 s12">
            {componente}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
