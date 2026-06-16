import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/theme-toggle'

const mockSetTheme = jest.fn()
let mockTheme = 'light'

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}))

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockTheme = 'light'
  })

  it('renders the theme toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
  })

  it('renders dark mode icon when theme is dark', () => {
    mockTheme = 'dark'
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
    
    // Check if the dark mode svg circle/paths are rendered
    const circle = button.querySelector('circle')
    expect(circle).toBeInTheDocument()
  })

  it('renders light mode icon when theme is light', () => {
    mockTheme = 'light'
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
    
    // In light mode, the svg contains only a path, no circle
    const circle = button.querySelector('circle')
    expect(circle).not.toBeInTheDocument()
  })

  it('calls setTheme to change to dark mode when clicked in light mode', () => {
    mockTheme = 'light'
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('calls setTheme to change to light mode when clicked in dark mode', () => {
    mockTheme = 'dark'
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })
})
