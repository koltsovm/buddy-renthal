import { test, expect } from '@playwright/test';

test('should have title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Братский прокат/);
});

test('should have login form', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible();
});

test('should redirect to groups when authenticated', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').fill('test@example.com');
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/groups/);
});

// Test group creation — страница GroupsPage пока не реализована
// test('should create a new group', async ({ page }) => {
//   await page.goto('/');
//
//   await page.getByRole('button', { name: 'Войти' }).click();
//
//   await page.getByPlaceholder('Email').fill('test@example.com');
//   await page.getByPlaceholder('Password').fill('password123');
//
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.getByRole('button', { name: 'Create Group' }).click();
//
//   await page.getByPlaceholder('Group Name').fill('Test Group');
//   await page.getByPlaceholder('Description').fill('Test Description');
//
//   await page.getByRole('button', { name: 'Create' }).click();
//
//   await expect(page.getByText('Test Group')).toBeVisible();
// });

// Test equipment management — страница EquipmentPage пока не реализована
// test('should add equipment to group', async ({ page }) => {
//   await page.goto('/');
//
//   await page.getByRole('button', { name: 'Войти' }).click();
//
//   await page.getByPlaceholder('Email').fill('test@example.com');
//   await page.getByPlaceholder('Password').fill('password123');
//
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.getByRole('link', { name: 'Test Group' }).click();
//
//   await page.getByRole('button', { name: 'Add Equipment' }).click();
//
//   await page.getByPlaceholder('Equipment Name').fill('Test Equipment');
//   await page.getByPlaceholder('Type').fill('Motorcycle');
//
//   await page.getByRole('button', { name: 'Save' }).click();
//
//   await expect(page.getByText('Test Equipment')).toBeVisible();
// });

// Test booking functionality — страница BookingsPage пока не реализована
// test('should create a booking', async ({ page }) => {
//   await page.goto('/');
//
//   await page.getByRole('button', { name: 'Войти' }).click();
//
//   await page.getByPlaceholder('Email').fill('test@example.com');
//   await page.getByPlaceholder('Password').fill('password123');
//
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.getByRole('link', { name: 'Test Group' }).click();
//
//   await page.getByRole('button', { name: 'Schedule Booking' }).click();
//
//   await page.getByPlaceholder('Start Date').fill('2024-01-15');
//   await page.getByPlaceholder('End Date').fill('2024-01-20');
//
//   await page.getByRole('button', { name: 'Create Booking' }).click();
//
//   await expect(page.getByText('2024-01-15')).toBeVisible();
// });

// Test expense tracking — страница ExpensesPage пока не реализована
// test('should add an expense', async ({ page }) => {
//   await page.goto('/');
//
//   await page.getByRole('button', { name: 'Войти' }).click();
//
//   await page.getByPlaceholder('Email').fill('test@example.com');
//   await page.getByPlaceholder('Password').fill('password123');
//
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.getByRole('link', { name: 'Test Group' }).click();
//
//   await page.getByRole('button', { name: 'Add Expense' }).click();
//
//   await page.getByPlaceholder('Description').fill('Test Expense');
//   await page.getByPlaceholder('Amount').fill('100.00');
//   await page.getByPlaceholder('Date').fill('2024-01-15');
//
//   await page.getByRole('button', { name: 'Save' }).click();
//
//   await expect(page.getByText('Test Expense')).toBeVisible();
// });