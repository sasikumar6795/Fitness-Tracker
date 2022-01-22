//type definition 
export interface state {
    isLoading :Boolean;
}


const initialState = {
    isLoading :false
}; 

//in case if we have dont state initilising with initial state defined
export function appReducer(state=initialState, action)
{
   switch(action.type)
   {
       case 'START_LOADING':
           //returning a object with the new state 
           return {
               isLoading:true
           };
        case 'STOP_LOADING':
            return {
                isLoading:false
            };
        default:
            return state;
   }
}