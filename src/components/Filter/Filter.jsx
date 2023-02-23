import { useSelector, useDispatch } from 'react-redux';

import { changeFilter } from 'redux/contacts/filterSlice';
import { selectFilter } from 'redux/contacts/selectors';

export const Filter = () => {
    const filter = useSelector(selectFilter);

    const dispatch = useDispatch();

    const handleChange = ({target}) => {
        dispatch(changeFilter(target.value));
    };

    const handleClick = ({target}) => {
        dispatch(changeFilter(""));
        target.blur();
    };

    return (
        <>
            <label style={{marginBottom: '16px'}}>
                Filter

                <input type="text" className="input" value={filter} onChange={handleChange}/>
            </label>
            <button type='button' onClick={handleClick}>Clear</button>
        </>
    );
};