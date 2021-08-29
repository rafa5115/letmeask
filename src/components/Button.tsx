import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    // nao precisa passar 
    isOutlined?: boolean
}
export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button className={
            `button ${isOutlined ? 'outlined' : ''}`
        }
            {...props} />

    );
}

