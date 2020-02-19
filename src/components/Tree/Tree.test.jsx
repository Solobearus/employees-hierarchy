import React from 'react'
import { render, fireEvent, waitForElement, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Tree from './Tree'

afterEach(cleanup)

describe('Tree component', () => {
    let props;

    beforeEach(() => {
        props = {
            test: "test"
        }
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(<Tree {...props}/>);
        const linkElement = getByTestId('Tree');
        expect(linkElement).toBeInTheDocument();
    });
});