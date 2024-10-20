import { TextRainbow } from '@common/components';
import PropTypes from 'prop-types';
import { Button, Hero } from 'react-daisyui';
import { Link } from 'react-router-dom';

function UserSection({ user }) {
  return (
    <Hero>
      <Hero.Content className="text-left">
        <div className="max-w-5xl">
          <h1 className="font-semibold text-8xl">Welcome,</h1>
          <h1 className="font-bold text-7xl">
            <TextRainbow text={user?.username || 'Private User'} className="font-display" />
          </h1>
          <p className="py-6">
            This route is for authenticated users only. You should modify the logic for this route to fit your
            application.
          </p>
          <Link to="/profile">
            <Button color="primary">View Profile</Button>
          </Link>
        </div>
      </Hero.Content>
    </Hero>
  );
}

UserSection.propTypes = {
  user: PropTypes.object,
};

export default UserSection;
