# Slider

```html
<v-slider v-model="value" :min="0" :max="0" />
```

## Props
| Prop               | Description                                                  | Default                     |
|--------------------|--------------------------------------------------------------|-----------------------------|
| `track-color`      | Color of the slider track                                    | `--slider-track-color`      |
| `track-fill-color` | Color of the filled part of the slider track (left of thumb) | `--slider-track-fill-color` |
| `thumb-color`      | Color of the thumb and label                                 | `--slider-thumb-color`      |
| `show-thumb-label` | Show the thumb label on drag of the thumb                    | `false`                     |
| `max`              | Maximum allowed value                                        | `100`                       |
| `min`              | Minimum allowed value                                        | `0`                         |
| `step`             | In what step the value can be entered                        | `1`                         |
| `ticks`            | Show tick for each step                                      | `false`                     |
| `value`            | Current value of slider. Can be used with `v-model`          | `50`                        |

## Events
| Event           | Description                                 | Value    |
|-----------------|---------------------------------------------|----------|
| `input`         | Fires continuously                          | `number` |
| `change`        | Fires only when the user releases the thumb | `number` |
| `click:prepend` | When the user clicks the prepend slot       | --       |
| `click:append`  | When the user clicks the append slot        | --       |

## Slots
| Slot          | Description                        | Props               |
|---------------|------------------------------------|---------------------|
| `prepend`     | Inserted before the slider track   | --                  |
| `append`      | Inserted after the slider track    | --                  |
| `thumb-label` | Custom content for the thumb label | `{ value: number }` |
