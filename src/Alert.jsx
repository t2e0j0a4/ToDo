import React , {useEffect} from 'react'

function Alert({removeAlertFnc,list,msg,type}) {
    useEffect(() => {
    let clr = setTimeout(() => {
        removeAlertFnc();
    },3000);
    
    return () => {
        clearTimeout(clr);
    }
    }, [list,removeAlertFnc])
    
  return (
    <div className={`myalert myalert-${type}`}>
        <h5>{msg}</h5>
    </div>
  )
}

export default Alert