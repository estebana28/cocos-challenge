import { Link } from 'react-router-dom';

type LinkButtonProps = {
  text: string
  url: string
}

export function LinkButton({ text, url }: LinkButtonProps) {
  return (
    <Link className="link-button" to={url}>{text}</Link>
  )
}

