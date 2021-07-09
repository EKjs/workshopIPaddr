import { useState, useEffect, useCallback } from "react";
import { Skeleton } from '@material-ui/lab';

export default function CountryInfo({country}) {
    const [coutryData,setCoutryData]=useState(null);

    const getCountryData=useCallback(()=>{
        fetch('https://restcountries.eu/rest/v2/alpha/'+country)
        .then(res=>res.ok && res.json())
        .then(data=>{
          console.log(data);
          setCoutryData(data);
        })
        .catch(err=>console.log(err))
      },[country])

      useEffect(()=>{
        getCountryData()
      },[getCountryData]);

      if (coutryData) return (
        <>
        <p>Name: {coutryData.name}</p>
        <p>Native name: {coutryData.nativeName} { } <img src={coutryData.flag} style={{width:'50px',height:'auto', }} alt="flag" /></p>
        
        <p>Capital: {coutryData.capital}</p>
        <p>Population: {coutryData.population}</p>
        <p>Region: {coutryData.region}</p>
        <p>Sub region: {coutryData.subregion}</p>
        
        </>
      )
      return (<>
        <Skeleton variant="text" />
        <Skeleton variant="rect" width={210} height={118} />
      </>)
}