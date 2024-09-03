import React, { useState } from "react";
import { BikeQueueProvider, useBikeQueue } from "./components/BikeQueueContext";
import BikeQueue from "./components/BikeQueue";
import "./App.css"; // Ensure the CSS file is imported

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
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
              />
            </label>
          </div>
          <div className="reset-button-container">
            <ResetButton />
          </div>
        </div>
        <div className="bike-queue-container">
          <BikeQueue bikeName="1" />
          <BikeQueue bikeName="2" />
          <BikeQueue bikeName="3" />
          <BikeQueue bikeName="Spark" />
        </div>
      </div>
    </BikeQueueProvider>
  );
};

export default App;