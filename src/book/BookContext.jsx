import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createStore, emptyUnitRecord } from '../storage/unitRecords.js';

const BookContext = createContext(null);

export function BookProvider({ book, storage, children }) {
  const store = useMemo(() => createStore(storage), [storage]);
  const initial = useMemo(() => store.load(), [store]);
  const [units, setUnits] = useState(initial.units);
  const [storageAvailable, setStorageAvailable] = useState(initial.available);
  const unitsRef = useRef(units);

  const updateUnit = useCallback((unitId, updater) => {
    const current = unitsRef.current[unitId] ?? emptyUnitRecord(unitId);
    const nextRecord = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    const next = { ...unitsRef.current, [unitId]: nextRecord };
    unitsRef.current = next;
    setUnits(next);
    if (!store.save(next)) setStorageAvailable(false);
  }, [store]);

  const value = useMemo(() => ({ book, units, updateUnit, storageAvailable }), [book, units, updateUnit, storageAvailable]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook() {
  const value = useContext(BookContext);
  if (!value) throw new Error('useBook must be used inside BookProvider');
  return value;
}

export function useUnitRecord(unitId) {
  const { units, updateUnit } = useBook();
  const record = units[unitId] ?? emptyUnitRecord(unitId);
  const update = useCallback((updater) => updateUnit(unitId, updater), [unitId, updateUnit]);
  return [record, update];
}
