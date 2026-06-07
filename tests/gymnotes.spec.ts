import { expect, test } from "@playwright/test";

async function addExercise(page: any, title: string) {
  await page.getByTestId("btn-show-form-add").click();
  await page.getByTestId("input-add-exercises").fill(title);
  await page.getByTestId("btn-add-exercises").click();
}

test.describe("gym-notes", () => {
  const title = "test exercise";

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/"); 
  });

  test("should render initial page state and open add form", async ({
    page,
  }) => {

    await expect(page.getByText("Добавить упражнение")).toBeVisible();

    await expect(page.getByTestId("form-add-exercises")).not.toBeVisible();

    await page.getByTestId("btn-show-form-add").click();

    await expect(page.getByTestId("form-add-exercises")).toBeVisible();
  });

  test("should add new exercise and show it in the list", async ({ page }) => {

    await addExercise(page, title);

    await expect(page.getByTestId("form-add-exercises")).not.toBeVisible();


    const newExerciseTitle = page
      .getByTestId("title-exercise")
      .filter({ hasText: title });
    await expect(newExerciseTitle).toHaveCount(1);
  });

  test("should handle duplicate exercise error and allow to cancel", async ({
    page,
  }) => {

    await addExercise(page, title);

    await addExercise(page, title);

    const confirmModal = page.getByTestId(`confirm-modal ${title}`);
    await expect(confirmModal).toBeVisible();

    await page.getByRole("button", { name: /назад/i }).click();

    await expect(confirmModal).not.toBeVisible();
    await expect(page.getByTestId("input-add-exercises")).toHaveValue(title);
  });

  test("should handle duplicate exercise and navigate to it", async ({
    page,
  }) => {
    await addExercise(page, title);

    await addExercise(page, title);


    await page.getByRole("button", { name: /перейти/i }).click();


    await expect(page.getByTestId(`exercise-modal ${title}`)).toBeVisible();
  });

  test("should cancel exercise deletion", async ({ page }) => {

    await addExercise(page, title);

    await page.getByTestId(`btn-remove-exercise ${title}`).click();

    await expect(page.getByTestId("modal-remove-exercise")).toBeVisible();

    await page.getByRole("button", { name: /отмена/i }).click();

    await expect(page.getByTestId("modal-remove-exercise")).not.toBeVisible();
    await expect(
      page.getByTestId("title-exercise").filter({ hasText: title }),
    ).toHaveCount(1);
  });

  test("should successfully delete exercise", async ({ page }) => {

    await addExercise(page, title);

    await page.getByTestId(`btn-remove-exercise ${title}`).click();

    await page.getByRole("button", { name: /удалить/i }).click();

    await expect(page.getByTestId("modal-remove-exercise")).not.toBeVisible();

    await expect(
      page.getByTestId("title-exercise")).not.toBeVisible()
  });
});
