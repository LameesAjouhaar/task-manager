import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
    const mockAddTask = jest.fn();
    const mockCloseModal = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders input field and buttons', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} />);

        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    test('submits the form and calls addTask with input value', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} />);

        const input = screen.getByPlaceholderText(/add a new task/i);
        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(mockAddTask).toHaveBeenCalledWith('New Task');
        expect(mockAddTask).toHaveBeenCalledTimes(1);
    });

    test('shows error message when input is empty on submit', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(screen.getByText('* Task name cannot be empty!')).toBeInTheDocument();
        expect(mockAddTask).not.toHaveBeenCalled();
    });

    test('clears error message on input change', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByRole('button', { name: /add task/i }));
        const input = screen.getByPlaceholderText(/add a new task/i);

        fireEvent.change(input, { target: { value: 'New Task' } });

        expect(screen.queryByText('* Task name cannot be empty!')).not.toBeInTheDocument();
    });

    test('closes modal when Close button is clicked', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        expect(mockCloseModal).toHaveBeenCalledTimes(1);
    });

    test('updates input value when initialDescription is passed', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} initialDescription="Initial Task" />);

        const input = screen.getByPlaceholderText(/add a new task/i) as HTMLInputElement; // Type assertion
        expect(input.value).toBe("Initial Task");
    });

    test('renders Update Task button if initialDescription is passed', () => {
        render(<TaskForm addTask={mockAddTask} closeModal={mockCloseModal} initialDescription="Initial Task" />);

        expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
    });
});
