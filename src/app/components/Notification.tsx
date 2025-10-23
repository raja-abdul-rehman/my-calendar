import { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning';
  duration?: number;
}

function Notification({ message, type, duration = 3000 }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type];

  return (
    <div className={`fixed top-20 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-medium">{message}</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-2 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Notification;
