interface calcy{
    mul(n:number):void;
}
class display implements calcy{
    x:number=0;
    mul(n:number):any{
        this.x=n*n;
    }
    
}