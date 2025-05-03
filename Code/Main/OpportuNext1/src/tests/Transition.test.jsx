import React from 'react';
import { render, screen } from '@testing-library/react';
import transition from '../components/Transition';
import '@testing-library/jest-dom';

// Setting up dummy component
const Dummy = () => <div data-testid="dummy">Dummy Component</div>;

// Wrap the Dummy component with the transition HOC 
const TransitionedDummy = transition(Dummy, 0.5);

describe('transition HOC', () => {
  it('renders the wrapped component', () => {
    render(<TransitionedDummy />);
    
    // Verify that the Dummy component is rendered
    expect(screen.getByTestId('dummy')).toBeInTheDocument();
    expect(screen.getByText('Dummy Component')).toBeInTheDocument();
  });

  it('renders a motion container wrapping the component', () => {
    const { container } = render(<TransitionedDummy />);
    
    // checking that the top-level element exists and contains the Dummy content.
    const motionContainer = container.firstChild;
    expect(motionContainer).toBeInTheDocument();
    expect(motionContainer).toHaveTextContent('Dummy Component');
  });
});
