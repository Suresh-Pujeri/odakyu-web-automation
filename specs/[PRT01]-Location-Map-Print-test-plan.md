 # [PRT01] Location Map Print - Test Plan

## Overview
This test plan covers the Location Map Print feature described in user story RPO-3163. It includes happy paths, negative scenarios, edge cases, and verification steps for PDF output.


---

## Test Scenarios

### 1. Print map - No location selected (Happy path)
- Preconditions: User is logged in and click on the Customers link 
- Steps:
1. Click on Location view button/text
  2. Click `Print map` button.
  3. Verify print preview opens in A4 portrait format.
  4. Verify map displays only locations matching active filters.
  5. Click `Print` and save as PDF.
- Expected Results:
  - Preview shows A4 portrait view.
  - PDF saved correctly and contains only filtered locations seen in preview.

### 2. Print map - One location selected (Happy path)
- Preconditions: A single location is selected on the map.
- Steps:
  1. Select a location from the list or map.
  2. Click `Print map`.
  3. Verify selected location is centered and highlighted in preview.
  4. Verify location details panel (name, address, notes) appears alongside map in preview.
  5. Click `Print` and save as PDF.
- Expected Results:
  - Preview centers the selected location; red icon used for selected location.
  - PDF contains the selected location details and map as shown in preview.

### 3. Preserve zoom level and map provider selection
- Steps:
  1. Set a specific zoom level and (if applicable) switch the ZENRIN map option.
  2. Click `Print map`.
  3. Verify preview preserves zoom level and correct map provider layer.
- Expected Results:
  - Preview map matches zoom level and provider selection.

### 4. Negative: Missing permissions / unauthenticated user
- Steps:
  1. Log out or use an unauthenticated session.
  2. Attempt to access the Location View or click `Print map`.
- Expected Results:
  - Access is denied or redirected to login. `Print map` is not available.

### 5. Edge case: Large number of filtered locations
- Steps:
  1. Apply filters that result in many locations.
  2. Click `Print map` and save PDF.
- Expected Results:
  - PDF renders without layout errors and includes all filtered locations visible in preview.

---

## Test Data
- Credentials: `suresh.pujeri@routeware.com` / `Pusavi@345`
- Vendor to select: `Odakyu Premier SmartCity`
- Example filters to apply: status, region, service type (document in test case where used)

---

## Artifacts
- Save this file as `specs/[PRT01]-Location-Map-Print-test-plan.md` (this file)
- Save exploration screenshots under `test-results/manual-exploration/PRT01/`

---

## Notes
- If map rendering is powered by Mapbox/Zenrin, validate whether a map scale is available for printing and whether vendor API keys or tiles affect PDF output.
