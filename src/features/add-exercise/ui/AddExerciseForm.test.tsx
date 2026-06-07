import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useGymStore } from "../../../app/store/gym.store";
import { ExercisesPage } from "../../../pages/ExercisesPage";

describe("AddExerciseForm", () => {
  const title = "test exercise";
  beforeAll(() => {
    useGymStore.getState().reset();
  });

  it("renders the AddExerciseForm", async () => {
    render(<ExercisesPage />);
    expect(screen.getByText("Добавить упражнение")).toBeInTheDocument();
    expect(screen.queryByTestId("form-add-exercises")).toBeNull();
    const btn = screen.getByTestId("btn-show-form-add");
    fireEvent.click(btn);
    const modal = await screen.findByTestId("form-add-exercises");
    expect(modal).toBeInTheDocument();
  });
  it("add new exercise", async () => {
    render(<ExercisesPage />);
    expect(screen.getByText("Добавить упражнение")).toBeInTheDocument();
    expect(screen.queryByTestId("form-add-exercises")).toBeNull();
    const btn = screen.getByTestId("btn-show-form-add");
    fireEvent.click(btn);
    const modal = await screen.findByTestId("form-add-exercises");
    expect(modal).toBeInTheDocument();
    const input = screen.getByTestId("input-add-exercises");
    fireEvent.change(input, { target: { value: title } });
    const btnAdd = screen.getByTestId("btn-add-exercises");
    fireEvent.click(btnAdd);
    await waitFor(() =>
      expect(screen.queryByTestId("form-add-exercises")).toBeNull(),
    );
  });
  it("show new exercise", async () => {
    render(<ExercisesPage />);
    await waitFor(() =>
      expect(
        Array.from(screen.queryAllByTestId("title-exercise")).filter(
          (el) => el.textContent === title,
        ).length,
      ).toBe(1),
    );
  });
  it("the exercise is already there", async () => {
    render(<ExercisesPage />);
    expect(screen.getByText("Добавить упражнение")).toBeInTheDocument();
    expect(screen.queryByTestId("form-add-exercises")).toBeNull();
    const btn = screen.getByTestId("btn-show-form-add");
    fireEvent.click(btn);
    const modal = await screen.findByTestId("form-add-exercises");
    expect(modal).toBeInTheDocument();
    const input = screen.getByTestId("input-add-exercises");
    fireEvent.change(input, { target: { value: title } });
    const btnAdd = screen.getByTestId("btn-add-exercises");
    fireEvent.click(btnAdd);
    expect(screen.getByTestId(`confirm-modal ${title}`)).toBeInTheDocument();
    const btnCancel = screen.getByRole("button", { name: /назад/i });
    fireEvent.click(btnCancel);
    expect(screen.queryByTestId(`confirm-modal ${title}`)).toBeNull();
    expect(screen.getByTestId("input-add-exercises")).toHaveValue(title);
  });
  it("the exercise is already there go", async () => {
    render(<ExercisesPage />);
    expect(screen.getByText("Добавить упражнение")).toBeInTheDocument();
    expect(screen.queryByTestId("form-add-exercises")).toBeNull();
    const btn = screen.getByTestId("btn-show-form-add");
    fireEvent.click(btn);
    const modal = await screen.findByTestId("form-add-exercises");
    expect(modal).toBeInTheDocument();
    const input = screen.getByTestId("input-add-exercises");
    fireEvent.change(input, { target: { value: title } });
    const btnAdd = screen.getByTestId("btn-add-exercises");
    fireEvent.click(btnAdd);
    expect(screen.getByTestId(`confirm-modal ${title}`)).toBeInTheDocument();
    const btnGoExercise = screen.getByRole("button", { name: /перейти/i });
    fireEvent.click(btnGoExercise);
    await waitFor(() =>
      expect(screen.queryByTestId(`exercise-modal ${title}`)).toBeInTheDocument()
    );
    
  });
  it("not delete exercise", async () => {
    render(<ExercisesPage />);
    const btnRemove = screen.getByTestId(`btn-remove-exercise ${title}`);
    fireEvent.click(btnRemove);
    expect(screen.queryByTestId(`modal-remove-exercise`)).toBeInTheDocument();
    const btnCancel = screen.getByRole("button", { name: /отмена/i });
    fireEvent.click(btnCancel);
    expect(screen.queryByTestId(`modal-remove-exercise`)).toBeNull();
    await waitFor(() =>
      expect(
        Array.from(screen.queryAllByTestId("title-exercise")).filter(
          (el) => el.textContent === title,
        ).length,
      ).toBe(1),
    );
  });
  it("delete exercise", async () => {
    render(<ExercisesPage />);
    const btnRemove = screen.getByTestId(`btn-remove-exercise ${title}`);
    fireEvent.click(btnRemove);
    expect(screen.queryByTestId(`modal-remove-exercise`)).toBeInTheDocument();
    const btnRemoveExercise = screen.getByRole("button", { name: /удалить/i });
    fireEvent.click(btnRemoveExercise);
    expect(screen.queryByTestId(`modal-remove-exercise`)).toBeNull();
    await waitFor(() =>
      expect(
        Array.from(screen.queryAllByTestId("title-exercise")).filter(
          (el) => el.textContent === title,
        ).length,
      ).toBe(0),
    );
  });
});
