import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Formulario = ({search, saveSearch, saveAsk}) => {
    


    const [error, saveError] = useState(false)
    
    const {city, country} = search

    const handleChange = e => {
        // actualizar el state
        saveSearch({
            ...search,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(city.trim()=== '' || country.trim()===''){
            saveError(true)
            return
        }
        saveError(false)
        saveAsk(true)
    }

    return ( 
        <form
        onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Ambos campos son obligatorios" /> : null }
                <div className="input-field col s12">
                <input 
                type="text" 
                name="city" 
                id="city"
                value={city}
                onChange={handleChange} 
                />
                <label htmlFor="city">City:</label>
            </div>
                 <div className="input-field col s12">
                    <select
                    name="country"
                    id="country"
                    value={country} 
                    onChange={handleChange} 

                    >
                        <option value="">-- Seclect country --</option>
                        <option value="US">United State</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">Spain</option>
                        <option value="PE">Perú</option>
                    </select>
                    <label htmlFor="country">Country:</label>
                </div>
                <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Search weather</button>
            </div>
        </form>

     );
}
Formulario.propTypes = {
    search : PropTypes.object.isRequired,
    saveSearch : PropTypes.func.isRequired,
    saveAsk : PropTypes.func.isRequired,
}
 

export default Formulario;