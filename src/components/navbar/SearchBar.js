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
        setSearchResults(options);
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
        setSelectedOption(null);
        setSearchTerm("");
      navigate(`/product/${selectedOption.label}/${selectedOption.value}`);      
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
      <Select
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
      />
    );
  }

export default SearchBar;