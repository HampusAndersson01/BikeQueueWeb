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
    </BikeQueueProvider>
  );
};

export default App;
