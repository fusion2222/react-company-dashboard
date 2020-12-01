import React from "react";
import { API_URL } from "../config";


const charWindowConnectionStatus = {
  PREPARING: null,
  SUCCESS: true,
  BROKEN: false 
}


const CharWindowNew = ({ dashboardName, graphComponent, apiSlug }) => {
  const [
    { connectionState, graphData, requests, isFetching },
    setLocalState,
  ] = React.useState({
    connectionState: charWindowConnectionStatus.PREPARING,
    graphData: null,
    isFetching: false,
    /* 
        React robi redraw iba v pripade ak sa mu zmenia props.
        Preto v pripade fetchovania dat budeme inkrementovat
        cislo requestu v props.
        
        To sposobi, ze po kazdom requeste sa redrawnu grafy.
    */
    requests: 0,
  });

  React.useEffect(() => {
    /*
        Toto je zastupny shorthand pre mount a unmout funkcie.
        Obsah tejto funkcie sa udeje pocas mountu a vratena 
        closure ktoru tato funkcia vracia.
    */

    const timer = setTimeout(async () => {

      // [{"amt":30,"c":11,"n":2,"name":"HR"},{"amt":30,"c":15,"n":30,"name":"Tech"},{"amt":30,"c":2,"n":10,"name":"Management"},{"amt":30,"c":28,"n":5,"name":"Marketing"}]
      let status_code = null;
      const response = await fetch(API_URL + '/' + apiSlug)
        .then((response) => {
          status_code = response.status;
          return response.json();
        }).catch((response) => {
          // Null cause default 0 data to be used instead.
          status_code = response.status;
          return null;
        });
      
      let newConnectionState;

      switch(status_code){
        case null:
          newConnectionState = charWindowConnectionStatus.PREPARING;
          break;
        case 200:
          newConnectionState = charWindowConnectionStatus.SUCCESS;
          break;
        default:
          newConnectionState = charWindowConnectionStatus.BROKEN;
      }

      setLocalState((prev) => ({
        ...prev,
        requests: requests + 1,
        graphData: response,
        connectionState: newConnectionState
      }));
    }, 4000);

    return () => clearTimeout(timer);
  }, [requests, graphData, apiSlug]);

  const getConnectionButtonClass = (connectionState) => {
    // Template function
    switch(connectionState){
      case charWindowConnectionStatus.PREPARING:
        return 'btn-gray';
      case charWindowConnectionStatus.SUCCESS:
        return 'btn-green';
      case charWindowConnectionStatus.BROKEN:
        return 'btn-red';
    }
    console.log(`Connection state ${connectionState} not handled properly!`);
  }

  const getConnectionButtonLabel = () => {
    // Template function
    switch(connectionState){
      case charWindowConnectionStatus.PREPARING:
        return '... Fetching ...';
      case charWindowConnectionStatus.SUCCESS:
        return '◼ Break Connection';
      case charWindowConnectionStatus.BROKEN:
        return '▶ Enable Connection';
    }
    console.log(`Connection state ${connectionState} not handled properly!`);
  }

  const clickConnectionButton = async (e) => {
    setLocalState((prev) => ({
      ...prev,
      isFetching: true,
    }));
    
    const connectionURL = API_URL + '/connection/' + apiSlug;
    const response = await fetch(connectionURL)
      .then((response) => {  
        return response.json();
      }).catch((response) => {
        return null;
      });
    
    if(response === null){
      console.log(`Whoops... looks like ${connectionURL} is broken`);
      return;
    }

    setLocalState((prev) => ({
      ...prev,
      isFetching: false,
      connectionState: response.connection_status,
    }));
  };

  return (
    <section className="col w-sm-100 w-lg-50">
      <div className="chart-window">
        <div className="chart-window--head">
          <strong className="chart-window--heading">{dashboardName}</strong>
          <div className="chart-window--head-controlls">
            <button
              className={`btn chart-window--btn ${getConnectionButtonClass(connectionState)}`}
              onClick={clickConnectionButton}
              disabled={isFetching}
            >
              {getConnectionButtonLabel(connectionState)}
            </button>
          </div>
        </div>
        {React.cloneElement(graphComponent, { graphData })}
      </div>
    </section>
  );
};

export default CharWindowNew;
