function x (num) {
    
    let e = num;
    let f = 0;
    // eslint-disable-next-line for-direction
    for(let i =0; i <=num; i+=1){
        f += e; 
        e = e-1;      
    }
   console.log(f);
}

x(4);