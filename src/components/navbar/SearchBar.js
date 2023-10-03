import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

import { search } from "../../services/api";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await search(searchTerm);
      const options = response.map(item => ({
        label: item.productName,
        value: item.idProduct
      }));

      setSearchResults([
        { label: searchTerm, value: searchTerm },
        ...options
      ]);
    }

    if (searchTerm !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (newValue) => {
    setSearchTerm(newValue);
  }

  const handleSelectChange = (selectedOption) => {
    if (selectedOption.label === searchTerm) {
      setSelectedOption(null);
      setSearchTerm("");
      navigate(`/search/${searchTerm}`);
    } else {
      setSelectedOption(null);
      setSearchTerm("");
      navigate(`/product/${selectedOption.label}/${selectedOption.value}`);
    }
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter' && searchTerm !== "") {
      e.preventDefault();
      if (searchTerm === searchResults[0].label) {
        setSelectedOption(null);
        setSearchTerm("");
        navigate(`/search/${searchTerm}`);
      } else {
        setSelectedOption(null);
        setSearchTerm("");
        navigate(`/product/${searchResults[0].label}/${searchResults[0].value}`);
      }
    }
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'whitesmoke',
      '&:hover': {
        backgroundColor: 'white',
        cursor: 'pointer',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'gray',
      backgroundColor: state.isSelected ? '#e7e2e2' : '#fcfcfc',
      '&:hover': {
        backgroundColor: '#f0ebeb',
      },
    }),
  };

  return (
    <div className="w-100 d-flex">
      <Select
        closeMenuOnSelect={false}
        styles={customStyles}
        value={selectedOption}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        options={searchResults}
        isSearchable={true}
        placeholder="Search"
        noOptionsMessage={() => null}
        className="w-100"
        inputValue={searchTerm}
        onKeyDown={handleEnterKey}
      />
    </div>
  );
}

export default SearchBar;