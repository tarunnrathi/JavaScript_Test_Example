// this.setState((prevState, props) => {
//     return {
//       streak: prevState.streak + props.count
//     }
//   })

//   [16:34] Usama Shaikh (Guest)
//     const circle = {​​
// radius: 20,
// diameter() {​​
// return this.radius * 2;
// }​​,
// perimeter: () => 2 * Math.PI * this.radius,
// }​​;

// console.log(circle.diameter());
// console.log(circle.perimeter());
// function foo() {
//     return;
//     {
//       message: "Hello World";
//     }
//   }
//   console.log(foo());

//   console.log(0.1+0.2===0.3);

  let obj ={
    f:20,
    radius(){
        let r = this.f
        let a = this.f * 2;
        return a;
    },
    perimeter:()=>{
        let d = this.f;
        return this.f*3.14*2;
    }
  }
  console.log(obj.radius());
  console.log(obj.perimeter());