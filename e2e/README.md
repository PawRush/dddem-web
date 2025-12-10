# End-to-End Tests for DDD East Midlands Website

This directory contains Playwright end-to-end tests for the DDD East Midlands conference website.

## Test Coverage

### 1. Homepage Tests (`homepage.spec.js`)
- Verifies homepage loads successfully
- Checks all main content sections are displayed
- Validates header banner presence
- Tests accessibility attributes (tabindex)

### 2. Navigation Tests (`navigation.spec.js`)
- Tests navigation to all main pages (About, Agenda, Talks, Contact)
- Verifies page titles and content
- Checks for console errors across pages
- Tests internal anchor link navigation

### 3. Sponsor Tests (`sponsor.spec.js`)
- Tests sponsor pages (tiers, why sponsor, testimonials, etc.)
- Validates sponsor tier sections and navigation
- Checks organizer photo grid on About page
- Tests image grid interactions and hover states
- Verifies accessibility of sponsor-related links

### 4. Responsive Design Tests (`responsive.spec.js`)
- Tests across multiple viewport sizes (desktop, tablet, mobile)
- Verifies layout adapts correctly
- Tests with specific device emulations (iPhone 12, iPad Pro)
- Checks for horizontal overflow issues
- Tests orientation changes (portrait/landscape)
- Validates responsive images load correctly

### 5. Accessibility Tests (`accessibility.spec.js`)
- Automated accessibility scanning with axe-core
- Keyboard navigation testing (Tab, Shift+Tab, Enter)
- ARIA attributes validation
- Semantic HTML structure verification
- Heading hierarchy checks
- Image alt text validation
- Focus indicator testing
- Color contrast validation
- Screen reader compatibility checks

## Prerequisites

- Node.js installed
- Dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install`)

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests with UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug tests
```bash
npm run test:e2e:debug
```

### View test report
```bash
npm run test:e2e:report
```

### Run specific test file
```bash
npx playwright test e2e/homepage.spec.js
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=mobile
```

## Test Configuration

The tests are configured in `playwright.config.js` with:
- Base URL: `http://localhost:3000`
- Automatic dev server startup
- Screenshots on failure
- HTML and JSON reports
- Support for both desktop and mobile viewports

## Project Structure

```
e2e/
├── homepage.spec.js          # Homepage functionality tests
├── navigation.spec.js        # Page navigation and routing tests
├── sponsor.spec.js          # Sponsor pages and grid interactions
├── responsive.spec.js       # Responsive design and viewport tests
├── accessibility.spec.js    # Accessibility and keyboard navigation
└── README.md               # This file
```

## Test Results

Test results are saved to:
- HTML Report: `playwright-report/index.html`
- JSON Results: `test-results/results.json`
- Screenshots: `test-results/screenshots/`

## Accessibility Features Tested

The tests verify the website's strong accessibility focus:
- Keyboard navigation throughout the site
- Proper tabindex usage for focusable elements
- ARIA landmarks and roles
- Semantic HTML structure
- Image alt text
- Focus indicators
- Color contrast (WCAG 2.1 AA compliance)
- Screen reader compatibility

## Notes

- The dev server is automatically started by Playwright before running tests
- Tests run in parallel by default for faster execution
- Screenshots are taken automatically on test failures
- Tests include both Chromium (desktop) and mobile viewport projects
- The website has been designed with accessibility in mind, and these tests validate those implementations
