import { TextRainbow, ThemeToggler } from '@common/components';
import { AuthLogout } from '@features';
import { PropTypes } from 'prop-types';
import { Dropdown, Navbar } from 'react-daisyui';
import { FaBars, FaCartArrowDown, FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const defaultMenus = [
  { name: 'Search', link: '/', icon: <FaSearch />, },
  { name: 'Cart', link: '/cart', icon: <FaCartArrowDown /> },
  { name: 'Profile', link: '/profile', icon: <FaUser /> }
]

const MenuList = ({ menus = defaultMenus, iconOnly = false }) => {
  return (
    <>
      {menus.map((menu, index) => (
        <Link
          key={index}
          to={menu.link}
          className="btn btn-ghost rounded-btn group p-0 lg:p-3 hover:text-primary"
        >
          <span className="text-lg group-hover:text-primary">
            {menu.icon}
          </span>
          <span className="text-sm">
            {iconOnly ? '' : menu.name}
          </span>
        </Link>
      ))}
    </>
  );
};
function Header({ clickLogo }) {
  return (
    <>
      <Navbar className="sticky z-[69] top-0 w-full bg-base-200">
        <Navbar.Start>
          <Dropdown className="lg:hidden">
            <Dropdown.Toggle>
              <FaBars />
            </Dropdown.Toggle>
            <Dropdown.Menu className="items-center border border-gray-400 rounded border-opacity-30 bg-base-200 w-52">
              <MenuList />
              <AuthLogout className="btn btn-ghost rounded-btn group p-0 lg:p-3 hover:text-primary" />
            </Dropdown.Menu>
          </Dropdown>
          <TextRainbow
            text="ShoeShable"
            className="text-xl font-extrabold font-display btn btn-ghost "
            onClick={clickLogo}
          />
          <span className='hidden lg:flex'>
            <ThemeToggler />
          </span>
        </Navbar.Start>
        <Navbar.End className='w-full'>
          <div className="hidden lg:flex">
            <MenuList />
            <AuthLogout />
          </div>
          <div className="lg:hidden">
            <MenuList iconOnly={true} />
          </div>
        </Navbar.End>
      </Navbar>
    </>
  );
}

Header.propTypes = {
  clickLogo: PropTypes.func,
};

export default Header;
export { default as DashboardHeader } from './DashboardHeader';

