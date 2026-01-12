import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useBikeQueue } from "./components/BikeQueueContext";
import BikeQueue from "./components/BikeQueue";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './components/SettingsModal';
import translations from './i18n';
import { useDarkMode } from './hooks/useDarkMode'; // Custom hook for dark mode
import LoadingIndicator from './components/LoadingIndicator'; // Loading indicator component

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
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

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

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate a fetch or some async operation
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="app-container">
      <div className="header-container">
        <div className="icon-container">
          <FontAwesomeIcon icon={faCog} onClick={() => setIsSettingsOpen(true)} className="settings-icon" />
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} onClick={toggleDarkMode} className="dark-mode-icon" />
        </div>
        <p>{t.createdBy} <a href="https://github.com/HampusAndersson01" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Hampus Andersson</a></p>
        <ResetButton />
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="bike-queue-container">
          {memoizedBikes}
        </div>
      )}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          bikes={bikes}
          setBikes={setBikes}
          minutes={minutes}
          setMinutes={setMinutes}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default App;
