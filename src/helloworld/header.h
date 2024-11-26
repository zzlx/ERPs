#ifndef HEADER_FILE
#define HEADER_FILE

#endif

int fibonaci(int i){
    if(i == 0){
        return 0;
    }
    if(i == 1){
        return 1;
    }
    return fibonaci(i-1) + fibonaci(i-2);
}
