import {Triangle} from 'react-loader-spinner'

export const Loader = () => {
    return(
        <div className=' h-dvh w-full flex justify-center items-center'>
             <Triangle
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="Loading..."
  wrapperStyle={{margin: 'auto', textAlign: 'center', display: 'block'}}
  wrapperClass=""
  />
        </div>
       
    )

}