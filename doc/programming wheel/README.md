# Layout

The code for the programming wheel is in `src/components/programmingWheel`
Here is how the SVG is structured.

Most of the positioning is done via `transform: translate(x,y)` on the wrapping `g` element.

- `svg`
  - `g` - Everything
    - `g` - wrapper for the cols and pins
      - `g[]` - One group per column
        - `rect` - First element: Background color
        - `g > rect` - Pins of the column
    - `g` - Wrapper for the dividing lines
      - `g[] > line` - Dividing lines (Horizontal)
    - `g` - Current hovered square
    - `g` - Green line, current position when playing the song
    - `g` - Red line, not sure what it does yet

## Hovered area
Instead of changing the background color of the highlighted area,
there is a single rectangle moving towards the area below the cursor.

The code for this area is under `src/components/programmingWheel/PegPlacer.tsx`

I assume it was done this way as there is only one `rect` for the column background, therefore it can't be changed in a granular way.

I would prefer eventually switching it up to a regular grid, where there are `rows[] > cols[] > cell`, I feel like it might be better for the maintenance and futur development of the programming wheel.