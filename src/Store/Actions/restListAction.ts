import { BaseApi,androidHeader } from '../../Constants/OloApi'
import axios from 'axios'
// import * as oloApi from "../../Constants/OloApi";


export function getDataWithTypeAction(queryParams, url,type,others?) {

  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
      }
    };
    if(others && others.minLoading )
    {
      dispatch({ type: `${type}_MIN_LOADING`, shortType:type,loadCode:others.loadCode});
      return axios.get(BaseApi + url, { ...options, })
      .then((resp) => {
        return dispatch({ type: `${type}_MIN_SUCCESS`, payload: {[type]:resp.data}, shortType:type })
      })
      .catch(err=>{
        return  dispatch({ type: `${type}_MIN_FAILURE`, payload: {errorObj:err} , shortType:type })
      } )
    }

    else {
      dispatch({ type: `${type}_LOADING`, shortType:type});
      return axios.get(BaseApi + url, { ...options, })
      .then((resp) => {
        return dispatch({ type: `${type}_SUCCESS`, payload: {[type]:resp.data}, shortType:type })
      })
      .catch(err=>{
        return  dispatch({ type: `${type}_FAILURE`, payload: {errorObj:err} , shortType:type })
      } )
    }
  }
}
//2axios.all
export function getDataWithTypeAllAction(queryParams:any[], url,type,list) {  
  return (dispatch) => {
    dispatch({ type: `${type}_MIN_LOADING`, shortType:type});
    const options = {headers: { ...androidHeader }};
    let reqList = [];
    
     queryParams.map((params,i) => {
      return reqList.push(axios.get(BaseApi + url, { ...options,params: {...params }}))
    })
     return axios.all(reqList)
    .then((resp) => {
      let disObj = { 
        type: `${type}_MIN_SUCCESS`, 
        payload: {[type]:resp}, 
        shortType:type 
      };
      return dispatch(disObj)
    })
    .catch(err=>{
      return  dispatch({ type: `${type}_MIN_FAILURE`, payload: {errorObj:err} , shortType:type })
    } )
  }
}
export function getDataAction(url, queryParams, type) {
  return (dispatch) => {
    const options = {
      headers: { ...androidHeader },
      params: {
        ...queryParams,
      }
    };
    return axios.get(BaseApi + url, { ...options, })
      .then((resp) => dispatch({ type: type + '_SUCCESS', payload: resp }))
  }
}
//axios.all
export function changeLocationAction(loc,url) {
  return (dispatch) => {
    dispatch({ type: 'change_loc_start'})
    
    if (loc.isError) {
      return dispatch({ type: 'change_loc_failed', payload: { errorMsg:loc.message} })
    } else {
      return dispatch({ type: 'change_loc_success', payload: loc })
    }
  }
}