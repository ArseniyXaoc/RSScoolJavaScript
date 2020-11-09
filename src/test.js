function solvability(arr) {
    let iter = 0
    console.log(arr);
    arr.forEach((element, index, array) => {
       
        for(let i = index+1; i < array.length  ; i += 1){
            console.log(element+1);
            if(element > array[i]){iter += 1;}
            
        }
    });
    console.log(iter);
}

const sortArr = [0,13,2,3,4,8,6,11,5,1,10,9,7,12,14];
        // for (let i = 0; i < 15; i += 1) {
        //     sortArr.push(i);
        // }
        // sortArr.sort(() => Math.random() - 0.5);
        solvability(sortArr);
