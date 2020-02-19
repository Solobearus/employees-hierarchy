import React from 'react'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Employee from './Employee'

afterEach(cleanup)

describe('Employee component', () => {
    let props;

    beforeEach(() => {
        props = {
            test: "test"
        }
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(<Employee {...props}/>);
        const linkElement = getByTestId('Employee');
        expect(linkElement).toBeInTheDocument();
    });
});