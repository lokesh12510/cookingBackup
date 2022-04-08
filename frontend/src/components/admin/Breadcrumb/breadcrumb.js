import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useSelector, useDispatch } from "react-redux";
import breadcrumbAction from '../../../utils/store/actions/breadcrumb';

const Breadcrumbs = () => {
  const dispatch = useDispatch(); 
  const breadcrumbs = useSelector(state => state.breadcrumbs);
  // dispatch(breadcrumbAction.pushBreadcrumb("ADD s",location.pathname));

  return (

    <div className="breadcrumbs">
      {breadcrumbs.map(({ text, link }, index) => (
        <div className="bc" key={index}>
          <Link onClick={() => dispatch(breadcrumbAction.popBreadcrumb())} to={link || ""}>{text}</Link>
          {index < breadcrumbs.length - 1 && ">"}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
