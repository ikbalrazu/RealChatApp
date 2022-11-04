
export const Initial_State = {
    alert: false,
    alertContent:"",
    loader:false,
}

export const Register_User = {
    name:"",
    email:"",
    password:"",
    picture:"",
}

const reducer = (state, action)=>{
    if(action.type === "SET_ALERT"){
      return{
        ...state,
        alert:action.payload,
      }
    }else if(action.type === "SET_ALERT_CONTENT"){
      return{
        ...state,
        alertContent:action.payload,

      }
    }else if(action.type === "SET_LOADER"){
      return{
        ...state,
        loader:action.payload,
      }
    }else if(action.type === "USER_REGISTRATION"){
        return{
            ...state,
            [action.Name]: action.value
        }
    }

  }

export default reducer;