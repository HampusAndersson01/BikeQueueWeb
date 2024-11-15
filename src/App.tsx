import React, { useState, useCallback, useMemo, useEffect } from "react";
import { BikeQueueProvider, useBikeQueue } from "./components/BikeQueueContext";
import BikeQueue from "./components/BikeQueue";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './components/SettingsModal';
import translations, { Language } from './i18n';
import { arrayMove } from "@dnd-kit/sortable";

const ResetButton: React.FC = () => {
  const { resetAll, language } = useBikeQueue();
  const t = translations[language];

  const handleResetClick = () => {
    const confirmReset = window.confirm(t.confirmReset);
    if (confirmReset) {
      resetAll();
    }
  };

  return <button onClick={handleResetClick}>{t.resetAll}</button>;
};

const App: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(() => {
    const savedMinutes = localStorage.getItem('minutes');
    return savedMinutes ? parseInt(savedMinutes, 10) : 5;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [bikes, setBikes] = useState<string[]>(() => {
    const savedBikes = localStorage.getItem('bikes');
    return savedBikes ? JSON.parse(savedBikes) : ["1", "2", "3", "B"];
  });
  const { language } = useBikeQueue();
  const t = translations[language];

  const initialTimerDuration = useMemo(() => minutes * 60, [minutes]);

  const handleLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const isTablet = () => /ipad|android(?!.*mobile)|tablet/.test(navigator.userAgent.toLowerCase());
    
    if (isTablet()) {
      const confirmOpen = window.confirm("Är du säker på att du vill öppna en ny flik?");
      if (!confirmOpen) {
        event.preventDefault();
      }
    }
  }, []);

  const memoizedBikes = useMemo(() => bikes.map(bike => (
    <BikeQueue key={bike} bikeName={bike} initialDuration={initialTimerDuration} />
  )), [bikes, initialTimerDuration]);

  useEffect(() => {
    localStorage.setItem('minutes', minutes.toString());
  }, [minutes]);

  useEffect(() => {
    localStorage.setItem('bikes', JSON.stringify(bikes));
  }, [bikes]);

  return (
    <div className="app-container">
      <div className="header-container">
        <FontAwesomeIcon icon={faCog} onClick={() => setIsSettingsOpen(true)} className="settings-icon" />
        <p>{t.createdBy} <a href="https://github.com/HampusAndersson01" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Hampus Andersson</a></p>
        <ResetButton /> {/* Move the reset button here */}
      </div>
      <div className="bike-queue-container">
        {memoizedBikes}
      </div>
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          bikes={bikes}
          setBikes={setBikes}
          minutes={minutes}
          setMinutes={setMinutes}
        />
      )}
    </div>
  );
};

export default App;
