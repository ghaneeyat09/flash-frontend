import React from 'react';
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from 'react-async-script-loader';


function AutocompletePlaces({isScriptLoaded, isScriptLoadSucceed, placeholder, className}) {
    const [address, setAddress] = React.useState('');

    const handleChange = (value) => {
        setAddress(value)
    }
    const handleSelect = (value) => {
        setAddress(value)
    }
      if(isScriptLoaded && isScriptLoadSucceed) {
          return(
             <div>
              <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
                 {
                     ({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                         <div>
                            <input
                             {...getInputProps({
                                 placeholder: placeholder,
                                 className: className
                             })}     
                            />
                             <div>
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion =>{
                                    const style = suggestion.active? 
                                    {
                                        backgroundColor: 'gold',
                                        cursor: 'pointer'
                                    }: 
                                    {
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }

                                    return (
                                        <div {...getSuggestionItemProps(suggestion, {style})}
                                        key={suggestion.placeId}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                             </div>
                         </div>

                     )
                 }
              </PlacesAutocomplete>
          </div>
          )
      }
      else{
          return <div></div>
      }

    }

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`])(AutocompletePlaces);