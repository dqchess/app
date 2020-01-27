# Table

```html
<v-table
	:headers="[
		{
			text: 'Name',
			value: 'name'
		},
		{
			text: 'Phone Number',
			value: 'tel'
		},
		{
			text: 'Contact',
			value: 'person'
		}
	]"

	:items="[
		{
			name: 'Amsterdam',
			tel: '020-1122334',
			person: 'Mariann Rumble'
		},
		{
			name: 'New Haven',
			tel: '(203) 687-9900',
			person: 'Helenka Killely'
		}
	]"
/>
```

## Headers

| Property   | Description                                                  | Default |
|------------|--------------------------------------------------------------|---------|
| `text`*    | Text displayed in the column                                 | --      |
| `value`*   | Name of the object property that holds the value of the item | --      |
| `align`    | Text alignment of value. One of `left`, `center`, `right`    | `left`  |
| `sortable` | If the column can be sorted on                               | `true`  |

## Custom element / component for header

You can override the displayed header name by using the dynamic `header.[name]` slot. `[name]` is the `value` property in the header item for this column sent to `headers`.

```html
<v-table
	:headers="headers"
	:items="items"
>
	<template #header.name="{ header }">
		<v-button>{{ header.text }}</v-button>
	</template>
</v-table>
```

In this slot, you have access to the `header` through the scoped slot binding.

## Custom element / component for cell value

You can override the columns in a row by using the dynamic `item.[name]` slot. `[name]` is the `value` property in the header item for this column sent to `headers`.

```html
<v-table
	:headers="headers"
	:items="items"
>
	<template #item.name="{ item }">
		<v-button>{{ item.name }}</v-button>
	</template>
</v-table>
```

In this slot, you have access to the `item` through the scoped slot binding.

## Props

| Prop           | Description                                                         | Default |
|----------------|---------------------------------------------------------------------|---------|
| `headers`*     | What columns to show in the table                                   | --      |
| `items`*       | The individual items to render as rows                              | --      |
| `item-key`     | Primary key of the item. Used for keys / selections                 | `id`    |
| `sort-by`      | What column to sort by. Supports the `.sync` modifier               | --      |
| `sort-desc`    | Sort descending instead of ascending. Supports the `.sync` modifier | `false` |
| `show-select`  | Show checkboxes                                                     | `false` |
| `selection`    | What items are selected. Can be used with `v-model` as well         | `[]`    |
| `fixed-header` | Make the header fixed                                               | `false` |
| `height`       | A fixed height (in px) for the table                                | --      |

## Events

| Event              | Description                                    | Value                           |
|--------------------|------------------------------------------------|---------------------------------|
| `update:sort-by`   | `.sync` event for `sort-by` prop               | `string`                        |
| `update:sort-desc` | `.sync` event for `sort-desc` prop             | `boolean`                       |
| `item-selected`    | Emitted when an item is selected or deselected | `{ item: any, value: boolean }` |
| `select`           | Emitted when selected items change             | `any[]`                         |

## Slots

| Slot           | Description                   |
|----------------|-------------------------------|
| `item.[value]` | Override individual row cells |
