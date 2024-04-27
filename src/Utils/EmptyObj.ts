 export default function isEmpty(obj:any) {
    for(let key in obj) {
      //if the value is 'object'
      console.log('obj[key] instanceof Object',obj[key] instanceof Object)
      if(obj[key] instanceof Object === true) {
        if(isEmpty(obj[key]) === false) return false;
      }
      //if value is string/number
      else {
        //if array or string have length is not 0.
        if(obj[key].length !== 0) return false;
      }
    }
    return true;
}