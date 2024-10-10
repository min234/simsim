import styled from "styled-components";

export const Component = styled.div`
a{
    text-decoration-line: none;
    color:#fff;
    }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
       margin-bottom: 50px;
    position: relative; /* 유지 */
  }

  .Home_button {
    font-size: 96px;
        margin-bottom: 80px; /* 적절한 간격 추가 */
  olor: #fff;
  }

  .List {
    display: flex;
    gap: 50px;
    font-size: 30px;
    cursor: pointer;
  }
`;
