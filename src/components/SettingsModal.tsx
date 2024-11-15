import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useBikeQueue } from './BikeQueueContext';
import translations, { Language } from '../i18n';
import MinutesInput from './MinutesInput';
import ReactCountryFlag from 'react-country-flag';

interface SettingsModalProps {
  onClose: () => void;
  bikes: string[];
  setBikes: (bikes: string[]) => void;
  minutes: number;
  setMinutes: (minutes: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, bikes, setBikes, minutes, setMinutes }) => {
  const [newBike, setNewBike] = useState<string>('');
  const { language, setLanguage } = useBikeQueue();
  const t = translations[language];
  const modalRef = useRef<HTMLDivElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleAddBike = () => {
    if (newBike.trim()) {
      const updatedBikes = [...bikes, `${newBike}-${Date.now()}`];
      setBikes(updatedBikes);
      localStorage.setItem('bikes', JSON.stringify(updatedBikes));
      setNewBike('');
    }
  };

  const handleRemoveBike = (bike: string) => {
    const updatedBikes = bikes.filter(b => b !== bike);
    setBikes(updatedBikes);
    localStorage.setItem('bikes', JSON.stringify(updatedBikes));
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const moveBike = (index: number, direction: 'up' | 'down') => {
    const newBikes = [...bikes];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBikes[index], newBikes[swapIndex]] = [newBikes[swapIndex], newBikes[index]];
    setBikes(newBikes);
    localStorage.setItem('bikes', JSON.stringify(newBikes));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="settings-modal">
      <div className="settings-modal-content" ref={modalRef}>
        <FontAwesomeIcon icon={faTimes} onClick={onClose} style={{ cursor: 'pointer', float: 'right' }} />
        <h2>{t.settings}</h2>
        <div>
          <label>{t.language}:</label>
          <div className="language-selector">
            <ReactCountryFlag countryCode="SE" svg style={{ width: '2em', height: '2em' }} onClick={() => handleLanguageChange('sv')} title="Svenska" />
            <ReactCountryFlag countryCode="GB" svg style={{ width: '2em', height: '2em' }} onClick={() => handleLanguageChange('en')} title="English" />
          </div>
        </div>
        <div>
          <label>{t.changeTime}:</label>
          <MinutesInput value={minutes} onChange={setMinutes} />
        </div>
        <div>
          <label>{t.bikes}:</label>
          <ul className="droppable">
            {bikes.map((bike, index) => (
              <li
                key={bike}
                className="draggable-item"
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    onClick={() => moveBike(index, 'up')}
                    className={`arrow-icon ${index === 0 ? 'disabled' : ''}`}
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    onClick={() => moveBike(index, 'down')}
                    className={`arrow-icon ${index === bikes.length - 1 ? 'disabled' : ''}`}
                  />
                  <span style={{ marginLeft: '10px' }}>{bike.split('-')[0]}</span>
                </div>
                <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoveBike(bike)} style={{ cursor: 'pointer' }} />
              </li>
            ))}
          </ul>
          <input type="text" value={newBike} onChange={(e) => setNewBike(e.target.value)} placeholder={t.addBike} />
          <button onClick={handleAddBike}>{t.addBike}</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;