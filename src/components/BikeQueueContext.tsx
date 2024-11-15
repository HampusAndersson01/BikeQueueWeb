import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../i18n';

interface BikeQueueContextType {
  queues: Record<string, string[]>;
  timers: Record<string, number>;
  currentUser: Record<string, string | null>;
  addToQueue: (bikeName: string, pupilName: string) => void;
  removeFromQueue: (bikeName: string) => void;
  removePupilFromQueue: (bikeName: string, pupilIndex: number) => void;
  resetAll: () => void;
  language: Language; // Add language state
  setLanguage: (language: Language) => void; // Add setLanguage function
}

interface BikeQueueProviderProps {
  children: ReactNode;
  initialDuration: number; // New prop for initial timer duration
}

const BikeQueueContext = createContext<BikeQueueContextType | undefined>(undefined);

const BikeQueueProvider: React.FC<BikeQueueProviderProps> = ({ children, initialDuration }) => {
  const [queues, setQueues] = useState<Record<string, string[]>>({});
  const [timers, setTimers] = useState<Record<string, number>>({});
  const [currentUser, setCurrentUser] = useState<Record<string, string | null>>({});
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? (savedLanguage as Language) : 'sv';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const resetAll = () => {
    setQueues({});
    setTimers({});
    setCurrentUser({});
  };

  const addToQueue = (bikeName: string, pupilName: string) => {
    setQueues((prevQueues) => {
      const updatedQueue = [...(prevQueues[bikeName] || [])];

      if (!currentUser[bikeName]) {
        // Set the user as the current user
        setCurrentUser((prevCurrentUser) => ({
          ...prevCurrentUser,
          [bikeName]: pupilName,
        }));
        setTimers((prevTimers) => ({
          ...prevTimers,
          [bikeName]: initialDuration, // Use the passed initialDuration
        }));
      } else {
        updatedQueue.push(pupilName);
      }

      return { ...prevQueues, [bikeName]: updatedQueue };
    });
  };

  const removeFromQueue = (bikeName: string) => {
    setQueues((prevQueues) => {
      const updatedQueue = [...(prevQueues[bikeName] || [])];
      const removedUser = updatedQueue.shift(); // Remove the first user from the queue
  
      setCurrentUser((prevCurrentUser) => {
        const newCurrentUser = { ...prevCurrentUser };
  
        if (removedUser) {
          // Set the next user in the queue as the current user if one was removed
          newCurrentUser[bikeName] = removedUser;
  
          // Reset the timer for the new current user
          setTimers((prevTimers) => ({
            ...prevTimers,
            [bikeName]: initialDuration, // Use the initialDuration
          }));
        } else {
          // No one left in the queue
          newCurrentUser[bikeName] = null;
        }
  
        return newCurrentUser;
      });
  
      // Update the queues with the removed user
      return { ...prevQueues, [bikeName]: updatedQueue };
    });
  };

  const removePupilFromQueue = (bikeName: string, pupilIndex: number) => {
    setQueues((prevQueues) => {
      const updatedQueue = [...(prevQueues[bikeName] || [])];
      if (pupilIndex >= 0 && pupilIndex < updatedQueue.length) {
        updatedQueue.splice(pupilIndex, 1); // Remove pupil at specified index
      }
      return { ...prevQueues, [bikeName]: updatedQueue };
    });
  };

  // Update timers based on elapsed time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
  
        Object.keys(updatedTimers).forEach((bikeName) => {
          if (updatedTimers[bikeName] > 0) {
            updatedTimers[bikeName] -= 1;
          }
        });
  
        return updatedTimers;
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BikeQueueContext.Provider
      value={{
        queues,
        timers,
        currentUser,
        addToQueue,
        removeFromQueue,
        removePupilFromQueue,
        resetAll,
        language, // Provide language state
        setLanguage, // Provide setLanguage function
      }}
    >
      {children}
    </BikeQueueContext.Provider>
  );
};

const useBikeQueue = () => {
  const context = useContext(BikeQueueContext);
  if (context === undefined) {
    throw new Error('useBikeQueue must be used within a BikeQueueProvider');
  }
  return context;
};

export { BikeQueueProvider, useBikeQueue };
