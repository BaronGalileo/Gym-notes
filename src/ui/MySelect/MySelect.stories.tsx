import type { Meta } from '@storybook/react';
import { MySelect } from './MySelect';


const meta: Meta<typeof MySelect> = {
    component: MySelect,
    title: 'MySelect',
    tags: ['autodocs'],

}

export default meta;

export const Select = {
    args: {
        children: [<option value="1">Значение 1</option>, <option value="2">Значение 2</option>],
    }
}

export const Label = {
    args: {
        children: [<option value="1">Значение 1</option>, <option value="2">Значение 2</option>],
        label: 'Название выбора',
    }
}