import { createPortal } from "react-dom";
import React from 'react'
import styled from 'styled-components'

const Test = styled.div`
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
      }
    
      componentDidMount() {
        modalRoot.appendChild(this.el);
      }
    
      componentWillUnmount() {
        modalRoot.removeChild(this.el);
      }

    render() {
        return createPortal (
            <Test onClick={() => this.props.setIsSelected(false)}>
                test portal
            </Test>
            , this.el,
        );
    }
}

export default Modal;