import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
    position: relative;
    display: inline-block;
`;

const SelectBox = styled.div`
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
    cursor: pointer;
`;

const OptionList = styled.div`
    display: ${(props) => (props.showOptions ? 'block' : 'none')};
    position: absolute;
    width: 200px;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    background: #403c3c;
    padding: 8px;
    cursor: pointer;
    z-index: 100;
    top: 40px;
    left: 0;
`;

const Option = styled.div`
    padding: 5px;
    &:hover {
        background: #343232;
    }
`;

const Select = ({ options, selectedValue, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleSelectClick = () => {
        setShowOptions(!showOptions);
    };

    const handleOptionClick = (value) => {
        onChange(value);
        setShowOptions(false);
    };

    return (
        <StyledSelect>
            <SelectBox onClick={handleSelectClick}>{selectedValue || '선택하세요'}</SelectBox>
            <OptionList showOptions={showOptions}>
                {options.map((option, index) => (
                    <Option key={index} onClick={() => handleOptionClick(option.value)}>
                        {option.label}
                    </Option>
                ))}
            </OptionList>
        </StyledSelect>
    );
};

export default Select;
