import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CurISO } from 'types';
import { includes } from 'utils';

import * as styles from './styles.module.css';

interface AutoCompleteProps {
  searchObject: typeof CURRENCY_ISO_SYMBOL_MAP;
  defaultValue: CurISO;
  selectHandler: (key: CurISO) => () => void;
  name?: string;
  className?: string;
}

export function AutoComplete({ searchObject, defaultValue, selectHandler, name, className }: AutoCompleteProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const getSuggestions = (value: string) => {
    const result: string[] = [];

    for (const key in searchObject) {
      const currencyObject = searchObject[key];
      if (includes(value, key)) {
        result.push(key);
        continue;
      }

      if (includes(value, currencyObject.name)) {
        result.push(key);
        continue;
      }

      if (includes(value, currencyObject.symbol)) {
        result.push(key);
      }
    }

    return result;
  };

  const updateSuggestions = (value: string) => {
    setCurrentSuggestions(getSuggestions(value));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    updateSuggestions(event.target.value);
    if (event.target.value === '') {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const optionSelectHandler = (key: CurISO) => () => {
    if (searchRef.current) {
      searchRef.current.value = searchObject[key].name;
    }
    selectHandler(key)();
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (defaultValue && searchRef.current) {
      searchRef.current.value = searchObject[defaultValue].name;
    }
  }, [defaultValue, searchObject]);

  return (
    <div className={`${styles.autocomplete} ${className ?? ''}`}>
      <input
        type="search"
        onChange={changeHandler}
        ref={searchRef}
        name={name}
        id={name}
        autoComplete="one-time-code"
        placeholder="Search currency"
        required
      />
      {showSuggestions && (
        <ul className={styles.suggestionsList}>
          {currentSuggestions.length > 0 ? (
            currentSuggestions.map((currencyKey) => (
              <li key={currencyKey} className={styles.autocompleteOption}>
                <button type="button" onClick={optionSelectHandler(currencyKey)}>
                  {searchObject[currencyKey].name}
                </button>
              </li>
            ))
          ) : (
            <li className={styles.nothingFound}>Nothing found</li>
          )}
        </ul>
      )}
    </div>
  );
}
