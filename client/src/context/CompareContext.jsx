import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('campusnest_compare');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      // Strictly sanitize items to make sure they have required fields
      return parsed.filter(item => 
        item && 
        typeof item === 'object' && 
        item.id && 
        item.pricing && 
        typeof item.pricing.monthlyRent === 'number'
      );
    } catch (e) {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('campusnest_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error('Failed to save compare list to localStorage', e);
    }
  }, [compareList]);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCompare = (property) => {
    if (!property || !property.id) return false;
    if (compareList.length >= 4) {
      showToast('You can compare a maximum of 4 properties at a time.');
      return false;
    }
    if (compareList.some((item) => item.id === property.id)) {
      showToast('Property is already in your comparison list.');
      return false;
    }
    setCompareList((prev) => [...prev, property]);
    showToast(`Added "${property.title || 'Property'}" to compare.`);
    return true;
  };

  const removeFromCompare = (propertyId) => {
    setCompareList((prev) => prev.filter((item) => item.id !== propertyId));
  };

  const isInCompare = (propertyId) => {
    return compareList.some((item) => item.id === propertyId);
  };

  const toggleCompare = (property) => {
    if (!property || !property.id) return;
    if (isInCompare(property.id)) {
      removeFromCompare(property.id);
      showToast('Removed from comparison.');
    } else {
      addToCompare(property);
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Cleared comparison list.');
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        toggleCompare,
        clearCompare,
        count: compareList.length,
        notification,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
