import React from 'react'
import classNames from 'classnames'
import { Button as _Button, View } from '@tarojs/components'
import { ButtonProps as _ButtonProps } from '@tarojs/components/types/Button'
import { AtButtonProps } from 'taro-ui/types/button'

import { Loading } from './Loading'
import { Icon, IconProps } from './Icon'
import '../style/Button.scss'

export interface ButtonProps extends Omit<_ButtonProps, 'size' | 'type'>, Pick<AtButtonProps, 'circle' | 'full'> {
    className?: string
    style?: React.CSSProperties
    type?: _ButtonProps['type'] | AtButtonProps['type'] | 'error'
    size?: _ButtonProps['size'] | AtButtonProps['size']
    /** 透明按钮 */
    transparent?: boolean
    iconInfo?: IconProps
    fab?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { className, style, type, size, circle, full, transparent, fab, children, ...rest } = props
    const hoverProps = Object.keys(props).reduce(
        (res, key) => (key.startsWith('hover') && props[key] ? { ...res, [key]: props[key] } : res),
        {}
    )

    if (transparent) {
        return (
            <View className={classNames('at-button__transparent', className)} {...hoverProps}>
                {children}
                <_Button {...rest} />
            </View>
        )
    }

    if (fab) {
        return (
            <View
                className={classNames(
                    'at-fab',
                    {
                        [`at-fab--${size}`]: size,
                    },
                    className
                )}
                {...rest}
            >
                {children}
            </View>
        )
    }

    if (size === 'mini') {
        return (
            <View className={classNames('at-button__transparent', className)}>
                <View
                    className={classNames('at-button__mini', {
                        [`at-button__mini_${type}`]: type,
                        'at-button_disabled': props.disabled,
                    })}
                    {...hoverProps}
                    onClick={props.onClick}
                >
                    <View className={classNames({ 'at-button__mini__icon': props.loading || props.iconInfo })}>
                        {props.loading ? <Loading /> : !!props.iconInfo ? <Icon {...props.iconInfo} /> : null}
                    </View>
                    {children}
                </View>
                <_Button {...rest} />
            </View>
        )
    }

    return (
        <View
            className={classNames(
                'at-button',
                {
                    [`at-button--${size}`]: size,
                    'at-button--disabled': props.disabled,
                    [`at-button--${type}`]: type,
                    [`at-button_${type}`]: type,
                    'at-button--circle': circle,
                    'at-button--full': full,
                    'at-button--icon': props.loading,
                },
                className
            )}
            style={style}
        >
            {!props.disabled && <_Button className="at-button__wxbutton" {...rest} />}
            {!!props.loading && (
                <View className="at-button__icon">
                    <Loading color={type === 'primary' ? '#fff' : ''} size={size === 'small' ? '30' : 0} />
                </View>
            )}
            <View className="at-button__text">{children}</View>
        </View>
    )
}
