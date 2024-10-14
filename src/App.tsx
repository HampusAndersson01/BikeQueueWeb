import React, { useState } from "react";
import { BikeQueueProvider, useBikeQueue } from "./components/BikeQueueContext";
import BikeQueue from "./components/BikeQueue";
import "./App.css"; // Ensure the CSS file is imported
import MinutesInput from "./components/MinutesInput";

const ResetButton: React.FC = () => {
  const { resetAll } = useBikeQueue();

  const handleResetClick = () => {
    const confirmReset = window.confirm("Är du säker på att du vill återställa alla cyklar?");
    if (confirmReset) {
      resetAll();
    }
  };

  return <button onClick={handleResetClick}>Återställ Alla</button>;
};

const App: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(5); // Default 5 minutes

  const initialTimerDuration = minutes * 60; // Convert to seconds (minutes only)

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isTablet = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      console.log(userAgent);
      return /ipad|android(?!.*mobile)|tablet/.test(userAgent);
    };
    
    if (isTablet()) {
      const confirmOpen = window.confirm("Är du säker på att du vill öppna en ny flik?");
      if (!confirmOpen) {
        event.preventDefault();
      }
    }
  };

  return (
    <BikeQueueProvider initialDuration={initialTimerDuration}>
      <div className="app-container">
        <div className="header-container">
          <div className="time-settings">
            <label>
              Bytestid:
                <MinutesInput value={minutes} onChange={setMinutes} />
            </label>
          </div>
          <p>Skapad av <a href="https://github.com/HampusAndersson01" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Hampus Andersson</a></p>
        
          <div className="reset-button-container">
            <ResetButton />
          </div>
        </div>
        <div className="bike-queue-container">
          <BikeQueue bikeName="1" initialDuration={initialTimerDuration}/>
          <BikeQueue bikeName="2" initialDuration={initialTimerDuration}/>
          <BikeQueue bikeName="3" initialDuration={initialTimerDuration}/>
          <BikeQueue bikeName="B" initialDuration={initialTimerDuration}/>
          {/* <BikeQueue bikeName="Spark" initialDuration={initialTimerDuration}/> */}
        </div>
      </div>
      <footer>
        </footer>
    </BikeQueueProvider>
  );
};

export default App;
