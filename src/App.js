import { useState, useEffect,useCallback } from "react";
import { Skeleton } from '@material-ui/lab';
import GoogleMapReact from 'google-map-react';
import CountryInfo from "./CountryInfo";
import { DateTime } from "luxon";

export default function App() {
  const apiKey=process.env.REACT_APP_IPIFY_KEY;
  const url=`https://geo.ipify.org/api/v1?apiKey=${apiKey}`;
  const [ip,setIp]=useState(null);
  const [pos,setPos]=useState(null);


  const AnyReactComponent = ({ text }) => <div>{text}</div>;



  const getIpData=useCallback(()=>{
    fetch(url)
    .then(res=>res.ok && res.json())
    .then(data=>{
      console.log(data);
      setPos({lat:parseFloat(data.location.lat),lng:parseFloat(data.location.lng)})
      setIp(data);
    })
    .catch(err=>console.log(err))
  },[url])

  useEffect(()=>{
    getIpData();
  },[getIpData]);

  if (!ip) return (<>
      <div className="container bg-dark text-light ">
      <div className="row">
        <div className="col">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
        <div className="col">
          <Skeleton variant="rect" width={400} height={150} />
        </div>
      </div>
      </div>
      </>)

  return (
    <div className="container bg-dark text-light ">
      <div className="row">
        <div className="col">
          <div className="row">
              <div className="col">
                <h4>Information about IP address</h4>
                <p>Your IP address is: {ip.ip}</p>
                <p>Your location: {ip.location.city}, {ip.location.region}, {ip.location.postalCode}{ }{ip.location.country}</p>
                <p>Your provider: {ip.as.name}</p>
                <p>Connection type: {ip.as.type}</p>
              </div>
            </div>
          <div className="row mt-3">
            <div className="col">
              <h4>Information about your country</h4>
              <CountryInfo country={ip.location.country}/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <h4>Date and time</h4>
              <p>Local date and time: {DateTime.now().setZone(`UTC${ip.location.timezone}`).toLocaleString(DateTime.DATETIME_FULL)}</p>
              <p>Date and time in LA: {DateTime.now().setZone('America/Los_Angeles').toLocaleString(DateTime.DATETIME_FULL)}</p>
              <p>{DateTime.now().setZone(`UTC${ip.location.timezone}`).offset - DateTime.now().setZone('America/Los_Angeles').offset} minutes difference</p>
            </div>
          </div>
        </div>
        <div className="col">
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={pos}
          defaultZoom={11}>
            <AnyReactComponent
            lat={pos.lat}
            lng={pos.lng}
            text={ip.ip}
          />
          
        </GoogleMapReact>
    </div>
      
    </div>

    </div>
      </div>

    
  );
}