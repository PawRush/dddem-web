const { test, expect, devices } = require('@playwright/test');

test.describe('Responsive Design', () => {
  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Verify content is visible
    const heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Take screenshot for visual reference
    await page.screenshot({
      path: 'test-results/screenshots/desktop-homepage.png',
    });
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify content adapts to tablet
    const heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Verify content is still readable
    const mainText = page.locator('text=DDD East Midlands was an inclusive');
    await expect(mainText).toBeVisible();

    // Take screenshot for visual reference
    await page.screenshot({
      path: 'test-results/screenshots/tablet-homepage.png',
    });
  });

  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify content is visible on mobile
    const heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Verify sections are stacked properly
    const principlesHeading = page.getByRole('heading', {
      name: 'Principles',
    });
    await expect(principlesHeading).toBeVisible();

    // Take screenshot for visual reference
    await page.screenshot({
      path: 'test-results/screenshots/mobile-homepage.png',
    });
  });

  test('should have responsive organizer grid on about page', async ({
    page,
  }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/about-the-conference');

    await page.locator('#organisers').scrollIntoViewIfNeeded();
    const gridDesktop = page.locator('.volunteer-grid');
    await expect(gridDesktop).toBeVisible();

    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    await page.locator('#organisers').scrollIntoViewIfNeeded();
    const gridMobile = page.locator('.volunteer-grid');
    await expect(gridMobile).toBeVisible();

    // Grid items should still be visible but potentially stacked
    const gridItems = page.locator('.volunteer-grid-item');
    await expect(gridItems.first()).toBeVisible();
  });

  test('should handle contact page images responsively', async ({ page }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/contact');

    const desktopImages = page.locator('img.profile');
    await expect(desktopImages.first()).toBeVisible();

    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    const mobileImages = page.locator('img.profile');
    await expect(mobileImages.first()).toBeVisible();
  });

  test('should maintain readability at different viewport sizes', async ({
    page,
  }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 1024, height: 768, name: 'tablet-landscape' },
      { width: 768, height: 1024, name: 'tablet-portrait' },
      { width: 414, height: 896, name: 'mobile-large' },
      { width: 375, height: 667, name: 'mobile-medium' },
      { width: 320, height: 568, name: 'mobile-small' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');

      // Check that key content is visible
      const mainText = page.locator('text=DDD East Midlands was an inclusive');
      await expect(mainText).toBeVisible();

      // Verify no horizontal overflow
      const bodyScrollWidth = await page.evaluate(
        () => document.body.scrollWidth
      );
      const bodyClientWidth = await page.evaluate(
        () => document.body.clientWidth
      );

      // Allow small difference for scrollbars
      expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 20);
    }
  });

  test('should handle navigation on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Navigate to different pages
    await page.goto('/about-the-conference');
    const aboutHeading = page.getByRole('heading', {
      name: /What Was DDD East Midlands/i,
    });
    await expect(aboutHeading).toBeVisible();

    await page.goto('/contact');
    const contactHeading = page.getByRole('heading', { name: 'Contents' });
    await expect(contactHeading).toBeVisible();
  });

  test('should test with iPhone 12 device settings', async ({
    browser,
  }) => {
    const iPhone12 = devices['iPhone 12'];
    const context = await browser.newContext({
      ...iPhone12,
    });
    const page = await context.newPage();

    await page.goto('/');

    // Verify content loads properly
    const heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/iphone12-homepage.png',
    });

    await context.close();
  });

  test('should test with iPad device settings', async ({ browser }) => {
    const iPad = devices['iPad Pro'];
    const context = await browser.newContext({
      ...iPad,
    });
    const page = await context.newPage();

    await page.goto('/about-the-conference');

    // Verify organizer grid displays well on iPad
    await page.locator('#organisers').scrollIntoViewIfNeeded();
    const grid = page.locator('.volunteer-grid');
    await expect(grid).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/ipad-about.png',
    });

    await context.close();
  });

  test('should handle orientation changes', async ({ page }) => {
    // Portrait mode
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    let heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Landscape mode (swap dimensions)
    await page.setViewportSize({ width: 667, height: 375 });

    heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should have responsive images that load correctly', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/about-the-conference');

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    // Check that images are present
    const images = page.locator('img');
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThan(0);

    // Check that at least some images have loaded
    const firstImage = images.first();
    await expect(firstImage).toBeVisible();

    // Verify images have proper attributes
    const firstImageAlt = await firstImage.getAttribute('alt');
    expect(firstImageAlt).toBeTruthy();
  });
});
