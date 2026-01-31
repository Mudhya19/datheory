import { useState, useEffect } from 'react';

const LoadingIndicator = () => {
 const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const handleRequestStarted = () => {
      setRequestCount(prev => prev + 1);
      setIsLoading(true);
    };

    const handleRequestFinished = () => {
      setRequestCount(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          setIsLoading(false);
          return 0;
        }
        return newCount;
      });
    };

    window.addEventListener('apiRequestStarted', handleRequestStarted);
    window.addEventListener('apiRequestFinished', handleRequestFinished);

    return () => {
      window.removeEventListener('apiRequestStarted', handleRequestStarted);
      window.removeEventListener('apiRequestFinished', handleRequestFinished);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
