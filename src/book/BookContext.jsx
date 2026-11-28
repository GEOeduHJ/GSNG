import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { STORAGE_KEY_V4 } from '../storage/unitRecords.js';
import { createStore, emptyUnitRecord, ensurePilotRecordId } from '../storage/unitRecords.js';

const BookContext = createContext(null);

export function BookProvider({ book, storage, children }) {
  const store = useMemo(() => createStore(storage), [storage]);
  const initial = useMemo(() => store.load(), [store]);
  const [units, setUnits] = useState(initial.units);
  const [storageAvailable, setStorageAvailable] = useState(initial.available);
  const unitsRef = useRef(units);

  const updateUnit = useCallback((unitId, updater) => {
    const current = unitsRef.current[unitId] ?? emptyUnitRecord(unitId);
    const updatedRecord = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    const nextRecord = updatedRecord === current ? current : ensurePilotRecordId(unitId, updatedRecord);
    const next = { ...unitsRef.current, [unitId]: nextRecord };
    unitsRef.current = next;
    setUnits(next);
    if (!store.save(next, unitId)) setStorageAvailable(false);
  }, [store]);

  // Another tab wrote records: take them in so this tab doesn't save stale data over them.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key && event.key !== STORAGE_KEY_V4) return;
      const loaded = store.load();
      if (!loaded.available) return;
      unitsRef.current = loaded.units;
      setUnits(loaded.units);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
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
