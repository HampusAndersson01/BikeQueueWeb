import React, { useState } from "react";
import Timer from "./Timer";
import { useBikeQueue } from "./BikeQueueContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface BikeQueueProps {
  bikeName: string;
}

const BikeQueue: React.FC<BikeQueueProps> = ({ bikeName }) => {
  const { queues, timers, currentUser, addToQueue, removeFromQueue, removePupilFromQueue } = useBikeQueue();
  const [newPupilName, setNewPupilName] = useState<string>("");

  const handleAddToQueue = () => {
    if (newPupilName.trim() !== "") {
      addToQueue(bikeName, newPupilName);
      setNewPupilName(""); // Clear the input after adding to the queue
    }
  };

  const handleRemoveFromQueue = () => {
    removeFromQueue(bikeName);
  };

  const handleRemovePupil = (index: number) => {
    if (window.confirm('Är du säker på att du vill ta bort denna elev från kön?')) {
      removePupilFromQueue(bikeName, index);
    }
  };

  return (
    <div className="bike-queue">
      <div className="bike-queue-header">
        <h2>{bikeName}</h2>
        {currentUser[bikeName] && (
          <Timer timeLeft={timers[bikeName]}/>
        )}
      </div>
      <p className="current-user">
        {currentUser[bikeName] || "Ingen"}
      </p>
      <div>
        <input
          type="text"
          value={newPupilName}
          onChange={(e) => setNewPupilName(e.target.value)}
          placeholder="Ange namn"
        />
        <button style={{ width: "100%", marginBottom: "0.5em", backgroundColor: "#28a745"}} onClick={handleAddToQueue}>Lägg till</button>
      </div>
      <button style={{ width: "100%", backgroundColor: "#fd7e14" }} onClick={handleRemoveFromQueue}>Byte</button>
      <div>
        <h3>Kö:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(queues[bikeName] || []).map((pupil, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em' }}>
              <span>{pupil}</span>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                }}
                onClick={() => handleRemovePupil(index)}
              >
                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BikeQueue;
