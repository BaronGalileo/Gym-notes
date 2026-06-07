import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ExercisesPage } from './ExercisesPage';



describe('ExercisesPage', () => {
    it('renders the exercises page', () => {
        render(<ExercisesPage />)
        expect(screen.getByRole('button', { name: /добавить упражнение/i })).toBeInTheDocument()
    })
})