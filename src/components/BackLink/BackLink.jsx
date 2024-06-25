import { TbArrowBackUp } from "react-icons/tb";
import { Link } from 'react-router-dom'
import css from './Back.link.module.css'

const BackLink = ({ to }) => {
    return (
        <div className={css.wrapper}>
      <Link to={to}>
        <div className={css.backLink}>
          <TbArrowBackUp size={32} color="white" />
        </div>
      </Link>
      <span>Back</span>
    </div>
    )
}

export default BackLink;