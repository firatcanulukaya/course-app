import styled from "styled-components";

export const CourseBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  background: ${props => props.hex};
  border-radius: 1rem;
  font-size: 15px;
  margin-top: 1rem;
  margin-right: .5rem;
  padding: .3rem 1rem;
  font-family: "Plus Jakarta Sans Medium", sans-serif;
  line-height: 1.2;
  
  a{
    color: #690000;
    mix-blend-mode: luminosity;
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
  border: 1px solid ${p => p.bgColor};

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

export const InfoBanner = styled.div`
  background: ${props => props.bgColor};
  width: 100%;
  height: 90px;
  border-radius: 12px 12px 0 0;
`

export const InfoCardTopPhoto = styled.div`
  position: absolute;
  left: 24px;
  top: 60px;
  background: ${p => p.bgColor};
  border-radius: 50%;
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .infoCardTopName {
    color: #690000;
    font-size: 33px;
    text-transform: uppercase;
    mix-blend-mode: luminosity;

  }`