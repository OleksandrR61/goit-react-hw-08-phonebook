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
        <div style={{display: 'flex', alignItems: 'baseline', marginBottom: '16px'}}>
            <label>
                Filter

                <input type="text" className="input" value={filter} onChange={handleChange}/>
            </label>
            <button type='button' className='button' onClick={handleClick}>Clear</button>
        </div>
    );
};