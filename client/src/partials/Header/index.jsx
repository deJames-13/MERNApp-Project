import { TextRainbow, ThemeToggler } from '@common/components';
import { useLogout } from '@custom';
import { PropTypes } from 'prop-types';
import { Badge, Button, Card, Dropdown, Indicator, Navbar } from 'react-daisyui';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header({ clickLogo }) {
  const handleLogout = useLogout();
  const { userInfo, accessToken } = useSelector(state => state.auth)
  const { items, subTotal, currency } = useSelector(state => state.cart)

  return (
    <>
      <Navbar className='bg-base-100/10 backdrop-blur-xl z-[1000]'>
        <Navbar.Start>
          <Link>
            <Button
              color="ghost"
            >
              <TextRainbow
                text="Shoeshable"
                className="text-xl font-extrabold font-display"
              />
            </Button>
          </Link>
          <ThemeToggler />
        </Navbar.Start>

        <Navbar.End>
          <Dropdown end>
            <Button tag="label" tabIndex={0} color="ghost" shape="circle">
              <Indicator>
                <Badge size="sm" className={Indicator.Item.className()}>
                  {items?.length || 0}
                </Badge>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Indicator>
            </Button>
            <Dropdown.Menu className="mt-3 z-[1] card card-compact w-52 !p-0">
              <Card.Body>
                <span className="font-bold text-lg">{items?.length || 0} Items</span>
                <span className="text-info">Subtotal: {currency} {subTotal}</span>
                <Card.Actions>
                  <Link to="/cart" className='w-full'>
                    <Button color="primary" fullWidth>
                      View cart
                    </Button>
                  </Link>
                </Card.Actions>
              </Card.Body>
            </Dropdown.Menu>
          </Dropdown>

          {
            userInfo?.id && accessToken &&
            <Dropdown end>
              <Button tag="label" tabIndex={0} color="ghost" className="avatar" shape="circle">
                <div className="w-10 rounded-full">
                  <img src={userInfo?.info?.avatar?.url || "https://placehold.co/400?text=no image"} />
                </div>
              </Button>
              <Dropdown.Menu className="mt-3 z-[1] w-52 menu-sm">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="justify-between">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="justify-between">
                    Orders
                  </Link>
                </li>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }

          {!(userInfo?.id && accessToken) &&
            <Link to="/login">
              <Button
                color='primary'
                variant='outline'
              >
                Log in
              </Button>
            </Link>
          }


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

