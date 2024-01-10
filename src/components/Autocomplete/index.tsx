import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import { includes } from '../../utils/includes';
import * as styles from './styles.module.css';

interface AutoCompleteProps {
  searchObject: typeof CUR_ISO_SYMBOL_MAP;
  defaultValue: CurISO;
  selectHandler: (key: CurISO) => () => void;
  name?: string;
  className?: string;
}

function AutoComplete({ searchObject, defaultValue, selectHandler, name, className }: AutoCompleteProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const getSuggestions = (value: string) => {
    const keys = Object.keys(searchObject);
    const result: string[] = [];

    keys.forEach((key) => {
      const currencyObject = searchObject[key];
      if (includes(value, key)) {
        result.push(key);
        return;
      }

      if (includes(value, currencyObject.name)) {
        result.push(key);
        return;
      }

      if (includes(value, currencyObject.symbol)) {
        result.push(key);
      }
    });

    return result;
  };

  const updateSuggestions = (value: string) => {
    setCurrentSuggestions(getSuggestions(value));
    setShowSuggestions(true);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    updateSuggestions(event.target.value);
  };

  const optionSelectHandler = (key: CurISO) => () => {
    searchRef.current!.value = searchObject[key].name;
    selectHandler(key)();
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (defaultValue) {
      searchRef.current!.value = searchObject[defaultValue].name;
    }
  }, [defaultValue, searchObject]);

  return (
    <div className={`${styles.autocomplete} ${className ?? ''}`}>
      <input type="search" onChange={changeHandler} ref={searchRef} name={name} id={name} />
      <ul className={styles.suggestionsList}>
        {showSuggestions &&
          currentSuggestions.map((currencyKey) => (
            <li key={currencyKey} className={styles.autocompleteOption}>
              <button type="button" onClick={optionSelectHandler(currencyKey)}>
                {CUR_ISO_SYMBOL_MAP[currencyKey].name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AutoComplete;
