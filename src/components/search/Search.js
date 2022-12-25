import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL , geoApiOptions} from "../../api";
import './Search.css';

// AsyncPaginate
const Search = (props) => {
    const {onsubmit} = props
    const [location, setlocation] = useState('')
    const [Search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulationm=100000&namePrefix=${inputValue}`,
        geoApiOptions
         )
        .then(response => response.json())
        .then(response => {
            return {
                options: response.data.map((city) => {
                    return{
                        value: `${city.latitude} ${city.longitude}`,
                        label:`${city.name} ${city.countryCode}`,
                    }
                })
            }
        })
        .catch(err => console.error(err));
    }
   
    return(

        <form className="searchForm" onSubmit={(e) => {e.preventDefault(); onsubmit(location)}}>
        <input 
        placeholder="enter your city"
        // value={Search}
        onChange={(e) => setlocation(e.target.value)}
        // loadOptions={loadOptions}
        />
        <button type="submit">submit</button>
        </form>
    
       
    )
}
export default Search;


//  <AsyncPaginate 
//         placeholder="Search for city"
//         debounceTimeout={600}
//         value={Search}
//         onChange={handleOnChange}
//         loadOptions={loadOptions}
//         // loadOption={loadOption}
//         /> 

 // const loadOption = (inputValue) => {
    // return fetch(`${COUNTRY_API_URL}/countries?&namePrefix=${inputValue}`, 
    //     countryApioptions
    //     )
    //     .then(response => response.json())
    //     .then(response => {
    //         return {
    //             options: response.data.map((country) => {
    //                 return{
    //                     value: `${country.latitude} ${country.longitude}`,
    //                     label:`${country.name} ${country.countryCode}`,
    //                 }
    //             })
    //         }
    //     })
    //     .catch(err => console.error(err));
    // }

    // const handleOnChange = (searchData) => {
    //     setSearch(searchData);
        // onSearchChange(searchData)
    // }