import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
    margin-bottom: 20px;
`;

const InputLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 16px;
`;

const Input = ({ label, value, onChange }) => {
    return (
        <InputBox>
            <InputLabel>{label}</InputLabel>
            <StyledInput value={value} onChange={onChange} />
        </InputBox>
    );
};

export default Input;
