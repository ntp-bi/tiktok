import classNames from "classnames/bind";
import styles from './Button.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    children,
    onClick,
    className,
    leftIcon,
    rightIcon,
    primary = false,
    outline = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    rounded = false,
    ...passProps }) {

    let Comp = 'button'
    let props = {
        onClick,
        ...passProps // trường hợp có thêm props thì đẩy vào 
    };

    // Remove event listeners when clicked
    if(disabled) {
        Object.keys(props).forEach(key => {
            if(key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        })
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        primary, // khi primary được truyền thì nó sẽ add thêm class tên là primary vào className
        outline,
        text,
        disabled,
        small,
        large,
        rounded,
        [className]: className, // khi có className thì nó sẽ lấy giá trị của className nó làm key ở [className]
    })

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}

export default Button;