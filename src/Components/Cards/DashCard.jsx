import {PropTypes} from 'prop-types'



const DashCard = ({title, content}) => {
  return (
    <div className=" p-5 text-center space-y-5 rounded-md  shadow-md bg-zinc-100">
    <h4 className=" text-primary font-medium text-lg">{title}</h4>
      <h1 className=" text-slate-900 font-bold text-5xl">{content}</h1>
    </div>
  )
}

DashCard.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
}


export default DashCard
