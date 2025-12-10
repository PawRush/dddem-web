const { test, expect } = require('@playwright/test');

test.describe('Navigation and Page Routing', () => {
  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');

    // Navigate to About page
    await page.goto('/about-the-conference');

    // Verify page loaded
    await expect(page).toHaveTitle(/About DDD East Midlands/);

    // Check for main content
    const heading = page.getByRole('heading', {
      name: /What Was DDD East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Verify table of contents
    const contents = page.getByRole('heading', { name: 'Contents' });
    await expect(contents).toBeVisible();

    // Verify specific section content
    const dddemDescription = page.locator(
      'text=The East Midlands tech scene was incredibly diverse'
    );
    await expect(dddemDescription).toBeVisible();
  });

  test('should navigate to Agenda page', async ({ page }) => {
    await page.goto('/');

    // Navigate to Agenda page
    await page.goto('/agenda');

    // Verify page loaded
    await expect(page).toHaveTitle(/Agenda/);

    // Check for header
    const header = page.locator('text=Agenda');
    await expect(header).toBeVisible();
  });

  test('should navigate to Talks page', async ({ page }) => {
    await page.goto('/');

    // Navigate to Talks page
    await page.goto('/talks');

    // Verify page loaded
    await expect(page).toHaveTitle(/Talks/);

    // Check for filtering instructions
    const filteringHeading = page.getByRole('heading', {
      name: 'Filtering',
    });
    await expect(filteringHeading).toBeVisible();

    // Check for voting section
    const votingHeading = page.getByRole('heading', { name: 'Voting' });
    await expect(votingHeading).toBeVisible();

    // Verify desktop recommendation message
    const desktopMessage = page.locator(
      'text=We advise using this page on desktop'
    );
    await expect(desktopMessage).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');

    // Navigate to Contact page
    await page.goto('/contact');

    // Verify page loaded
    await expect(page).toHaveTitle(/Contact/);

    // Check for main sections
    const contentsHeading = page.getByRole('heading', {
      name: 'Contents',
    });
    await expect(contentsHeading).toBeVisible();

    // Check for "On The Day" section
    const onTheDayHeading = page.getByRole('heading', {
      name: 'On The Day',
    });
    await expect(onTheDayHeading).toBeVisible();

    // Check for DDD East Midlands Accounts section
    const accountsHeading = page.getByRole('heading', {
      name: 'DDD East Midlands Accounts',
    });
    await expect(accountsHeading).toBeVisible();

    // Verify organizer sections exist
    const rachelSection = page.getByRole('heading', {
      name: 'Rachel Watson',
    });
    await expect(rachelSection).toBeVisible();
  });

  test('should load all pages without console errors', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const pages = [
      '/',
      '/about-the-conference',
      '/agenda',
      '/talks',
      '/contact',
    ];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
    }

    // Allow for expected Next.js warnings but no critical errors
    const criticalErrors = consoleErrors.filter(
      (error) => !error.includes('Warning:')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have working internal navigation links', async ({ page }) => {
    await page.goto('/about-the-conference');

    // Test anchor link navigation within page
    const principlesLink = page.locator('a[href="#principles"]');
    await expect(principlesLink).toBeVisible();

    await principlesLink.click();

    // Verify we're still on the same page but scrolled to section
    await expect(page).toHaveURL(/about-the-conference/);

    // Verify the principles section is visible
    const principlesSection = page.locator('#principles');
    await expect(principlesSection).toBeVisible();
  });
});
