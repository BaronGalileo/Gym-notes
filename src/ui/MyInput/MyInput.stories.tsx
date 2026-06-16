import type { Meta } from '@storybook/react';
import { MyInput } from './MyInput';


const meta: Meta<typeof MyInput> = {
    component: MyInput,
    title: 'MyInput',
    tags: ['autodocs'],

}

export default meta;

export const Input = {
    args: {
        label: 'Введите текст',
    }
}

export const Placeholder = {
    args: {
        placeholder: "Напишите текст",
    }

}
