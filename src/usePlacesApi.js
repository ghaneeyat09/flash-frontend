import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
const PlacesAutocomplete = ({placeholder}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions : {
            //define search scope here
        }, 
        debounce: 300
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });
    const handleInput = (e) => {
        setValue(e.target.value);
    };
    const handleSelect = ({description}) => () => {
        setValue(description, false);
        clearSuggestions();
    }
    const renderSuggestions = () => 
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text }} = suggestion;
                return (
                    <li key={place_id} onClick={handleSelect(suggestion)}>
                        <strong>{main_text}</strong> <small>{secondary_text}</small>
                    </li>
                )
        });
        return(
        <div ref={ref}>
           <input 
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder={placeholder}
           />
           {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </div>)
}

//export default PlacesAutocomplete;