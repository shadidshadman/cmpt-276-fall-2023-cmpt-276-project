import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Downshift from 'downshift';

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (input) {
      axios
        .get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.22c84b6be0c9b9d989909d0073e3017f&q=${input}&tag=place:city`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching autocomplete data", error);
        });
    }
  }, [input]);

  return (
    <Downshift
      onInputValueChange={(inputValue) => setInput(inputValue)}
      onChange={(selection) => setCity(selection.display_name)}
      itemToString={(item) => (item ? item.display_name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen &&
              items.map((item, index) => (
                <li
                  {...getItemProps({
                    key: item.place_id,
                    index,
                    item,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item.display_name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default SearchBar;