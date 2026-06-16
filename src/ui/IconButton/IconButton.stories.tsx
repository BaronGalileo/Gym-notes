import type { Meta } from '@storybook/react';
import { IconButton } from './IconButton';


const meta: Meta<typeof IconButton> = {
    title: 'IconButton',
    component: IconButton,
    tags: ['autodocs'],
}

export default meta;


export const ButtonIcon = {
    args: {
        icon:"×",
    }
}
