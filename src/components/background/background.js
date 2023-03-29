import styled from 'styled-components';
import Frame from '../../assets/images/Frame.png';

const Background = () => {
    return (
        <Wrapper>
            <BackImage />
        </Wrapper>
    );
}

export default Background;

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
    
const BackImage = styled.div`
    position : relative;
    width: 100vw;
    height: 100vh;
    background: url(${Frame});
    background-repeat: no-repeat;
    background-size: cover;
`;