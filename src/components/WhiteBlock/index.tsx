import clsx from "clsx"
import styles from "./WhiteBlock.module.scss"

interface WhiteBlockProps {
  children: JSX.Element
  className: string
}

export const WhiteBlock = ({ children, className }: WhiteBlockProps) => {
  return <div className={clsx(styles.block, className)}>{children}</div>
}
