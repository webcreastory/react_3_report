import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Modal from './Modal';
import Input from './Input';
import Select from './Select';

function Button() {
    // Button 영역
    const btnClick = () => {
        alert('버튼을 만들어보세요');
    };
    const btnInput = () => {
        prompt('버튼을 만들었나요?');
    };

    // Modal 영역
    // Modal 영역에 useRef 추가
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal(); // 모달 외부 클릭 시 닫히도록
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);

    const openModal1 = () => {
        setModal1Open(true);
    };

    const closeModal1 = () => {
        setModal1Open(false);
    };

    const openModal2 = () => {
        setModal2Open(true);
    };

    const closeModal2 = () => {
        setModal2Open(false);
    };

    // 모달이 닫히도록 하는 함수
    const closeModal = () => {
        setModal1Open(false);
        setModal2Open(false);
    };

    // Input 영역
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        // 콤마 추가하는 로직
        const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setPrice(formattedValue);
    };

    const handleSave = () => {
        // 콤마 제거하는 로직
        const unformattedPrice = price.replace(/\D/g, '');
        alert(`Name: ${name}, Price: ${unformattedPrice}원`);
    };
    // const handleSave = () => {
    //     alert(`Name: ${name}, Price: ${price}`);
    // };

    // Select 영역
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <AppBody>
            <h1>React : Button Modal Input Select 기본형식 구현</h1>
            <StBox h="200px">
                {/* <h1>Button</h1> */}
                <StDiv>
                    <StDiv flex="column">
                        <StBtn bg="rgba(0, 0, 0, 0)" border="greenyellow" size="350px" onClick={btnClick}>
                            Large Primary Button ⚡
                        </StBtn>
                        <StBtn bg="rgba(0, 0, 0, 0)" border="orange" size="350px" onClick={btnInput}>
                            Large Negative Button ⛔
                        </StBtn>
                    </StDiv>
                    <div>
                        <StDiv>
                            {bgList.map((btn) => {
                                return (
                                    <StBtn bg="green" size={btn}>
                                        {bgName(btn)}
                                    </StBtn>
                                );
                            })}
                        </StDiv>
                        <StDiv>
                            {bgList.map((btn) => {
                                return (
                                    <StBtn bg="orange" size={btn}>
                                        {bgName(btn)}
                                    </StBtn>
                                );
                            })}
                        </StDiv>
                    </div>
                </StDiv>
            </StBox>

            <div id="modal-root"></div>
            <StBox h="120px">
                {/* <h1>Modal</h1> */}
                <div>
                    <StBtn bg="rgba(0, 0, 0, 0)" border="greenyellow" size="350px" onClick={openModal1}>
                        Open Modal ⭕
                    </StBtn>
                    {modal1Open && (
                        <OpModal>
                            <p>
                                닫기와 확인 버튼 2개가 있고, <br />
                                외부 영역을 눌러도 모달이 닫히지 않아요.
                            </p>
                            <button onClick={closeModal1}>닫기</button>
                            <button onClick={() => alert('[닫기] 버튼으로 모달창을 닫아주세요!')}>확인</button>
                        </OpModal>
                    )}

                    <StBtn bg="orange" size="250px" onClick={openModal2}>
                        Open Modal ❌
                    </StBtn>
                    {modal2Open && (
                        <OpModal ref={modalRef}>
                            <p>
                                ❌ 버튼 1개가 있고, <br />
                                외부 영역을 누르면 모달이 닫혀요.
                            </p>
                            <button onClick={closeModal2}>❌</button>
                        </OpModal>
                    )}
                </div>
            </StBox>

            <StBox h="120px">
                {/* <h1>Input</h1> */}
                <StDiv>
                    <h3>이름</h3>
                    <StInput label="이름" value={name} onChange={handleNameChange} />
                    <h3>, 금액</h3>
                    <StInput label="금액" value={price} onChange={handlePriceChange} />
                    <StBtn bg="green" size="90px" onClick={handleSave}>
                        저장
                    </StBtn>
                </StDiv>
            </StBox>

            <StBox h="120px">
                {/* <h1>Select</h1> */}
                <StDiv>
                    <Select options={options} selectedValue={selectedOption} onChange={handleSelectChange} />
                </StDiv>
            </StBox>
        </AppBody>
    );
}

// styled components
const AppBody = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;

const StBox = styled.div`
    width: 850px;
    height: ${(props) => props.h};
    border: 1px solid white;
    border-radius: 20px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StDiv = styled.div`
    display: flex;
    flex-direction: ${(props) => props.flex};
    justify-content: center;
    align-items: center;
`;
// 버튼 backgroundcolor 색상과 크기
const bgList = ['250px', '150px'];

// 색상과 크기를 넣으면 이름을 반환
const bgName = (width) => {
    switch (width) {
        case '250px':
            return 'Medium';
        default:
            return 'small';
    }
};
const StBtn = styled.button`
    width: ${(props) => props.size};
    height: 55px;
    padding: 10px;
    margin: 5px;
    background-color: ${(props) => props.bg};
    border-color: ${(props) => props.border};
    border-radius: 8px;
    color: ${(props) => (props.bg === 'orange' ? 'black' : 'white')};
    font-size: 22px;
    font-weight: 800;

    &:hover {
        font-size: 23px;
        font-weight: 900;
        background-color: red;
    }
`;
const OpModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 400px;
    font-size: 20px;
    transform: translate(-50%, -50%);
    background-color: #242326;
    padding: 40px;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.5); /* 외부 배경을 흐리게 하는 스타일 */
`;
const StInput = styled.input`
    width: 260px;
    height: 30px;
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 600;
`;
// const StSelec = styled.select`
//     width: 260px;
//     height: 30px;
//     padding: 10px;
//     margin: 5px;
//     border-radius: 8px;
//     font-size: 20px;
//     font-weight: 600;
// `;

ReactDOM.render(<Button />, document.getElementById('root'));
export default Button;
