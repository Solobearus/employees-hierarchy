import React from 'react'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignIn from './SignIn'

afterEach(cleanup)

describe('SignIn component', () => {
    let props;

    beforeEach(() => {
        props = {
            test: "test"
        }
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(<SignIn {...props}/>);
        const linkElement = getByTestId('SignIn');
        expect(linkElement).toBeInTheDocument();
    });
});