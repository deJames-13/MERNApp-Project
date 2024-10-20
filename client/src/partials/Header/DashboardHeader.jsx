import { TextRainbow, ThemeToggler } from '@common/components';
import PropTypes from 'prop-types';
import { Button, Dropdown, Navbar } from 'react-daisyui';
import { FaArrowAltCircleRight, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MenuList = () => {
  return (
    <>
      <Link
        to="/dashboard"
        className="btn btn-ghost"
      >
        Inventory
      </Link>
      <Link
        to="/dashboard"
        className="btn btn-ghost"
      >
        Orders
      </Link>
      <Link
        to="/dashboard"
        className="btn btn-ghost"
      >
        Profile
      </Link>
    </>
  );
};
function DashboardHeader({ toggleVisible, visible }) {
  return (
    <>
      <Navbar className={`w-screen bg-base-200 ${!visible ? 'hidden' : ''}`}>
        <Navbar.Start>
          <Button
            color="ghost"
            onClick={toggleVisible()}
          >
            <FaArrowAltCircleRight />
            <TextRainbow
              text="Dashboard"
              className="text-xl font-extrabold font-display"
            />
          </Button>

          <ThemeToggler />
        </Navbar.Start>
        <Navbar.End>
          <div className="hidden lg:flex">
            <MenuList />
          </div>

          <Dropdown
            className="md:hidden"
            horizontal="left"
            vertical="bottom"
          >
            <Dropdown.Toggle>
              <FaBars />
            </Dropdown.Toggle>
            <Dropdown.Menu className="border border-gray-400 rounded border-opacity-30 bg-base-200 w-52">
              <MenuList />
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.End>
      </Navbar>
    </>
  );
}

DashboardHeader.propTypes = {
  toggleVisible: PropTypes.func,
  visible: PropTypes.bool,
};

export default DashboardHeader;
