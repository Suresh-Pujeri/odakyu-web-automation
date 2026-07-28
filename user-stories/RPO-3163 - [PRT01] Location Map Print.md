Description

Overview
Add a "Print map" button to the Location View of the Service Locations portal screen, allowing users to generate an A4-formatted PDF of the map. The printed output adapts based on whether or not a location is selected, displaying either a map-only view or a map with selected location details.
Problem Statement
Users of the Service Locations portal currently have no way to print or export a map view of their filtered locations. This limits their ability to share spatial location data in a portable, standardized format for field operations or reporting.
Goals & Success Metrics
100% of print outputs are correctly formatted in A4 and saved as PDF without layout errors.
The print preview accurately reflects the active filter state — no unfiltered locations appear in printed output.
When a location is selected, the printed PDF includes the correct location details (name, address, notes) in 100% of cases.
User Stories
As a planner, I want to print the map with only my filtered locations displayed, so that I can share a clean, relevant map with my team.
As a planner, I want the printed map to preserve my current zoom level, so that the printout reflects exactly what I was viewing on screen.
As a planner, I want to print a map with a selected location centered and highlighted, so that I can quickly communicate a specific site's details to field staff.
As a planner, I want the printed output to include a selected location's name, address, and notes, so that the printout is a self-contained reference document.
As a planner, I want to save the print output as a PDF, so that I can store and share it digitally.
Functional Requirements
Print Map Button
A "Print map" button is added to the Location View of the Service Locations portal screen, below the "Add Service Location" button (See attached screenshot/mockup).
The button is visible when a location is selected and when no location is selected.
Print Preview Screen
Opened when the user clicks "Print map."
Displays the map in A4 format.
Portrait layout - see screenshots for how to show the map in portrait view based on the 2 options (1 w/o location selected and 1 w/ location selected)
Preserves the zoom level active at the time the button was clicked.
Preserves the user's ZENRIN map selection.
Two options from the print Preview Screen
A "Print" button in the preview saves the output as a PDF.
A “Close” button closes the preview and returns the user to the locations screen.
Map Content — No Location Selected
The map displays all locations matching the currently active filters.
Each location is shown with its location name displayed next to its icon (based on zoom)
location name should only be displayed based on zoom level.  If the location name is displayed based on zoom it is included in the map print view.
Can we display the Map Scale?  Does Mapbox have a parameter for this?
Map Content — One Location Selected
Each location is shown with its location name displayed next to its icon (based on zoom)
location name should only be displayed based on zoom level.  If the location name is displayed based on zoom it is included in the map print view.
The selected location is rendered with a distinct icon (differentiated from other locations).
Show it as a red icon (see screenshot - “Map with Location Selected”)
The selected location is centered on the map by default.
A location information panel is displayed alongside the map containing: 
location name
Location address
Note
Screenshot 2026-04-14 at 9.09.01 AM.png
Can we display the Map Scale?  Does Mapbox have a parameter for this?
Out of Scope
Printing with multiple locations simultaneously selected.
Printing from any screen other than the Location View of Service Locations.
Custom paper sizes or orientations (letter, landscape, etc.).
Batch/bulk PDF export.
Printing from the Customer View tab.
Acceptance Criteria


Print Map Button

A "Print map" button is added to the Location View of the Service Locations portal screen, below the "Add Service Location" button.

The button is visible both when a location is selected and when no location is selected.
Print Preview Screen

Opens when the user clicks "Print map".

Displays the map in A4 portrait format.

Preserves the zoom level active at the time the button was clicked.

Preserves the user's ZENRIN map selection.

"Print" button saves the output as a PDF.

"Close" button closes the preview and returns the user to the Locations screen.
Map Content — No Location Selected

Displays all locations matching the currently active filters.

Each location renders with its name displayed next to its icon, gated by zoom level (matches the live map's MAP_LOCATION_NAME_ZOOM_LEVEL).

Metric scale bar rendered bottom-left (resolves the "Can we display the Map Scale?" open question).
Map Content — One Location Selected

Each location renders with its name next to its icon (zoom-gated, same as above).

The selected location is rendered with a distinct red icon, differentiated from the orange markers.

The selected location is centered on the map by default.

An information panel is displayed alongside the map showing the location name, address, and note.

Metric scale bar rendered bottom-left.