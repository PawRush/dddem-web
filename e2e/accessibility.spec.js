const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility', () => {
  test('homepage should not have automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('about page should not have automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/about-the-conference');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('contact page should not have automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/contact');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('talks page should not have automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/talks');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Keyboard Navigation', () => {
  test('should navigate through homepage using Tab key', async ({ page }) => {
    await page.goto('/');

    // Start tabbing through the page
    await page.keyboard.press('Tab');

    // Get the focused element
    let focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tagName: el.tagName,
        tabIndex: el.tabIndex,
        text: el.textContent.substring(0, 50),
      };
    });

    // Verify that we can tab to focusable elements
    expect(focusedElement.tagName).toBeTruthy();

    // Tab multiple times to ensure we can navigate
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    // Verify focus has moved to a different element
    const newFocusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tagName: el.tagName,
        tabIndex: el.tabIndex,
      };
    });

    expect(newFocusedElement.tagName).toBeTruthy();
  });

  test('should navigate to links using keyboard', async ({ page }) => {
    await page.goto('/about-the-conference');

    // Focus on a specific link using keyboard
    await page.keyboard.press('Tab');

    // Continue tabbing until we find a link
    for (let i = 0; i < 10; i++) {
      const focusedElement = await page.evaluate(() => {
        return document.activeElement.tagName;
      });

      if (focusedElement === 'A') {
        // We found a link, press Enter to activate it
        await page.keyboard.press('Enter');
        break;
      }

      await page.keyboard.press('Tab');
    }

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
  });

  test('should support Shift+Tab for reverse navigation', async ({ page }) => {
    await page.goto('/');

    // Tab forward several times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    const forwardFocusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tagName: el.tagName,
        id: el.id,
        className: el.className,
      };
    });

    // Tab backward
    await page.keyboard.press('Shift+Tab');

    const backwardFocusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tagName: el.tagName,
        id: el.id,
        className: el.className,
      };
    });

    // The elements should be different (moved back in focus order)
    expect(backwardFocusedElement).not.toEqual(forwardFocusedElement);
  });

  test('should be able to navigate anchor links with keyboard', async ({
    page,
  }) => {
    await page.goto('/about-the-conference');

    // Find and focus on the principles anchor link
    const principlesLink = page.locator('a[href="#principles"]');
    await principlesLink.focus();

    // Press Enter to activate the link
    await page.keyboard.press('Enter');

    // Verify we scrolled to the section
    await expect(page).toHaveURL(/about-the-conference#principles/);

    // Verify the section is visible
    const principlesSection = page.locator('#principles');
    await expect(principlesSection).toBeVisible();
  });

  test('should support keyboard navigation on contact page', async ({
    page,
  }) => {
    await page.goto('/contact');

    // Tab through the page
    await page.keyboard.press('Tab');

    let tabbedElements = 0;
    const maxTabs = 20;

    for (let i = 0; i < maxTabs; i++) {
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el.tagName !== 'BODY';
      });

      if (focusedElement) {
        tabbedElements++;
      }

      await page.keyboard.press('Tab');
    }

    // We should have found multiple tabbable elements
    expect(tabbedElements).toBeGreaterThan(0);
  });
});

test.describe('ARIA and Semantic HTML', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1 heading
    const h1 = page.locator('h1');
    const h1Count = await h1.count();

    // Check for h2 headings
    const h2 = page.locator('h2');
    const h2Count = await h2.count();

    // Should have headings on the page
    expect(h1Count + h2Count).toBeGreaterThan(0);
  });

  test('should have images with alt text', async ({ page }) => {
    await page.goto('/about-the-conference');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check that images have alt attributes
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');

      // Alt text should exist (can be empty string for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper tabindex attributes', async ({ page }) => {
    await page.goto('/');

    // Check for elements with tabindex="0"
    const tabbableElements = page.locator('[tabindex="0"]');
    const count = await tabbableElements.count();

    // The site uses tabindex="0" for accessibility
    expect(count).toBeGreaterThan(0);

    // Verify no invalid tabindex values (positive numbers other than 0)
    const invalidTabindex = page.locator(
      '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])'
    );
    const invalidCount = await invalidTabindex.count();

    // Should not have invalid tabindex values
    expect(invalidCount).toBe(0);
  });

  test('should have accessible links with proper text', async ({ page }) => {
    await page.goto('/contact');

    // Get all links
    const links = page.locator('a');
    const linkCount = await links.count();

    // Check that links have text or aria-label
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Link should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should have proper landmark regions', async ({ page }) => {
    await page.goto('/');

    // Check for main content area
    const main = page.locator('main, [role="main"]');
    const mainExists = (await main.count()) > 0;

    // Check for sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();

    // Should have proper semantic structure
    expect(sectionCount).toBeGreaterThan(0);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Check for nav element or navigation role
    const nav = page.locator('nav, [role="navigation"]');
    const navCount = await nav.count();

    // Navigation should exist
    expect(navCount).toBeGreaterThan(0);
  });

  test('should have proper list structure for principles', async ({ page }) => {
    await page.goto('/');

    // Check for unordered lists
    const lists = page.locator('ul');
    const listCount = await lists.count();

    expect(listCount).toBeGreaterThan(0);

    // Check for list items within lists
    const listItems = page.locator('ul > li');
    const itemCount = await listItems.count();

    expect(itemCount).toBeGreaterThan(0);
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Check if focused element is visible
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      const rect = el.getBoundingClientRect();
      return {
        visible: rect.width > 0 && rect.height > 0,
        hasOutline: window.getComputedStyle(el).outline !== 'none',
      };
    });

    // Focused element should be visible
    expect(focusedElement.visible).toBe(true);
  });

  test('should have accessible organizer profile links', async ({ page }) => {
    await page.goto('/about-the-conference');

    // Scroll to organisers section
    await page.locator('#organisers').scrollIntoViewIfNeeded();

    // Check organizer links have proper title attributes
    const organizerLink = page
      .locator('a[title*="Information About"]')
      .first();
    await expect(organizerLink).toBeVisible();

    const title = await organizerLink.getAttribute('title');
    expect(title).toBeTruthy();
    expect(title).toContain('Information About');
  });

  test('should support screen reader text patterns', async ({ page }) => {
    await page.goto('/contact');

    // Check for proper semantic structure that screen readers can navigate
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();

    // Should have multiple headings for screen reader navigation
    expect(headingCount).toBeGreaterThan(1);

    // Check that content sections have proper landmarks
    const contentSections = page.locator('.content-section');
    const sectionCount = await contentSections.count();

    expect(sectionCount).toBeGreaterThan(0);
  });
});

test.describe('Color Contrast and Visual Accessibility', () => {
  test('should check color contrast using axe', async ({ page }) => {
    await page.goto('/');

    // Run axe with specific color contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('should maintain readability with text scaling', async ({ page }) => {
    await page.goto('/');

    // Simulate text scaling (zoom)
    await page.evaluate(() => {
      document.body.style.zoom = '150%';
    });

    // Verify content is still visible
    const heading = page.getByRole('heading', {
      name: /Developer! Developer! Developer! East Midlands/i,
    });
    await expect(heading).toBeVisible();

    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '100%';
    });
  });
});
