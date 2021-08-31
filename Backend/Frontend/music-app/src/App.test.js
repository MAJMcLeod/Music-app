import { render, screen } from '@testing-library/react';
import App from './App';
import Body from './Components/Body'
import renderer from 'react-test-renderer'

describe("Snapshot Test", () => {
  test("Snapshot for App.js Component", () => {
    const renderedApp= renderer.create(<App/>).toJSON()
    expect(renderedApp).toMatchSnapshot();
  })

  test("Snapshot for Body.js Component", () => {
    const renderedApp= renderer.create(<Body/>).toJSON()
    expect(renderedApp).toMatchSnapshot();
  })
})
// tests that check to see if each respective component matches the 
// saved snapshots
