import React, { useRef } from 'react';

const Checkbox = ({ selected, setSelected, snapshot }) => {
    const checkRef = useRef();
    return (
        <Checkbox checked={selected.includes(index)} onChange={(e) => {
            if (e.target.checked) {
                setSelected(p => [...p, index]);
            } else {
                setSelected(p => p.filter(i => i !== index));
            }
        }} size={'lg'} border={'cyan'} hidden={(hover !== index && !selected.includes(index)) || snapshot.isDragging} className='absolute  top-[-84%] z-[2000] -left-[32%]'></Checkbox>
    );
};

export default Checkbox;