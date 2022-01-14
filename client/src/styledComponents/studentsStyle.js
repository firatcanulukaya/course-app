import styled from "styled-components";

export const CourseBadge = styled.a`
  color: #ffffff;
  background: ${props => props.hex};
  border-radius: 1rem;
  font-size: 15px;
  margin: 0 1rem;
  padding: .3rem 1rem;
  font-family: "Plus Jakarta Sans Medium";
  line-height: 1.2;
`

export const ModalFooterBtn = styled.button`
  font-family: "Plus Jakarta Sans SemiBold";
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