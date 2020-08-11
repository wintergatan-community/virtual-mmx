A WebPack loader should maybe be used to compress SVGs,
but the icons in this folder currently want text to be converted to paths
(for portability), so let's just `scour` them while we're at it.

```sh
inkscape -l --export-text-to-path file.svg --export-filename file.tmp.svg
scour file.tmp.svg file.min.svg --remove-descriptive-elements
rm file.tmp.svg
```
