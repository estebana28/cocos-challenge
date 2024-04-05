import { LinkButton } from '../../ui/buttons/LinkButton';

const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Portfolio',
    path: '/portfolio'
  },
  {
    name: 'Buscador',
    path: '/search'
  }
];



export default function Header() {
  return (
    <header className='header-container'> 
      <div className='logo-title'>
        <img src="https://assets.cocos.capital/cocos/logos/Cocos.png" alt="Cocos Logo" />
      </div>
      <ul>
        {navLinks.map((link) => (
          <li key={link.path}>
            <LinkButton text={link.name} url={link.path} />
          </li>
        ))}
      </ul>
    </header>
  )
}
