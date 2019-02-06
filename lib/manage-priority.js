'use strict';


module.exports = function (array1, array2) {
  //array1 is array of userObjects for dashboard
  //array2 is array of userId's that are priority
  //remove users from array if they are in priority and sort leftover array 
  // add priority users back to front of array
  let priorityArray = [];
  // console.log('arrar 2', array2);
  // console.log('el id',array1[0]._id);
  let leftover = array1.filter(el => {
   
    
    if(array2.includes(`${el._id}`)) {
      el.priority = true;
      priorityArray.push(el);
      
    } else {
      return el;
    }

  });
  // console.log('priority array', priorityArray);
  // console.log('leftover array', leftover);
  let returnArray = priorityArray.concat(leftover);
  // console.log('in manage priority ', returnArray);
  return returnArray;
};

