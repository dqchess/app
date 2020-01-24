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

| Property | Description                                                  | Default |
|----------|--------------------------------------------------------------|---------|
| `text`*  | Text displayed in the column                                 | --      |
| `value`* | Name of the object property that holds the value of the item | --      |
| `align`  | Text alignment of value. One of `left`, `center`, `right`    | `left`  |

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

## Events

## Slots

| Slot | Description |
|-----|-------------|
| `item.[value]` | Override individual row cells |
