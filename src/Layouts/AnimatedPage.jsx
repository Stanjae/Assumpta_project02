import {motion} from 'framer-motion'

const pageVariants = {
    initial: { opacity: 0, x:0 },
    animate: { opacity: 1, x:0 },
    exit: { opacity: 0, x:0},
}

// eslint-disable-next-line react/prop-types
const AnimatedPage = ({children}) => {
  return (
    <motion.div initial="initial" transition={{duration:1}} animate="animate" exit={"exit"} variants={pageVariants}>{children}</motion.div>
  )
}

export default AnimatedPage