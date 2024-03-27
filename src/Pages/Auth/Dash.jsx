import { useContext } from "react"
import DashCard from "../../Components/Cards/DashCard"
import AnimatedPage from "../../Layouts/AnimatedPage"
import FeastApi from '../../lib/Calendar.json'
import { PriestContext } from "../../Context/useContextt"

const currentFeast = FeastApi.LitCal.find(item => item.date.split('T')[0] === new Date().toISOString().split('T')[0])
const colori = currentFeast.color[0]
const textClass = colori === 'red' ? "text-red-500" : colori === 'white' ? "text-white": colori === 'green' ? "text-green-500" : 
                  colori === 'purple' ? "text-purple-500" : colori === 'blue' ? "text-blue-500" : colori === 'yellow' ? "text-yellow-500" : 'text-gray-500';

const Dash = () => {
  const {allPriests} = useContext(PriestContext);
  return (
    <AnimatedPage>
      <main className=" p-5 mt-14 relative">
        <section>
          <div className=" grid p-3 gap-5 grid-cols-3">
            <div className=" col-span-3 md:col-span-1">
              <DashCard title={"Total Priests"} content={allPriests.length.toString()} />
            </div>
            <div className=" col-span-3 md:col-span-1">
              <div className={`${colori === 'white' ? 'bg-zinc-900':'bg-zinc-100'}  p-4 text-center space-y-3 rounded-md  shadow-md `}>
                <h4 className=" text-primary font-medium text-lg">{'Feast of the Day'}</h4>
                <h1 className={`${colori === 'white' ? 'text-slate-50':'text-slate-900'} font-medium text-xl`} >
                  {currentFeast && new Date().toISOString().split('T')[0] }
                </h1>
                <p className={`${textClass} font-semibold italic`}>{currentFeast ? currentFeast.name : 'No Feast Today'}</p>
              </div>
            </div>
            <div className=" col-span-3 md:col-span-1">
              <DashCard title={'Total number of Parishes'} content={'138'} />
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}

export default Dash
