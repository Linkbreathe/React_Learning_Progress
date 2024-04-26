import Button from "./Button";
import { useNavigate} from "react-router-dom";
function ButtonBack() {
    const navigate = useNavigate();
    return <div>
      <Button type="back" onClick={(e) => 
          {e.preventDefault();
            navigate(-1)}} >&larr; Back</Button>
      </div>
}
export default ButtonBack;