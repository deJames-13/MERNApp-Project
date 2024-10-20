import { cn } from '@common/lib/utils';
import { useNavigate } from 'react-router-dom';
function BackButton({ className, ...props }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={cn("btn btn-primary", className)}
      {...props}
    >
      Back
    </button>
  );
}
export default BackButton;
