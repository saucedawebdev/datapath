/**
 * End-to-end QA — Job Ready Edition
 */
import { test, expect } from '@playwright/test';

const BASE = process.env.QA_BASE_URL || 'http://localhost:5173';

test.describe('DATApath Job Ready Edition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(async () => {
      indexedDB.deleteDatabase('datapath-db');
      localStorage.clear();
    });
    await page.reload();
    await page.waitForSelector('#main-content', { timeout: 15000 });
  });

  test('loads dashboard with hero tagline', async ({ page }) => {
    await expect(page.locator('.dashboard-hero__title')).toContainText('Build the skills');
  });

  test('SQL subject shows 40 lessons', async ({ page }) => {
    await page.goto(`${BASE}#/learn/sql`);
    await expect(page.locator('.lesson-outline__item')).toHaveCount(40);
    await expect(page.locator('.lesson-outline__item a').first()).toBeVisible();
  });

  test('all subject lesson links are clickable', async ({ page }) => {
    await page.goto(`${BASE}#/learn/excel`);
    const links = page.locator('.lesson-outline__item a');
    await expect(links).toHaveCount(20);
    await links.first().click();
    await expect(page.locator('h1.page-header__title')).toBeVisible();
  });

  test('lesson completion persists', async ({ page }) => {
    await page.goto(`${BASE}#/lesson/sql-lesson-select-basics`);
    await page.getByRole('button', { name: 'Mark complete' }).click();
    await page.waitForSelector('text=Completed');
    await page.reload();
    await expect(page.locator('.badge--complete')).toContainText('Completed');
  });

  test('SQL workspace runs query', async ({ page }) => {
    await page.goto(`${BASE}#/playground/sql`);
    await page.waitForSelector('h1.page-header__title', { timeout: 20000 });
    await page.getByRole('button', { name: /Run/ }).click();
    await expect(page.locator('.data-table, .sql-status--success').first()).toBeVisible({ timeout: 15000 });
  });

  test('search finds lessons', async ({ page }) => {
    await page.goto(`${BASE}#/search?q=Northstar`);
    await expect(page.locator('.search-result').first()).toBeVisible();
  });

  test('tableau practice renders bar chart for Region and Revenue', async ({ page }) => {
    await page.goto(`${BASE}#/practice/tableau/tableau-interface/guided`);
    await expect(page.locator('.practice-tableau')).toBeVisible({ timeout: 10000 });

    await page.locator('#tab-rows').selectOption('Region');
    await page.locator('#tab-cols').selectOption('Revenue');
    await expect(page.locator('.tableau-bar, .tableau-chart-svg rect').first()).toBeVisible();
    await expect(page.locator('.tableau-empty-state')).toHaveCount(0);

    const box = await page.locator('.tableau-chart-svg').boundingBox();
    expect(box?.width).toBeGreaterThan(100);
    expect(box?.height).toBeGreaterThan(100);

    await expect(page.getByRole('button', { name: 'Check Visualization' })).toBeEnabled();
  });

  test('power bi practice loads report builder and renders chart preview', async ({ page }) => {
    await page.goto(`${BASE}#/practice/power-bi/visualizations-and-chart-selection/guided`);
    await expect(page.locator('.practice-powerbi--report')).toBeVisible({ timeout: 10000 });

    await page.locator('#pbi-visual').selectOption('Bar chart');
    await page.locator('#pbi-field').selectOption('Category');
    await expect(page.locator('.pbi-bar, .pbi-visual-svg rect').first()).toBeVisible();
    await expect(page.locator('.pbi-empty-state')).toHaveCount(0);

    const box = await page.locator('.pbi-visual-svg').boundingBox();
    expect(box?.width).toBeGreaterThan(50);
    expect(box?.height).toBeGreaterThan(50);
  });

  test('power bi desktop lesson loads desktop simulator not generic canvas', async ({ page }) => {
    await page.goto(`${BASE}#/practice/power-bi/power-bi-desktop-interface/guided`);
    await expect(page.locator('.practice-powerbi--desktop')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.pbi-desktop-tabs')).toBeVisible();
    await expect(page.locator('text=Report canvas preview')).toHaveCount(0);
  });

  test('conceptual SQL practice uses text interface not Run Query', async ({ page }) => {
    await page.goto(`${BASE}#/practice/sql/intro-databases/guided`);
    await expect(page.locator('.practice-conceptual')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Run Query')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Check Answer' })).toBeVisible();
  });

  test('excel practice uses spreadsheet interface', async ({ page }) => {
    await page.goto(`${BASE}#/practice/excel/conditional-formatting/guided`);
    await expect(page.locator('.practice-excel')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.spreadsheet-lab__grid')).toBeVisible();
    await expect(page.locator('text=Run Query')).toHaveCount(0);
  });

  test('library filters references by subject', async ({ page }) => {
    await page.goto(`${BASE}#/library`);
    await expect(page.locator('#library-results .card')).toHaveCount(46, { timeout: 10000 });

    await page.locator('#filter-subject').selectOption('sql');
    await expect(page.locator('#library-count')).toContainText('10 of 10');
    await expect(page.locator('#library-results .card')).toHaveCount(10);
    await expect(page.locator('#library-results .card').first()).toContainText('SQL');

    await page.locator('#filter-subject').selectOption('excel');
    await expect(page.locator('#library-count')).toContainText('8 of 8');
    await expect(page.locator('#library-results .card')).toHaveCount(8);
  });

  test('mobile layout renders', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.mobile-nav').getByRole('link', { name: 'Learn' }).click();
    await expect(page.locator('h1')).toContainText('Learning Path');
  });
});
