import { TextRainbow } from '@common/components';
import { AuthLogout } from '@features';
import PropTypes from 'prop-types';
import { Button } from 'react-daisyui';
import { BsPinAngleFill } from 'react-icons/bs';
import { FaArrowAltCircleLeft, FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

const SideContent = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pin, togglePin, toggleVisible, ...overlayProps } = props;
  const { noOverlay, noOverlayEvent } = overlayProps;
  return (
    <>
      {!pin && (
        <div
          onClick={toggleVisible()}
          className={`fixed top-0 w-screen h-full max-h-screen overflow-auto ${noOverlay ? '' : 'bg-black bg-opacity-50'
            } ${noOverlayEvent ? 'pointer-events-none' : ''} `}
        ></div>
      )}
      <div className="relative flex flex-col w-full h-full overflow-visible">
        <div className="flex items-center w-full gap-2 p-2 py-7 border-b border-gray-500 border-opacity-50 bg-base-200">
          <div className="flex items-center flex-grow gap-2">
            <Button
              color="ghost"
              onClick={toggleVisible()}
            >
              <FaArrowAltCircleLeft />
              <TextRainbow
                text={userInfo?.username || 'Dashboard'}
                className="text-xl font-extrabold font-display"
              />
            </Button>
          </div>
          <button
            className={`hidden 2xl:flex btn btn-primary ${pin ? 'ml-auto' : 'btn-outline'}`}
            onClick={togglePin()}
          >
            <BsPinAngleFill />
          </button>
          <Link to="/home">
            <button className="transition-all btn btn-primary btn-outline">
              <FaHome />
            </button>
          </Link>
        </div>

        <div className="flex flex-col flex-grow bg-base-200">
          <div className="flex-grow overflow-y-auto scrollbar-none">
            <SidebarMenu />
          </div>
          <div className="mt-auto">
            <div className="divider"></div>
            <div className="p-4">
              <AuthLogout
                color="error"
                variant="outline"
                className="w-full justify-center items-center"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SideContent.propTypes = {
  pin: PropTypes.bool,
  togglePin: PropTypes.func,
  toggleVisible: PropTypes.func,
  noOverlayEvent: PropTypes.bool,
  noOverlay: PropTypes.bool,
};

export default SideContent;
