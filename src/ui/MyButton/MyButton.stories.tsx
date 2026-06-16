import type { Meta } from '@storybook/react';
import { MyButton } from './MyButton';

const meta: Meta<typeof MyButton> = {
    component: MyButton,
    title: 'MyButton',
    tags: ['autodocs'],

}

export default meta;

export const Button = {
    args: {
        children: 'Кнопка',
    }
}

export const Disebled = {
    args: {
        children: 'Неактивная',
        disabled: true,
    }
}