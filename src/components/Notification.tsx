// Notification.tsx
import React from "react";

interface NotificationProps {
  bikeName: string;
}

const Notification: React.FC<NotificationProps> = ({ bikeName }) => {
  return (
    <div>
      <p>Time's up for bike {bikeName}! Notify the next pupil.</p>
    </div>
  );
};

export default Notification;
