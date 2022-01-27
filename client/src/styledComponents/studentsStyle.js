import styled from "styled-components";

export const CourseBadge = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  background: ${props => props.hex};
  border-radius: 1rem;
  font-size: 15px;
  margin-left: .5rem;
  padding: .3rem 1rem;
  font-family: "Plus Jakarta Sans Medium", sans-serif;
  line-height: 1.2;
  
  a{
    color: #fff;
  }
  
  button{
    display: flex;
    margin-left: 10px;
  }
`

export const ModalFooterBtn = styled.button`
  font-family: "Plus Jakarta Sans SemiBold", sans-serif;
  min-width: 120px;
  height: 45px;
  border-radius: 6px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  font-size: 1rem;
  padding: 0 10px;
  margin-left: 1rem;

  ${
          props => {
            if (props.isStroke) {
              return `
        border: 1px solid ${props.strokeColor};
        `
            }

            if (props.isDisabled) {
              return `
          background-color: #7f1d1d;
          color: #a1a1aa;
          cursor: not-allowed;
           `
            }
          }

  }
`
export const InfoCardTag = styled.a`
  color: ${p => p.textColor};
  font-family: "Plus Jakarta Sans Medium", sans-serif;
  margin-right: 20px;
`

export const InfoButtons = styled.button`
  display: flex;
  justify-content: center;
  padding: 16px 0px;
  width: 232px;
  background: ${p => p.bgColor};
  border-radius: 50px;
  font-family: "Plus Jakarta Sans Medium", sans-serif;
  font-size: 15px;
  margin: 0 16px;
  color: ${p => p.textColor};

  ${p => {
    if (p.isHover) {
      return `
        &:hover {
    background: none;
    color: ${p.bgColor};
    border: 1px solid ${p.bgColor};
  }`
    }
  }}`