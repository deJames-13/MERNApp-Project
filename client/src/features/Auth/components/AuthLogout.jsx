import { cn } from '@common/lib/utils';
import { useGetAuth, useLogout } from '@custom';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

export default function AuthLogout({ iconOnly = false, className, ...props }) {
  const handleLogout = useLogout();
  const { userInfo } = useGetAuth();
  return (
    userInfo && (
      <div>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className={cn("btn btn-outline btn-primary rounded-btn ", className)}
            {...props}
          >
            <FaArrowRightFromBracket />
            {iconOnly ? '' : 'Logout'}
          </button>
        </form>
      </div>
    )
  );
}
