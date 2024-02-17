import React from 'react';
import { render, screen,within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FooterAppSection from './FooterAppSection';

describe('FooterAppSection Component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <FooterAppSection />
      </Router>
    );

  
  });

  test('contains "BApp" text and others', () => {
    render(
      <Router>
        <FooterAppSection />
      </Router>
    );

    // Ensure that the "BApp" text is present in the footer
    const bAppText = screen.getByText('BApp');
    expect(bAppText).toBeInTheDocument();
    const title = screen.getByText('Special title treatment');
    expect(title).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
       // Find the Link component
       const link = screen.getByRole('link', { name: 'Register' }); // Update the name as per your button text

       // Find the Button component within the Link component
       const buttonL = within(link).getByRole('button', { name: /Register/i }); // Update the name as per your button text
   
       // Ensure that both Link and Button components are present
       expect(link).toBeInTheDocument();
       expect(buttonL).toBeInTheDocument();
  });
});